import os
import json
import importlib
from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from src.Utils.Database.db import get_db
from src.Models.AnalysisModel import AnalysisHistory
from src.Services.Parsers.text_extractor import (
    extract_text_from_file_bytes,
    parse_resume_sections,
    parse_job_description_sections,
)

resume_router = APIRouter(prefix="/resume", tags=["Resume Analysis"])

# Dynamic import of the 3-Tier engine orchestrator
_engine_mod = importlib.import_module(
    "src.Services.Parsers.Resume-Analysis.resume_score_evalution"
)
evaluate_resume_against_job_description = _engine_mod.evaluate_resume_against_job_description


class AnalyzeJSONRequest(BaseModel):
    resume_text: str = Field(..., min_length=20, description="Full raw resume text")
    job_description: str = Field(..., min_length=20, description="Job description text")
    job_title: Optional[str] = Field("Software Engineer", description="Job title")
    company: Optional[str] = Field("Target Company", description="Target company name")


SAMPLE_RESUME = """Neeraj Karnawat - Full Stack Developer
Email: neeraj@example.com | GitHub: github.com/neeraj

PROFESSIONAL SUMMARY:
Results-driven software engineer with 3+ years of experience building high-performance web applications, scalable RESTful microservices, and distributed backend architectures using Python, FastAPI, React, Docker, and PostgreSQL.

TECHNICAL SKILLS:
- Languages & Frameworks: Python, FastAPI, Django, JavaScript, TypeScript, React.js, Node.js, HTML, CSS, TailwindCSS
- Databases & Caching: PostgreSQL, MongoDB, Redis, SQLite, SQLAlchemy
- Cloud & DevOps: Docker, Kubernetes, AWS (EC2, S3), GitHub Actions, Linux, CI/CD
- Concepts: RESTful APIs, Microservices, AsyncIO, Pytest, JWT Authentication

WORK EXPERIENCE:
Senior Software Engineer | TechPulse Solutions (2023 - Present)
- Architected and deployed 8+ microservices with FastAPI and Docker, handling 1.5M daily requests.
- Optimized PostgreSQL database indexing and connection pooling, reducing p99 latency by 42%.
- Built automated CI/CD deployment pipelines using GitHub Actions and AWS EC2.
- Designed responsive React frontend dashboards integrated with secure JWT-authenticated endpoints.

Software Engineer | CloudScale Systems (2021 - 2023)
- Developed REST APIs using Python and Django for an enterprise document management platform.
- Integrated Redis caching layer, decreasing repeat database read operations by 60%.
- Implemented comprehensive unit and integration test suites using pytest with 92% code coverage.

EDUCATION:
- Bachelor of Technology (B.Tech) in Computer Science and Engineering, 2021
"""

SAMPLE_JD = """Job Title: Senior Backend Engineer (Python / FastAPI)
Company: NextGen Cloud Solutions

ABOUT THE ROLE:
We are seeking a talented Senior Backend Engineer to join our core platform engineering team. You will be responsible for designing scalable microservices, managing cloud infrastructure, and collaborating on our distributed real-time data pipelines.

REQUIREMENTS & QUALIFICATIONS:
- 3+ years of professional backend software development experience.
- Strong proficiency in Python, FastAPI, or Django with asynchronous programming (asyncio).
- Experience working with relational databases such as PostgreSQL and key-value stores like Redis.
- Hands-on experience with containerization technologies like Docker and CI/CD automation.
- Familiarity with cloud platforms (AWS, GCP) and RESTful API best practices.
- Strong analytical and problem-solving skills with a test-driven development (TDD) mindset.

RESPONSIBILITIES:
- Architect, build, and maintain scalable REST APIs and microservices.
- Optimize database performance, query execution plans, and caching strategies.
- Collaborate with frontend engineers to integrate React client interfaces.
- Write unit, integration, and performance tests using Pytest.
- Participate in peer code reviews and architectural planning sessions.

EDUCATION:
- Bachelor's Degree in Computer Science, Software Engineering, or related technical field.
"""


@resume_router.get("/sample", summary="Get sample resume and job description for testing")
async def get_sample_data():
    return {
        "job_title": "Senior Backend Engineer",
        "company": "NextGen Cloud Solutions",
        "resume_text": SAMPLE_RESUME,
        "job_description": SAMPLE_JD
    }


@resume_router.post("/analyze", summary="Analyze resume text against job description via JSON")
async def analyze_resume_json(
    payload: AnalyzeJSONRequest,
    db: Session = Depends(get_db)
):
    try:
        resume_data = parse_resume_sections(payload.resume_text)
        jd_data = parse_job_description_sections(payload.job_description)

        result = await evaluate_resume_against_job_description(
            job_skills=jd_data["job_skills"],
            resume_skills=resume_data["skills"],
            full_resume_text=payload.resume_text,
            jd_experience_text=jd_data["jd_experience_text"],
            resume_experience_blocks=resume_data["experience_blocks"],
            jd_responsibilities_text=jd_data["jd_responsibilities_text"],
            resume_action_points=resume_data["action_points"],
            jd_education_requirements=jd_data["jd_education_requirements"],
            resume_education_blocks=resume_data["education_blocks"],
        )

        # Persist record in database
        analysis_record = AnalysisHistory(
            job_title=payload.job_title or "Software Engineer",
            company=payload.company or "Target Company",
            ats_score=result["total_ats_score"],
            interpretation=result["score_interpretation"],
            result_json=json.dumps(result)
        )
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)

        result["analysis_id"] = analysis_record.id
        result["job_title"] = analysis_record.job_title
        result["company"] = analysis_record.company
        result["created_at"] = analysis_record.created_at.isoformat()

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {str(e)}")


@resume_router.post("/analyze-file", summary="Upload resume file (PDF/DOCX/TXT) and analyze against JD")
async def analyze_resume_file(
    resume_file: UploadFile = File(...),
    job_description: str = Form(...),
    job_title: Optional[str] = Form("Software Engineer"),
    company: Optional[str] = Form("Target Company"),
    db: Session = Depends(get_db)
):
    try:
        content = await resume_file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        extracted_text = extract_text_from_file_bytes(resume_file.filename, content)
        if not extracted_text or len(extracted_text.strip()) < 20:
            raise HTTPException(status_code=400, detail="Could not extract readable text from uploaded file.")

        resume_data = parse_resume_sections(extracted_text)
        jd_data = parse_job_description_sections(job_description)

        result = await evaluate_resume_against_job_description(
            job_skills=jd_data["job_skills"],
            resume_skills=resume_data["skills"],
            full_resume_text=extracted_text,
            jd_experience_text=jd_data["jd_experience_text"],
            resume_experience_blocks=resume_data["experience_blocks"],
            jd_responsibilities_text=jd_data["jd_responsibilities_text"],
            resume_action_points=resume_data["action_points"],
            jd_education_requirements=jd_data["jd_education_requirements"],
            resume_education_blocks=resume_data["education_blocks"],
        )

        analysis_record = AnalysisHistory(
            job_title=job_title or "Software Engineer",
            company=company or "Target Company",
            ats_score=result["total_ats_score"],
            interpretation=result["score_interpretation"],
            result_json=json.dumps(result)
        )
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)

        result["analysis_id"] = analysis_record.id
        result["job_title"] = analysis_record.job_title
        result["company"] = analysis_record.company
        result["created_at"] = analysis_record.created_at.isoformat()
        result["filename"] = resume_file.filename

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis pipeline error: {str(e)}")


@resume_router.get("/history", summary="Get recent analysis history")
async def get_analysis_history(db: Session = Depends(get_db)):
    records = db.query(AnalysisHistory).order_by(AnalysisHistory.created_at.desc()).limit(20).all()
    history = []
    for r in records:
        history.append({
            "id": r.id,
            "job_title": r.job_title,
            "company": r.company,
            "ats_score": r.ats_score,
            "interpretation": r.interpretation,
            "created_at": r.created_at.isoformat(),
        })
    return {"history": history, "total": len(history)}


@resume_router.get("/history/{record_id}", summary="Get specific analysis details by ID")
async def get_analysis_by_id(record_id: int, db: Session = Depends(get_db)):
    record = db.query(AnalysisHistory).filter(AnalysisHistory.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Analysis record not found.")
    data = json.loads(record.result_json)
    data["analysis_id"] = record.id
    data["job_title"] = record.job_title
    data["company"] = record.company
    data["created_at"] = record.created_at.isoformat()
    data["total_ats_score"] = data.get("total_ats_score", record.ats_score)
    data["score_interpretation"] = data.get("score_interpretation", record.interpretation)
    return data
