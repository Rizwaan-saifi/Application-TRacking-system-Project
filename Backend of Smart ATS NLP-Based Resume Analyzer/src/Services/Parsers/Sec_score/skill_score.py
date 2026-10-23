import os
import json
from typing import List, Dict, Any
from semantic import global_semantic_model
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# =====================================================================
# 0. GLOBAL MODEL INITIALIZATION (Loads ONCE into RAM for zero latency)
# =====================================================================
semantic_model = global_semantic_model


# =====================================================================
# 1. TIER 3 PYDANTIC SCHEMA (For Gemini LLM Validation Enforcement)
# =====================================================================
class Tier3LLMValidation(BaseModel):
    validated_skills: List[str] = Field(
        default=[],
        description="Subset of skills from the unmatched list that are contextually present or valid based on the resume text."
    )


# =====================================================================
# 2. HELPER FUNCTION: TIER 3 LLM CALL WRAPPER
# =====================================================
async def call_gemini_for_tier3_validation(unmatched_skills: List[str], full_resume_text: str) -> List[str]:
    """
    Tier 3: Deep contextual validation using Gemini LLM for final remaining skills.
    """
    if not unmatched_skills:
        return []

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=os.getenv("LLM_KEY"))

        prompt = f"""
        You are an advanced ATS (Applicant Tracking System) semantic intelligence engine.
        We have the following list of Job Description skills that could not be matched via exact string matching or vector embeddings:
        Unmatched Skills: {unmatched_skills}

        Analyze the candidate's full resume text below and determine if the candidate actually possesses or implies these skills through their projects, experience descriptions, or tools used.
        Return only the subset of skills from the list that are contextually valid.

        Candidate Resume Full Text:
        {full_resume_text}
        """

        response = client.models.generate_content(
            model='gemini-3.5-flash-lite',  # Fast and lightweight model for speed
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=Tier3LLMValidation,
                temperature=0.0
            ),
        )
        
        result = json.loads(response.text)
        return result.get("validated_skills", [])

    except Exception as e:
        print(f"[ERROR] Tier 3 LLM Validation Failed: {str(e)}")
        return []


# =====================================================================
# 3. UNIFIED 3-TIER SKILLS MATCHING ENGINE (Main Function)
# =====================================================================
async def evaluate_skills_two_buckets(
    job_skill_keyword: List[str], 
    resume_skills: List[str], 
    full_resume_text: str,
    semantic_threshold: float = 0.80
) -> Dict[str, Any]:
    """
    Executes Tier 1 (O(1) Hash Set), Tier 2 (Semantic Embeddings), and Tier 3 (LLM)
    sequentially using a continuous 2-bucket pipeline (matched_skills & unmatched_skills).
    """
    total_jd_skills = len(job_skill_keyword)
    if total_jd_skills == 0:
        return {
            "matched_skills": [],
            "unmatched_skills": [],
            "skills_score_percentage": 0.0
        }

    # 🔥 OPTIMIZATION: Convert resume skills into a Set for O(1) Hash Lookup Speed
    normalized_resume_skills_set = set(s.strip().lower() for s in resume_skills)

    matched_skills = []
    unmatched_skills = []

    # =====================================================
    # TIER 1: Ultra-Fast Exact Keyword Matching ($O(1)$ Hash Lookup)
    # =====================================================
    for skill in job_skill_keyword:
        cleaned_jd_skill = skill.strip().lower()
        
        # Instant memory hash check (No linear scanning)
        if cleaned_jd_skill in normalized_resume_skills_set:
            matched_skills.append(skill)
        else:
            unmatched_skills.append(skill)

    print(f"[TIER 1] Exact Matched: {len(matched_skills)} | Left in Unmatched: {len(unmatched_skills)}")

    # 🚀 BEST CASE SCENARIO CHECK: Bypasses Tiers 2 & 3 if 100% matched
    if not unmatched_skills:
        print("[INFO] Best Case! All skills matched in Tier 1. Bypassing Tiers 2 & 3.")
        return {
            "matched_skills": matched_skills,
            "unmatched_skills": [],
            "total_matched_count": total_jd_skills,
            "total_jd_skills": total_jd_skills,
            "skills_score_percentage": 100.0
        }

    # =====================================================
    # TIER 2: Semantic Vector Embedding Matching (On remaining unmatched)
    # =====================================================
    current_unmatched_for_tier2 = unmatched_skills.copy()
    tier2_newly_matched = []

    if current_unmatched_for_tier2 and resume_skills:
        # Generate embeddings only for leftover unmatched skills
        jd_embeddings = semantic_model.encode(current_unmatched_for_tier2)
        resume_embeddings = semantic_model.encode(resume_skills)
        
        # Compute cosine similarity matrix
        similarity_matrix = cosine_similarity(jd_embeddings, resume_embeddings)

        for i, jd_skill in enumerate(current_unmatched_for_tier2):
            max_similarity = max(similarity_matrix[i])
            
            # Threshold Check (e.g., >= 0.80)
            if max_similarity >= semantic_threshold:
                matched_skills.append(jd_skill)
                tier2_newly_matched.append(jd_skill)
                unmatched_skills.remove(jd_skill)  # Remove from unmatched bucket

    print(f"[TIER 2] Semantic Matched: {len(tier2_newly_matched)} | Left in Unmatched: {len(unmatched_skills)}")

    # =====================================================
    # TIER 3: LLM Deep Validation (Only on final remaining skills)
    # =====================================================
    if unmatched_skills:
        print(f"[TIER 3] Sending {len(unmatched_skills)} remaining skills for LLM validation...")
        
        llm_confirmed_skills = await call_gemini_for_tier3_validation(unmatched_skills, full_resume_text)
        
        tier3_newly_matched = []
        for skill in llm_confirmed_skills:
            if skill in unmatched_skills:
                matched_skills.append(skill)
                tier3_newly_matched.append(skill)
                unmatched_skills.remove(skill)

        print(f"[TIER 3] LLM Matched: {len(tier3_newly_matched)} | Final Left in Unmatched: {len(unmatched_skills)}")

    # =====================================================
    # FINAL SCORING CALCULATION
    # =====================================================
    total_matched_count = len(matched_skills)
    score_percentage = (total_matched_count / total_jd_skills) * 100.0

    return {
        "matched_skills": matched_skills,
        "unmatched_skills": unmatched_skills,
        "total_matched_count": total_matched_count,
        "total_jd_skills": total_jd_skills,
        "skills_score_percentage": round(score_percentage, 2)
    }