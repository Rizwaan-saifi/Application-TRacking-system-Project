# ---------------------------------------------------------
# TEST DRIVER SCRIPT
# ---------------------------------------------------------
import asyncio
import json
from resp_score import evaluate_responsibilities_section

async def test_responsibilities_engine():
    jd_resp_text = "Design RESTful APIs, manage MongoDB clusters, optimize slow database queries, and conduct peer code reviews."
    
    experience_bullets = [
        "Engineered RESTful backend APIs using FastAPI handling high concurrent traffic.",
        "Optimized MongoDB aggregation pipelines, reducing query latency by 35%."
    ]
    project_bullets = [
        "Built a multi-tenant SaaS backend with secure role-based access control.",
        "Implemented automated CI/CD deployment pipelines using GitHub Actions."
    ]
    
    resume_action_points = experience_bullets + project_bullets

    print("\n[INFO] Running Responsibilities Matching Engine Test...")
    result = await evaluate_responsibilities_section(
        jd_responsibilities_text=jd_resp_text,
        resume_action_points=resume_action_points,
        section_weightage_percent=20.0
    )

    print("\n" + "=" * 55)
    print("      RESPONSIBILITIES SECTION EVALUATION REPORT     ")
    print("=" * 55)
    print(json.dumps(result, indent=4))
    print("=" * 55)

if __name__ == "__main__":
    asyncio.run(test_responsibilities_engine())