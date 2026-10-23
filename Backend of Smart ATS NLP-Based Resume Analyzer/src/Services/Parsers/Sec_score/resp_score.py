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
# 1. TIER 3 PYDANTIC SCHEMA (LLM gives score out of 100)
# ---------------------------------------------------------
class Tier3ResponsibilitiesEvaluation(BaseModel):
    total_llm_score: int = Field(
        ..., description="Final capability and depth evaluation score given by LLM strictly out of 100 based on task execution fit and problem-solving depth."
    )
    reasoning_summary: str = Field(
        ..., description="Brief professional explanation for the assigned score."
    )


# ---------------------------------------------------------
# 2. HELPER FUNCTION: RESPONSIBILITIES TIER 3 LLM CALL
# ---------------------------------------------------------
async def call_gemini_for_responsibilities_llm(
    jd_responsibilities_text: str, 
    resume_action_points: List[str], 
    tier2_score: float
) -> Dict[str, Any]:
    """
    Tier 3: Triggered for Responsibilities when semantic score is between 40% and 84%.
    """
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(API_KEY = os.getenv("LLM_KEY"))
        resume_actions_text = "\n".join(resume_action_points)

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) Technical Recruiter.
        Evaluate the candidate's action points (combined from Experience and Projects sections) against the Job Description (JD) responsibilities and daily duties.

        Job Description Responsibilities:
        {jd_responsibilities_text}

        Candidate Action Points / Bullet Points (Experience + Projects):
        {resume_actions_text}

        Context: 
        - Vector Semantic Match Score was: {tier2_score:.1f}% (Moderate range 40%-84%).

        Evaluate strictly out of 100 total points based on:
        1. Task Execution Fit: Can the candidate handle these specific daily duties based on their past work or projects?
        2. Problem-Solving Depth & Metrics: Did they use action verbs, quantitative metrics, and scale indicators?

        Return the final score strictly out of 100 in 'total_llm_score' and a concise 'reasoning_summary'.
        """

        response = client.models.generate_content(
            model='gemini-3.5-flash-lite',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=Tier3ResponsibilitiesEvaluation,
                temperature=0.0
            ),
        )
        
        return json.loads(response.text)

    except Exception as e:
        print(f"[ERROR] Tier 3 Responsibilities LLM Failed: {str(e)}")
        return {
            "total_llm_score": 50,
            "reasoning_summary": f"Error: {str(e)}"
        }


# ---------------------------------------------------------
# 3. MAIN RESPONSIBILITIES EVALUATION PIPELINE
# ---------------------------------------------------------
async def evaluate_responsibilities_section(
    jd_responsibilities_text: str, 
    resume_action_points: List[str],
    section_weightage_percent: float = 20.0
) -> Dict[str, Any]:
    """
    Executes Responsibilities Evaluation:
    - Score >= 85%: Skip LLM (High Match)
    - Score < 40%: Direct Score = 0
    - Score 40% - 84%: Trigger LLM and compute (Semantic * 0.50 + LLM * 0.50)
    """
    if not jd_responsibilities_text or not resume_action_points:
        return {
            "responsibilities_base_score": 0.0,
            "weighted_responsibilities_score": 0.0,
            "evaluation_tier_triggered": "None",
            "details": "Missing JD responsibilities or resume action points."
        }

    # Combine all experience + project bullet points into a single text block
    resume_full_text = " ".join(resume_action_points)

    # =====================================================
    # TIER 2: Vector Semantic Embedding Match (Out of 100)
    # =====================================================
    jd_embedding = global_semantic_model.encode([jd_responsibilities_text])
    resume_embedding = global_semantic_model.encode([resume_full_text])
    
    similarity_matrix = cosine_similarity(jd_embedding, resume_embedding)
    raw_similarity = float(similarity_matrix[0][0])
    
    # Convert to 0 - 100 scale
    tier2_score = max(0.0, min(100.0, raw_similarity * 100.0))
    print(f"[RESPONSIBILITIES TIER 2] Semantic Similarity Score: {tier2_score:.2f}%")

    base_score = 0.0
    evaluation_tier = ""
    tier3_score = None
    llm_summary = ""

    # =====================================================
    # STRICT THRESHOLD LOGIC
    # =====================================================
    
    # Rule 1: Score < 40% -> Direct Score = 0
    if tier2_score < 40.0:
        evaluation_tier = "Tier 2 (Low Match - Score set to 0)"
        base_score = tier2_score

    # Rule 2: Score >= 85% -> Skip LLM, use semantic score directly
    elif tier2_score >= 85.0:
        evaluation_tier = "Tier 2 (High Match - LLM Skipped)"
        base_score = tier2_score

    # Rule 3: Score 40% - 84% -> Trigger Tier 3 LLM & Apply 50/50 Formula
    else:
        evaluation_tier = "Tier 3 (Triggered via Moderate Match 40% - 84%)"
        print(f"[RESPONSIBILITIES TIER 3] Triggering LLM evaluation...")
        
        llm_result = await call_gemini_for_responsibilities_llm(
            jd_responsibilities_text, 
            resume_action_points, 
            tier2_score
        )
        
        tier3_score = float(llm_result.get("total_llm_score", 50.0))
        llm_summary = llm_result.get("reasoning_summary", "")

        # Exact 50/50 Mathematical Combination (Both out of 100)
        base_score = (tier2_score * 0.50) + (tier3_score * 0.50)

    # =====================================================
    # FINAL SECTION & MAIN ATS WEIGHTAGE CALCULATION (20%)
    # =====================================================
    weighted_score = (base_score / 100.0) * section_weightage_percent

    return {
        "evaluation_tier_triggered": evaluation_tier,
        "tier2_semantic_score": round(tier2_score, 2),
        "tier3_llm_score": round(tier3_score, 2) if tier3_score is not None else None,
        "llm_reasoning": llm_summary if llm_summary else None,
        "responsibilities_base_score": round(base_score, 2),
        "weighted_responsibilities_score": round(weighted_score, 2),
        "max_possible_weight": section_weightage_percent
    }


