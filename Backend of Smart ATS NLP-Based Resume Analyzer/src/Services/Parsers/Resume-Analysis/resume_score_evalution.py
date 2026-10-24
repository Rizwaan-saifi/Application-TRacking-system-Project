"""
Unified ATS Resume-to-Job-Description Evaluation Orchestrator

Integrates all three matching tiers across four core sections:
1. Skills Matching (35% ATS weight) - Tier 1 Hash -> Tier 2 Vector -> Tier 3 LLM
2. Experience Evaluation (30% ATS weight) - Tier 2 Vector -> Conditional Tier 3 LLM
3. Responsibilities Evaluation (20% ATS weight) - Tier 2 Vector -> Conditional Tier 3 LLM
4. Education Evaluation (15% ATS weight) - Tier 1 Exact -> Tier 2 Vector -> Tier 3 LLM

Total Composite Score = 35% Skills + 30% Experience + 20% Responsibilities + 15% Education = 100.0%
"""

import asyncio
from typing import Dict, List, Any, Optional

try:
    from src.Services.Parsers.Sec_score.skill_score import evaluate_skills_two_buckets
    from src.Services.Parsers.Sec_score.education_score import evaluate_education_section
    from src.Services.Parsers.Sec_score.experience_score import evaluate_experience_section
    from src.Services.Parsers.Sec_score.resp_score import evaluate_responsibilities_section
except ModuleNotFoundError:
    try:
        from Services.Parsers.Sec_score.skill_score import evaluate_skills_two_buckets
        from Services.Parsers.Sec_score.education_score import evaluate_education_section
        from Services.Parsers.Sec_score.experience_score import evaluate_experience_section
        from Services.Parsers.Sec_score.resp_score import evaluate_responsibilities_section
    except ModuleNotFoundError:
        import sys
        import os
        sec_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "Sec_score"))
        if sec_dir not in sys.path:
            sys.path.insert(0, sec_dir)
        from skill_score import evaluate_skills_two_buckets
        from education_score import evaluate_education_section
        from experience_score import evaluate_experience_section
        from resp_score import evaluate_responsibilities_section

# Section Weight Constants (Must sum to 100.0%)
WEIGHT_SKILLS = 35.0
WEIGHT_EXPERIENCE = 30.0
WEIGHT_RESPONSIBILITIES = 20.0
WEIGHT_EDUCATION = 15.0


async def evaluate_resume_against_job_description(
    job_skills: List[str],
    resume_skills: List[str],
    full_resume_text: str,
    jd_experience_text: str,
    resume_experience_blocks: List[str],
    jd_responsibilities_text: str,
    resume_action_points: List[str],
    jd_education_requirements: List[str],
    resume_education_blocks: List[str],
) -> Dict[str, Any]:
    """
    Executes the 4 section evaluators concurrently and aggregates their weighted scores.
    """

    # 1. Concurrently run all section evaluators to minimize latency
    skills_task = evaluate_skills_two_buckets(
        job_skill_keyword=job_skills,
        resume_skills=resume_skills,
        full_resume_text=full_resume_text,
    )

    experience_task = evaluate_experience_section(
        jd_experience_text=jd_experience_text,
        resume_experience_blocks=resume_experience_blocks,
        section_weightage_percent=WEIGHT_EXPERIENCE,
    )

    resp_task = evaluate_responsibilities_section(
        jd_responsibilities_text=jd_responsibilities_text,
        resume_action_points=resume_action_points,
        section_weightage_percent=WEIGHT_RESPONSIBILITIES,
    )

    edu_task = evaluate_education_section(
        jd_education_requirements=jd_education_requirements,
        resume_education_blocks=resume_education_blocks,
        section_weightage_percent=WEIGHT_EDUCATION,
    )

    skills_res, exp_res, resp_res, edu_res = await asyncio.gather(
        skills_task, experience_task, resp_task, edu_task
    )

    # 2. Extract base scores and compute weighted scores
    skills_base = float(skills_res.get("skills_score_percentage", 0.0))
    skills_weighted = round((skills_base / 100.0) * WEIGHT_SKILLS, 2)

    exp_base = float(exp_res.get("experience_base_score", 0.0))
    exp_weighted = float(exp_res.get("weighted_experience_score", 0.0))

    resp_base = float(resp_res.get("responsibilities_base_score", 0.0))
    resp_weighted = float(resp_res.get("weighted_responsibilities_score", 0.0))

    edu_base = float(edu_res.get("education_base_score", 0.0))
    edu_weighted = float(edu_res.get("weighted_education_score", 0.0))

    # 3. Overall composite ATS score (0 to 100)
    total_score = round(skills_weighted + exp_weighted + resp_weighted + edu_weighted, 2)
    total_score = max(0.0, min(100.0, total_score))

    # 4. Generate explainable tier-by-tier diagnostics
    tier1_exact_skills = [s for s in skills_res.get("matched_skills", []) if s.strip().lower() in set(k.strip().lower() for k in resume_skills)]
    tier1_unmatched_skills = skills_res.get("unmatched_skills", [])

    tier2_semantic_matches = [s for s in skills_res.get("matched_skills", []) if s not in tier1_exact_skills]
    
    tier_summary = {
        "tier1_keyword_matching": {
            "description": "Exact token match via O(1) hash lookups and substring scanning",
            "skills_matched_exact": tier1_exact_skills,
            "skills_unmatched": tier1_unmatched_skills,
            "education_matched_exact": edu_res.get("matched_education", []),
            "education_unmatched": edu_res.get("unmatched_education", []),
        },
        "tier2_semantic_matching": {
            "description": "Dense vector embeddings (all-MiniLM-L6-v2) cosine similarity",
            "skills_recovered_semantically": tier2_semantic_matches,
            "experience_semantic_score": exp_res.get("tier2_semantic_score", 0.0),
            "responsibilities_semantic_score": resp_res.get("tier2_semantic_score", 0.0),
            "education_equivalency_moved": edu_res.get("tier2_equivalency_moved", []),
        },
        "tier3_llm_matching": {
            "description": "Gemini 3.5 Flash Lite contextual validation and depth verification",
            "experience_evaluation_tier": exp_res.get("evaluation_tier_triggered", "None"),
            "experience_llm_score": exp_res.get("tier3_llm_score"),
            "experience_reasoning": exp_res.get("llm_reasoning"),
            "responsibilities_evaluation_tier": resp_res.get("evaluation_tier_triggered", "None"),
            "responsibilities_llm_score": resp_res.get("tier3_llm_score"),
            "responsibilities_reasoning": resp_res.get("llm_reasoning"),
            "education_llm_moved": edu_res.get("tier3_llm_moved", []),
            "education_llm_reasoning": edu_res.get("llm_reasoning", []),
        }
    }

    # 5. Generate actionable recommendations
    recommendations = []
    if tier1_unmatched_skills:
        recommendations.append(
            f"Add missing required technical keywords: {', '.join(tier1_unmatched_skills[:6])}."
        )
    if exp_base < 60.0:
        recommendations.append(
            "Strengthen work experience bullets with measurable metrics, system scale, and architecture tools."
        )
    if resp_base < 60.0:
        recommendations.append(
            "Align project descriptions with the core day-to-day responsibilities outlined in the job description."
        )
    if edu_base < 60.0:
        recommendations.append(
            "Ensure degree title, specialization, and relevant academic coursework are explicitly specified."
        )

    return {
        "total_ats_score": total_score,
        "score_interpretation": "Strong Fit" if total_score >= 80 else "Moderate Fit" if total_score >= 60 else "Low Fit",
        "section_breakdown": {
            "skills": {
                "base_score": skills_base,
                "weighted_score": skills_weighted,
                "max_weight": WEIGHT_SKILLS,
                "total_matched": skills_res.get("total_matched_count", 0),
                "total_required": skills_res.get("total_jd_skills", 0),
                "matched_skills": skills_res.get("matched_skills", []),
                "unmatched_skills": skills_res.get("unmatched_skills", []),
            },
            "experience": {
                "base_score": exp_base,
                "weighted_score": exp_weighted,
                "max_weight": WEIGHT_EXPERIENCE,
                "tier_triggered": exp_res.get("evaluation_tier_triggered"),
                "semantic_score": exp_res.get("tier2_semantic_score"),
                "llm_score": exp_res.get("tier3_llm_score"),
                "reasoning": exp_res.get("llm_reasoning"),
            },
            "responsibilities": {
                "base_score": resp_base,
                "weighted_score": resp_weighted,
                "max_weight": WEIGHT_RESPONSIBILITIES,
                "tier_triggered": resp_res.get("evaluation_tier_triggered"),
                "semantic_score": resp_res.get("tier2_semantic_score"),
                "llm_score": resp_res.get("tier3_llm_score"),
                "reasoning": resp_res.get("llm_reasoning"),
            },
            "education": {
                "base_score": edu_base,
                "weighted_score": edu_weighted,
                "max_weight": WEIGHT_EDUCATION,
                "matched_education": edu_res.get("matched_education", []),
                "unmatched_education": edu_res.get("unmatched_education", []),
                "tier_triggered": edu_res.get("evaluation_tier_triggered"),
            }
        },
        "tier_summary": tier_summary,
        "actionable_recommendations": recommendations,
    }
