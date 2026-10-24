import pytest
import asyncio
import importlib

from src.Services.Parsers.Sec_score.skill_score import evaluate_skills_two_buckets
from src.Services.Parsers.Sec_score.education_score import evaluate_education_section
from src.Services.Parsers.Sec_score.experience_score import evaluate_experience_section
from src.Services.Parsers.Sec_score.resp_score import evaluate_responsibilities_section

# Load orchestrator module from directory with hyphen in name
orchestrator = importlib.import_module("src.Services.Parsers.Resume-Analysis.resume_score_evalution")
evaluate_resume_against_job_description = orchestrator.evaluate_resume_against_job_description
WEIGHT_SKILLS = orchestrator.WEIGHT_SKILLS
WEIGHT_EXPERIENCE = orchestrator.WEIGHT_EXPERIENCE
WEIGHT_RESPONSIBILITIES = orchestrator.WEIGHT_RESPONSIBILITIES
WEIGHT_EDUCATION = orchestrator.WEIGHT_EDUCATION


# ==============================================================================
# Tier 1: Keyword Matching Tests
# ==============================================================================

@pytest.mark.anyio
async def test_tier1_skills_exact_match_and_case_insensitivity():
    """Verifies O(1) hash matching and case insensitivity in Tier 1."""
    jd_skills = ["Python", "FastAPI", "Docker", "PostgreSQL"]
    resume_skills = ["python", "FASTAPI", "docker", "postgresql"]
    resume_text = "Full stack Python developer with FastAPI and Docker experience."

    result = await evaluate_skills_two_buckets(jd_skills, resume_skills, resume_text)

    # All 4 skills should match directly in Tier 1
    assert result["total_matched_count"] == 4
    assert result["skills_score_percentage"] == 100.0
    assert len(result["unmatched_skills"]) == 0


@pytest.mark.anyio
async def test_tier1_skills_empty_and_missing_inputs():
    """Verifies that empty JD skills return 0.0 without errors."""
    result = await evaluate_skills_two_buckets([], ["python"], "text")
    assert result["skills_score_percentage"] == 0.0
    assert result["matched_skills"] == []


# ==============================================================================
# Tier 2: Semantic Matching Tests
# ==============================================================================

@pytest.mark.anyio
async def test_tier2_semantic_skill_recovery():
    """Verifies that NodeJS is matched to node.js via vector embeddings."""
    jd_skills = ["NodeJS"]
    resume_skills = ["node.js"]
    resume_text = "Experienced with node.js backend development."

    result = await evaluate_skills_two_buckets(jd_skills, resume_skills, resume_text)

    # Even though "NodeJS" != "node.js", Tier 2 semantic embedding should match them
    assert "NodeJS" in result["matched_skills"]
    assert result["total_matched_count"] == 1
    assert result["skills_score_percentage"] == 100.0


@pytest.mark.anyio
async def test_tier2_experience_low_match_threshold():
    """Verifies Rule 1: score < 40% results in direct score = 0."""
    jd_exp = "5+ years of experience leading nuclear reactor cooling simulation teams using Fortran."
    resume_exp = ["Created a simple HTML and CSS static website for a local bakery."]

    result = await evaluate_experience_section(jd_exp, resume_exp, section_weightage_percent=30.0)

    assert result["tier2_semantic_score"] < 40.0
    assert result["experience_base_score"] == 0.0
    assert result["weighted_experience_score"] == 0.0
    assert "Low Match" in result["evaluation_tier_triggered"]


# ==============================================================================
# Tier 3: LLM-Based Matching Tests & Fallbacks
# ==============================================================================

@pytest.mark.anyio
async def test_tier3_experience_moderate_match_formula():
    """Verifies Rule 3: 40% <= score < 85% triggers Tier 3 and applies 60/40 formula."""
    jd_exp = "Looking for a backend engineer with 3+ years in Python microservices."
    resume_exp = [
        "Backend developer building microservices using Django and PostgreSQL.",
        "Created RESTful endpoints and optimized slow database queries."
    ]

    result = await evaluate_experience_section(jd_exp, resume_exp, section_weightage_percent=30.0)

    # Should fall in moderate 40%-84% range
    assert 40.0 <= result["tier2_semantic_score"] < 85.0
    assert "Tier 3" in result["evaluation_tier_triggered"]

    # Verify mathematical formula: (Semantic * 0.60) + (LLM * 0.40)
    sem_score = result["tier2_semantic_score"]
    llm_score = result["tier3_llm_score"]
    expected_base = round((sem_score * 0.60) + (llm_score * 0.40), 2)
    assert abs(result["experience_base_score"] - expected_base) < 0.05


@pytest.mark.anyio
async def test_tier3_responsibilities_50_50_formula():
    """Verifies Responsibilities combination formula: (Semantic * 0.50) + (LLM * 0.50)."""
    jd_resp = "Design RESTful APIs, manage databases, and conduct peer code reviews."
    resume_actions = [
        "Built REST APIs using FastAPI.",
        "Maintained MongoDB and PostgreSQL clusters."
    ]

    result = await evaluate_responsibilities_section(jd_resp, resume_actions, section_weightage_percent=20.0)

    assert 40.0 <= result["tier2_semantic_score"] < 85.0
    sem_score = result["tier2_semantic_score"]
    llm_score = result["tier3_llm_score"]
    expected_base = round((sem_score * 0.50) + (llm_score * 0.50), 2)
    assert abs(result["responsibilities_base_score"] - expected_base) < 0.05


# ==============================================================================
# Complete Three-Tier Integrated Pipeline Tests
# ==============================================================================

@pytest.mark.anyio
async def test_integrated_pipeline_full_run():
    """Verifies that all three tiers execute together, weights sum to 100%, and output is structured."""
    # 1. Verify constant weights sum to 100.0%
    assert (WEIGHT_SKILLS + WEIGHT_EXPERIENCE + WEIGHT_RESPONSIBILITIES + WEIGHT_EDUCATION) == 100.0

    job_skills = ["Python", "FastAPI", "Docker", "PostgreSQL", "Kafka"]
    resume_skills = ["python", "fastapi", "docker", "postgresql"]
    full_resume_text = "Senior Python engineer with 4 years building FastAPI microservices and Docker containers."

    jd_exp_text = "3+ years building scalable Python web applications and microservices."
    resume_exp_blocks = [
        "Engineered RESTful APIs with FastAPI and Docker.",
        "Integrated PostgreSQL and optimized connection pools."
    ]

    jd_resp_text = "Develop backend microservices, write unit tests, and maintain CI/CD pipelines."
    resume_action_points = [
        "Developed backend microservices for transaction processing.",
        "Wrote automated pytest suites with 90% coverage."
    ]

    jd_edu_reqs = ["Bachelor's Degree in Computer Science"]
    resume_edu_blocks = ["B.Tech in Computer Science and Engineering"]

    result = await evaluate_resume_against_job_description(
        job_skills=job_skills,
        resume_skills=resume_skills,
        full_resume_text=full_resume_text,
        jd_experience_text=jd_exp_text,
        resume_experience_blocks=resume_exp_blocks,
        jd_responsibilities_text=jd_resp_text,
        resume_action_points=resume_action_points,
        jd_education_requirements=jd_edu_reqs,
        resume_education_blocks=resume_edu_blocks,
    )

    # 2. Check total score structure
    assert "total_ats_score" in result
    assert 0.0 <= result["total_ats_score"] <= 100.0
    assert result["score_interpretation"] in ["Strong Fit", "Moderate Fit", "Low Fit"]

    # 3. Check section breakdowns
    breakdown = result["section_breakdown"]
    assert "skills" in breakdown
    assert "experience" in breakdown
    assert "responsibilities" in breakdown
    assert "education" in breakdown

    # 4. Check that weighted sum matches total score
    calculated_sum = round(
        breakdown["skills"]["weighted_score"]
        + breakdown["experience"]["weighted_score"]
        + breakdown["responsibilities"]["weighted_score"]
        + breakdown["education"]["weighted_score"],
        2
    )
    assert abs(result["total_ats_score"] - calculated_sum) < 0.05

    # 5. Check tier diagnostics
    tier_summary = result["tier_summary"]
    assert "tier1_keyword_matching" in tier_summary
    assert "tier2_semantic_matching" in tier_summary
    assert "tier3_llm_matching" in tier_summary

    # 6. Check recommendations
    assert isinstance(result["actionable_recommendations"], list)
