import asyncio
from skill_score import evaluate_skills_two_buckets
import json

async def main():
    job_skills = ["Python", "FastAPI", "NodeJS", "CI/CD", "Redis", "Docker"]
    resume_skills = ["python", "fastapi", "node.js", "docker"]
    resume_text = "Experienced backend developer using Python, FastAPI, Docker, and GitHub actions for CI/CD pipelines."

    result = await evaluate_skills_two_buckets(job_skills, resume_skills, resume_text)
    print(json.dumps(result, indent=4))

if __name__ == "__main__":
    asyncio.run(main())