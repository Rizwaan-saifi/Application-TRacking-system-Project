import asyncio
from experience_score import evaluate_experience_section
import json

async def test_experience_engine():
    jd_exp_text = "Looking for a backend engineer with 3+ years of experience in building scalable FastAPI microservices, handling high traffic, and optimizing MongoDB queries."
    
    resume_exp_blocks = [
        "Engineered RESTful APIs using Python and FastAPI handling high-frequency requests.",
        "Optimized MongoDB aggregation pipelines, reducing database latency by 35%.",
        "Worked as a junior backend developer for 1.5 years on cloud deployments."
    ]

    print("\n[INFO] Running Experience Matching Engine Test...")
    result = await evaluate_experience_section(
        jd_experience_text=jd_exp_text,
        resume_experience_blocks=resume_exp_blocks,
        section_weightage_percent=30.0
    )

    print("\n" + "=" * 50)
    print("          EXPERIENCE SECTION EVALUATION REPORT         ")
    print("=" * 50)
    print(json.dumps(result, indent=4))
    print("=" * 50)

if __name__ == "__main__":
    asyncio.run(test_experience_engine())