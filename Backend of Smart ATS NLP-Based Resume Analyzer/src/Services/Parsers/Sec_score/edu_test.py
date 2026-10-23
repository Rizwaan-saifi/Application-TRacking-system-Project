# ---------------------------------------------------------
# TEST DRIVER SCRIPT
# ---------------------------------------------------------
import asyncio
import json
from education_score import evaluate_education_section

async def test_education_engine():
    jd_edu_reqs = ["B.Tech Computer Science", "Master of Computer Applications"]
    
    resume_edu_blocks = [
        "Bachelor of Technology in Information Technology",
        "MCA from IGNOU"
    ]

    print("\n[INFO] Running Education Matching Engine Test...")
    result = await evaluate_education_section(
        jd_education_requirements=jd_edu_reqs,
        resume_education_blocks=resume_edu_blocks,
        section_weightage_percent=15.0
    )

    print("\n" + "=" * 55)
    print("        EDUCATION SECTION EVALUATION REPORT         ")
    print("=" * 55)
    print(json.dumps(result, indent=4))
    print("=" * 55)

if __name__ == "__main__":
    asyncio.run(test_education_engine())