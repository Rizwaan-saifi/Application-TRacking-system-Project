import os
import json
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()


# ---------------------------------------------------------
# 1. PYDANTIC SCHEMAS (Strict JSON & Structure Enforcer)
# ---------------------------------------------------------

class JobDescriptionExtraction(BaseModel):
    target_job_title: str = Field(
        description="The primary job title or role being hired for (e.g., Senior Full Stack Engineer)."
    )
    skill: str = Field(
        description="Raw text content describing the technical skills, tools, and technologies required for the job."
    )
    experience: str = Field(
        description="Raw text content describing the required years of experience and background."
    )
    responsibility: str = Field(
        description="Raw text content detailing the roles, duties, and responsibilities of the position."
    )
    education: str = Field(
        description="Raw text content detailing the required educational qualifications or degree requirements."
    )
    job_skill_keyword: List[str] = Field(
        default=[],
        description="Clean, de-duplicated list of individual technical skills, languages, frameworks, and tools extracted from the skill section."
    )
    job_education_keyword: List[str] = Field(
        default=[],
        description="Clean list of required degree names, branches, or academic qualifications extracted from the education section."
    )


# ---------------------------------------------------------
# 2. LLM PROCESSING FUNCTION
# ---------------------------------------------------------

async def parse_and_extract_job_description(jd_raw_text: str) -> Dict[str, Any]:
    """
    Input: Raw Job Description text
    Output: Dictionary containing 5 raw sections + 2 structured keyword arrays.
    """
    try:
        from google import genai
        from google.genai import types

        # Gemini Client Initialization
        client = genai.Client(api_key=os.getenv("LLM_KEY"))

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) parser. Analyze the following Job Description (JD) text carefully.

        Your task is to perform two things:
        1. Segment the JD text into 5 distinct raw text sections:
           - 'target_job_title': The role/designation.
           - 'skill': Raw text mentioning required technical skills/tools.
           - 'experience': Raw text detailing experience requirements.
           - 'responsibility': Raw text detailing daily duties or responsibilities.
           - 'education': Raw text detailing degree/qualification requirements.
        
        2. Extract keywords:
           - From the 'skill' content, extract a normalized list of individual technology keywords into 'job_skill_keyword'.
           - From the 'education' content, extract clean degree/branch keywords into 'job_education_keyword'.

        Job Description Raw Text:
        {jd_raw_text}
        """

        # Gemini API Call with Pydantic Schema enforcement
        response = client.models.generate_content(
            model='gemini-3.5-flash-lite',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=JobDescriptionExtraction,
                temperature=0.0  # Zero temperature for deterministic/consistent output
            ),
        )

        return json.loads(response.text)

    except Exception as e:
        print(f"[ERROR] JD Parsing & LLM Extraction Failed: {str(e)}")
        # Fallback structure in case of failure
        return {
            "target_job_title": "",
            "skill": "",
            "experience": "",
            "responsibility": "",
            "education": "",
            "job_skill_keyword": [],
            "job_education_keyword": []
        }

text = """
This position is listed on behalf of a partner company, which manages all applications and next steps. Our partner is looking for a Cloud Engineer based in India.

Join a technology-driven team focused on building and maintaining secure, reliable, and scalable cloud infrastructure. In this role, you will work primarily with AWS services, cloud networking, infrastructure as code, and automation tools to support critical platform operations. You will collaborate with engineering, security, networking, and operations teams to improve system reliability, streamline deployments, and resolve complex technical challenges. Your contributions will help standardize infrastructure practices, strengthen security, and optimize cloud performance. You will also play an important role in developing reusable tools and self-service capabilities that empower application teams to work more efficiently. This opportunity is ideal for an infrastructure professional who enjoys automation, problem-solving, and continuous improvement in a collaborative engineering environment.

Accountabilities

Support the design, implementation, maintenance, and operation of AWS infrastructure and shared cloud platform services.
Build, maintain, and improve infrastructure-as-code solutions, reusable modules, and engineering best practices to ensure consistent and repeatable deployments.
Configure, monitor, and troubleshoot AWS networking components, including VPCs, subnets, routing, security groups, load balancers, DNS, and network connectivity.
Automate routine operational activities through scripting, reusable workflows, and standardized processes to reduce manual effort and improve efficiency.
Monitor infrastructure health, investigate incidents, troubleshoot technical issues, and participate in on-call or escalation support through a shared team rotation.
Apply security, availability, reliability, cost optimization, and compliance best practices across cloud infrastructure and operational procedures.
Collaborate with application engineering, security, networking, site reliability engineering (SRE), and service management teams to resolve infrastructure challenges and deliver platform enhancements.
Develop and maintain technical documentation, operational runbooks, infrastructure standards, and troubleshooting procedures.
Participate in code reviews, infrastructure design reviews, technical planning, and continuous improvement initiatives.
Contribute to the development of reusable infrastructure services and self-service platform capabilities that enable application teams to provision and manage resources more efficiently.

Requirements

A bachelor's degree in Computer Science, Information Technology, Engineering, or a related discipline; equivalent practical experience may also be considered.
Three to five years of professional experience in cloud engineering, DevOps, site reliability engineering, systems administration, or a related infrastructure role.
Hands-on experience supporting AWS environments across development, testing, or production workloads.
Practical experience with infrastructure-as-code tools and approaches for provisioning, configuring, and managing cloud resources.
Experience troubleshooting cloud infrastructure, networking configurations, application deployments, and continuous integration and continuous delivery (CI/CD) pipelines.
Familiarity with AWS networking concepts, including VPCs, subnets, routing, security groups, load balancers, DNS, and connectivity troubleshooting.
Knowledge of scripting and automation techniques to simplify operational tasks and improve infrastructure consistency.
Understanding of cloud security, reliability, availability, cost management, and compliance principles.
Strong analytical and problem-solving skills, with the ability to investigate technical issues and implement effective, sustainable solutions.
Good communication and collaboration skills, with the ability to work effectively across engineering and operations teams.
A proactive approach to documentation, knowledge sharing, technical learning, and continuous improvement.

Benefits

Competitive employee benefits package, including supplementary health insurance and dental coverage, subject to local eligibility.
Generous paid time off, subject to applicable eligibility requirements.
Paid volunteering leave to support charitable initiatives and community engagement, where eligible.
Employee assistance program offering resources and support for personal well-being.
Professional development and career advancement opportunities, including structured growth programs.
Employee resource groups and engagement initiatives that encourage inclusion, collaboration, and stronger workplace connections.
Opportunities to work with modern cloud technologies and contribute to infrastructure automation, platform reliability, and operational excellence.
A collaborative working environment that values authenticity, curiosity, integrity, teamwork, and customer focus.

How Jobgether Works

We use an AI-powered matching process to ensure your application is reviewed quickly, objectively, and fairly against the role's core requirements. Our system identifies the top-fitting candidates, and this shortlist is then shared directly with the hiring company. The final decision and next steps (interviews, assessments) are managed by their internal team.

We appreciate your interest and wish you the best!

 Why Apply Through Jobgether?

Data Privacy Notice: By submitting your application, you acknowledge that Jobgether will process your personal data to evaluate your candidacy and share relevant information with the hiring employer. This processing is based on legitimate interest and pre-contractual measures under applicable data protection laws (including GDPR). You may exercise your rights (access, rectification, erasure, objection) at any time.

We may use artificial intelligence (AI) tools to support parts of the hiring process, such as reviewing applications, analyzing resumes, or assessing responses and identifying potential inconsistencies or verification signals in application materials based on available information. These tools assist our recruitment team but do not replace human judgment. Final hiring decisions are ultimately made by humans. If you would like more information about how your data is processed, please contact us.

"""


# import asyncio

# # 1. Ek async function banayein
# async def main():
#     result = await parse_and_extract_job_description(text)
#     print("----------------Target job title section--------------------")
#     print(result.target_job_title)
#     print("----------------skill--------------------")
#     print(result.skill)
#     print("----------------experience--------------------")
#     print(result.experience)
#     print("----------------responsibility--------------------")
#     print(result.responsibility)
#     print("----------------education--------------------")
#     print(result.education)
#     print("----------------job_skill_keyword--------------------")
#     print(result.job_skill_keyword)
#     print("----------------job_education_keyword--------------------")
#     print(result.job_education_keyword)

# if __name__ == "__main__":
#     asyncio.run(main())


import asyncio

async def test_jd_parser():
    sample_jd = """
    We are looking for a Senior Python Backend Developer with 3-5 years of experience.
    
    Responsibilities:
    - Design and build scalable REST APIs using FastAPI and Django.
    - Manage databases using MongoDB, PostgreSQL, and Redis.
    - Write clean code, deploy services using Docker and AWS.
    
    Requirements & Skills:
    - Proficient in Python, SQL, NoSQL, FastAPI, Docker, Git.
    - Strong understanding of microservices architecture.
    
    Education:
    - Bachelor's degree in Computer Science, Information Technology, or a related field.
    """

    print("[INFO] Processing Job Description via Gemini LLM...")
    result = await parse_and_extract_job_description(sample_jd)

    print("\n" + "=" * 50)
    print("         PARSED JOB DESCRIPTION OUTPUT         ")
    print("=" * 50)
    print(json.dumps(result, indent=4))
    print("=" * 50)

if __name__ == "__main__":
    asyncio.run(test_jd_parser())
