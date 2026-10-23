import os
import json
from typing import List, Dict, Any
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel, Field
from semantic import global_semantic_model
from dotenv import load_dotenv

load_dotenv()

exp_semantic_model = global_semantic_model


# ---------------------------------------------------------
# 1. TIER 3 PYDANTIC SCHEMA (For LLM Score Generation)
# ---------------------------------------------------------
class Tier3ExperienceEvaluation(BaseModel):
    total_llm_score: int = Field(
        ..., description="Final evaluation score given by LLM out of 100 based on seniority, core tasks, and domain."
    )
    reasoning_summary: str = Field(
        ..., description="Brief professional explanation for the assigned score."
    )


# ---------------------------------------------------------
# 2. HELPER FUNCTION: TIER 3 LLM CALL
# ---------------------------------------------------------
async def call_gemini_for_experience_llm(
    jd_experience_text: str, 
    resume_experience_blocks: List[str], 
    tier2_score: float
) -> Dict[str, Any]:
    """
    Tier 3: Triggered only when semantic score is between 40% and 84%.
    """
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=os.getenv("LLM_KEY"))
        resume_exp_text = "\n".join(resume_experience_blocks)

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) Technical Recruiter.
        Evaluate the candidate's work experience against the Job Description (JD) requirements.

        Job Description Experience Requirements:
        {jd_experience_text}

        Candidate Work Experience Bullet Points:
        {resume_exp_text}

        Context: 
        - Vector Semantic Match Score was: {tier2_score:.1f}% (Moderate range 40%-84%).

        Evaluate strictly out of 100 points based on:
        1. Seniority & Years Fit
        2. Core Task Capabilities (API scaling, optimization, etc.)
        3. Domain Alignment

        Return the final score out of 100 in 'total_llm_score' and a short 'reasoning_summary'.
        """

        response = client.models.generate_content(
            model='gemini-3.5-flash-lite',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=Tier3ExperienceEvaluation,
                temperature=0.0
            ),
        )
        
        return json.loads(response.text)

    except Exception as e:
        print(f"[ERROR] Tier 3 Experience LLM Failed: {str(e)}")
        return {"total_llm_score": 50, "reasoning_summary": f"Error: {str(e)}"}


# ---------------------------------------------------------
# 3. MAIN EXPERIENCE EVALUATION PIPELINE
# ---------------------------------------------------------
async def evaluate_experience_section(
    jd_experience_text: str, 
    resume_experience_blocks: List[str],
    section_weightage_percent: float = 30.0
) -> Dict[str, Any]:
    """
    Executes Experience Section evaluation following strict threshold rules:
    - Score >= 85%: Skip LLM (High Match)[cite: 1, 2]
    - Score < 40%: Direct Score = 0[cite: 1, 2]
    - Score 40% - 84%: Trigger LLM and compute (Semantic * 0.60 + LLM * 0.40)[cite: 1, 2, 3]
    """
    if not jd_experience_text or not resume_experience_blocks:
        return {
            "experience_base_score": 0.0,
            "weighted_experience_score": 0.0,
            "evaluation_tier_triggered": "None",
            "details": "Missing JD experience or resume blocks."
        }

    # Combine resume blocks into a single rich text block
    resume_full_exp_text = " ".join(resume_experience_blocks)

    # =====================================================
    # TIER 2: Vector Semantic Embedding Match
    # =====================================================
    jd_embedding = exp_semantic_model.encode([jd_experience_text])
    resume_embedding = exp_semantic_model.encode([resume_full_exp_text])
    
    similarity_matrix = cosine_similarity(jd_embedding, resume_embedding)
    raw_similarity = float(similarity_matrix[0][0])
    
    # Convert to 0 - 100 scale
    tier2_score = max(0.0, min(100.0, raw_similarity * 100.0))
    print(f"[EXPERIENCE TIER 2] Semantic Similarity Score: {tier2_score:.2f}%")

    experience_base_score = 0.0
    evaluation_tier = ""
    tier3_score = None
    llm_summary = ""

    # =====================================================
    # STRICT THRESHOLD LOGIC AS PER YOUR RULE
    # =====================================================
    
    # Rule 1: Score < 40% -> Direct Score = 0[cite: 1, 2]
    if tier2_score < 40.0:
        evaluation_tier = "Tier 2 (Low Match - Score set to 0)"
        experience_base_score = 0.0

    # Rule 2: Score >= 85% -> Skip LLM, use semantic score directly[cite: 1, 2]
    elif tier2_score >= 85.0:
        evaluation_tier = "Tier 2 (High Match - LLM Skipped)"
        experience_base_score = tier2_score  # (Ya agar aap direct 100 chahte hain toh 100 bhi kar sakte hain)

    # Rule 3: Score 40% - 84% -> Trigger Tier 3 LLM & Apply 60/40 Formula[cite: 1, 2, 3]
    else:
        evaluation_tier = "Tier 3 (Triggered via Moderate Match 40% - 84%"
        print(f"[EXPERIENCE TIER 3] Triggering LLM evaluation...")
        
        llm_result = await call_gemini_for_experience_llm(
            jd_experience_text, 
            resume_experience_blocks, 
            tier2_score
        )
        
        tier3_score = float(llm_result.get("total_llm_score", 50.0))
        llm_summary = llm_result.get("reasoning_summary", "")

        # Mathematical Combination: (Semantic * 0.60) + (LLM * 0.40)[cite: 1, 2, 3]
        experience_base_score = (tier2_score * 0.60) + (tier3_score * 0.40)

    # =====================================================
    # FINAL SECTION & MAIN ATS WEIGHTAGE CALCULATION
    # =====================================================
    # Main ATS score me section ka weightage (e.g., 30%)[cite: 2, 3]
    weighted_score = (experience_base_score / 100.0) * section_weightage_percent

    return {
        "evaluation_tier_triggered": evaluation_tier,
        "tier2_semantic_score": round(tier2_score, 2),
        "tier3_llm_score": round(tier3_score, 2) if tier3_score is not None else None,
        "llm_reasoning": llm_summary if llm_summary else None,
        "experience_base_score": round(experience_base_score, 2),
        "weighted_experience_score": round(weighted_score, 2),
        "max_possible_weight": section_weightage_percent
    }