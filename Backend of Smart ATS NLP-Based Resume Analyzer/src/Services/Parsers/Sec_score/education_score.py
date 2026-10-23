import os
import json
from typing import List, Dict, Any
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# Global shared model import (RAM saving ke liye)
from semantic import global_semantic_model


# ---------------------------------------------------------
# 1. TIER 3 PYDANTIC SCHEMA (For Education LLM Validation)
# ---------------------------------------------------------
class Tier3EducationEvaluation(BaseModel):
    is_valid_equivalency: bool = Field(
        ..., description="True if the candidate's degree/specialization is an acceptable academic match for the JD requirement, else False."
    )
    reasoning_summary: str = Field(
        ..., description="Brief professional explanation for the decision."
    )


# ---------------------------------------------------------
# 2. HELPER FUNCTION: EDUCATION TIER 3 LLM CALL
# ---------------------------------------------------------
async def call_gemini_for_education_llm(
    unmatched_jd_edu: str, 
    candidate_education_list: List[str]
) -> Dict[str, Any]:
    """
    Tier 3: Triggered for remaining unmatched education items using LLM.
    """
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=os.getenv("LLM_KEY"))
        candidate_edu_text = ", ".join(candidate_education_list)

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) Technical Recruiter.
        Evaluate if the candidate's education fulfills the unmatched Job Description (JD) education requirement.

        Unmatched JD Education Requirement:
        {unmatched_jd_edu}

        Candidate Education History:
        {candidate_edu_text}

        Determine if the candidate's education satisfies or is an acceptable professional equivalent for this requirement.
        Return 'is_valid_equivalency' as true or false along with a concise 'reasoning_summary'.
        """

        response = client.models.generate_content(
            model='gemini-3.5-flash-lite',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=Tier3EducationEvaluation,
                temperature=0.0
            ),
        )
        
        return json.loads(response.text)

    except Exception as e:
        print(f"[ERROR] Tier 3 Education LLM Failed: {str(e)}")
        return {"is_valid_equivalency": False, "reasoning_summary": f"Error: {str(e)}"}


# ---------------------------------------------------------
# 3. MAIN EDUCATION EVALUATION PIPELINE (Bucket Approach)
# ---------------------------------------------------------
async def evaluate_education_section(
    jd_education_requirements: List[str], 
    resume_education_blocks: List[str],
    section_weightage_percent: float = 15.0
) -> Dict[str, Any]:
    """
    Executes Education Evaluation using 3-Tier Bucket Logic:
    - Tier 1: Exact Keyword Match (80% weight)
    - Tier 2: Semantic Equivalency for unmatched items (10% weight)
    - Tier 3: LLM Specialization Check for remaining unmatched items (10% weight)
    """
    if not jd_education_requirements or not resume_education_blocks:
        return {
            "education_base_score": 0.0,
            "weighted_education_score": 0.0,
            "matched_education": [],
            "unmatched_education": jd_education_requirements,
            "details": "Missing JD education requirements or candidate education."
        }

    matched_bucket = []
    unmatched_bucket = []

    # =====================================================
    # TIER 1: Exact Keyword Match (80% Weight Portion)
    # =====================================================
    # Normalize strings for exact matching
    resume_edu_lower = [edu.lower().strip() for edu in resume_education_blocks]

    for req in jd_education_requirements:
        req_lower = req.lower().strip()
        found_exact = False
        for cand_edu in resume_edu_lower:
            if req_lower in cand_edu or cand_edu in req_lower:
                found_exact = True
                break
        
        if found_exact:
            matched_bucket.append(req)
        else:
            unmatched_bucket.append(req)

    tier1_score = (len(matched_bucket) / len(jd_education_requirements)) * 80.0
    print(f"[EDUCATION TIER 1] Exact Match Score: {tier1_score:.2f}% (Matched: {len(matched_bucket)}/{len(jd_education_requirements)})")

    tier2_earned_score = 0.0
    tier3_earned_score = 0.0
    tier2_moved = []
    tier3_moved = []
    llm_reasonings = []

    # If everything matched in Tier 1, skip Tier 2 and Tier 3![cite: 6]
    if unmatched_bucket:
        # =====================================================
        # TIER 2: Semantic Equivalency Check (10% Weight Portion)
        # =====================================================
        still_unmatched_after_tier2 = []
        
        for req in unmatched_bucket:
            req_embedding = global_semantic_model.encode([req])
            cand_embedding = global_semantic_model.encode([" ".join(resume_education_blocks)])
            
            similarity = float(cosine_similarity(req_embedding, cand_embedding)[0][0])
            
            # Threshold for semantic equivalence (e.g., >= 0.82)
            if similarity >= 0.82:
                tier2_moved.append(req)
                matched_bucket.append(req)
            else:
                still_unmatched_after_tier2.append(req)

        # 10% weight is distributed equally among unmatched items
        per_item_tier2_weight = 10.0 / len(unmatched_bucket) if len(unmatched_bucket) > 0 else 0.0
        tier2_earned_score = len(tier2_moved) * per_item_tier2_weight
        print(f"[EDUCATION TIER 2] Semantic Equivalency Moved: {len(tier2_moved)} items")

        # Update unmatched bucket for Tier 3
        unmatched_bucket = still_unmatched_after_tier2

        # =====================================================
        # TIER 3: LLM Specialization Check (10% Weight Portion)
        # =====================================================
        if unmatched_bucket:
            per_item_tier3_weight = 10.0 / (len(tier2_moved) + len(unmatched_bucket) + len(matched_bucket) - len(tier2_moved)) # proportional
            # Safe per item weight calculation based on original total requirements count
            per_item_tier3_weight = 10.0 / len(jd_education_requirements)

            for req in list(unmatched_bucket):
                llm_res = await call_gemini_for_education_llm(req, resume_education_blocks)
                is_valid = llm_res.get("is_valid_equivalency", False)
                llm_reasonings.append({req: llm_res.get("reasoning_summary", "")})

                if is_valid:
                    tier3_moved.append(req)
                    matched_bucket.append(req)
                    unmatched_bucket.remove(req)
                    tier3_earned_score += per_item_tier3_weight
                else:
                    pass

            print(f"[EDUCATION TIER 3] LLM Approved Moved: {len(tier3_moved)} items")

    # =====================================================
    # MATHEMATICAL SCORE AGGREGATION
    # =====================================================
    # Total Base Score out of 100
    # Tier 1 max 80, Tier 2 max 10, Tier 3 max 10
    total_tier2_max = 10.0
    total_tier3_max = 10.0
    
    # Recalculate exact points proportionally if items moved in Tier 2 & 3
    total_items = len(jd_education_requirements)
    t2_points = (len(tier2_moved) / total_items) * 10.0 if total_items > 0 else 0.0
    t3_points = (len(tier3_moved) / total_items) * 10.0 if total_items > 0 else 0.0

    education_base_score = tier1_score + t2_points + t3_points
    education_base_score = max(0.0, min(100.0, education_base_score))

    # Main ATS Score Contribution (e.g., 15% Weightage)
    weighted_score = (education_base_score / 100.0) * section_weightage_percent

    return {
        "evaluation_tier_triggered": "Tier 1 Exact Match" if not unmatched_bucket and not tier2_moved else "Tier 2 & 3 Processed",
        "matched_education": matched_bucket,
        "unmatched_education": unmatched_bucket,
        "tier2_equivalency_moved": tier2_moved,
        "tier3_llm_moved": tier3_moved,
        "llm_reasoning": llm_reasonings,
        "education_base_score": round(education_base_score, 2),
        "weighted_education_score": round(weighted_score, 2),
        "max_possible_weight": section_weightage_percent
    }


