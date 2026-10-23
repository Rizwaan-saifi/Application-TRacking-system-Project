import os
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------
# 1. PYDANTIC SCHEMAS (Strict Output Enforcers)
# ---------------------------------------------------------

class JobTitlesExtraction(BaseModel):
    resume_job_titles: List[str] = Field(
        default=[],
        description="Clean list of professional job titles, target roles, or designations found in the text (e.g., Full Stack Developer, Backend Engineer, Python Developer)."
    )

class SkillsExtraction(BaseModel):
    skill_keywords: List[str] = Field(
        default=[],
        description="Clean, normalized list of individual technical skills, programming languages, frameworks, libraries, tools, and databases found in the text."
    )

class EducationExtraction(BaseModel):
    education_keywords: List[str] = Field(
        default=[],
        description="Clean list of degree names, majors, branches, and academic qualifications (e.g., B.Tech, Computer Science, MCA)."
    )


# ---------------------------------------------------------
# 2. GEMINI LLM CALL WRAPPER 
# ---------------------------------------------------------

async def call_gemini_for_extraction(prompt: str, response_schema: Any) -> Dict[str, Any]:
    """
    Google Gemini Model ko call karke Pydantic schema ke hisab se structured data extract karta hai.
    """
    try:
        from google import genai
        from google.genai import types

        # Client initialization (GEMINI_API_KEY environment variable se uthayega)
        client = genai.Client(api_key=os.getenv("LLM_KEY"))

        response = client.models.generate_content(
            model='gemini-3.5-flash-lite',  # Fast aur cost-effective model
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=response_schema,
                temperature=0.0  # Zero temperature for deterministic extraction
            ),
        )
        
        import json
        return json.loads(response.text)

    except Exception as e:
        print(f"[ERROR] Gemini Extraction Failed: {str(e)}")
        # Fallback empty structures agar API fail ho jaye
        if response_schema == JobTitlesExtraction:
            return {"resume_job_titles": []}
        elif response_schema == SkillsExtraction:
            return {"skill_keywords": []}
        elif response_schema == EducationExtraction:
            return {"education_keywords": []}
        return {}


# ---------------------------------------------------------
# 3. MAIN FUNCTION TO PROCESS ALL SECTIONS
# ---------------------------------------------------------

async def extract_resume_keywords_via_llm(sections: Dict[str, str]) -> Dict[str, List[str]]:
    """
    Input: Parsed sections dictionary
    Output: Dictionary containing 'resume_job_titles', 'skill_keywords', and 'education_keywords' arrays.
    """

    # -----------------------------------------------------
    # TASK 1: Extract Job Titles from (Summary + Experience + Projects)
    # -----------------------------------------------------
    summary_text = sections.get('summary', '')
    experience_text = sections.get('experience', '')
    projects_text = sections.get('projects', '')

    job_title_combined_input = f"""
    --- SUMMARY / OBJECTIVE SECTION ---
    {summary_text}

    --- EXPERIENCE SECTION ---
    {experience_text}

    --- PROJECTS SECTION ---
    {projects_text}
    """

    job_title_prompt = f"""
    Analyze the following resume sections (Summary, Experience, and Projects). 
    Extract a clean, de-duplicated list of target or past job titles and roles held or sought by the candidate 
    (e.g., Backend Engineer, Full Stack Developer, Software Development Engineer). 
    Return only clear professional titles as an array.

    Input Text:
    {job_title_combined_input}
    """

    job_title_result = await call_gemini_for_extraction(job_title_prompt, JobTitlesExtraction)


    # -----------------------------------------------------
    # TASK 2: Extract Skill Keywords from (Skills + Projects)
    # -----------------------------------------------------
    skills_raw_text = sections.get('skills', '')

    skills_combined_input = f"""
    --- SKILLS SECTION ---
    {skills_raw_text}

    --- PROJECTS SECTION ---
    {projects_text}
    """

    skills_prompt = f"""
    Analyze the following resume sections (Skills and Projects). Extract a comprehensive, 
    de-duplicated, normalized list of individual technical skills, programming languages, 
    frameworks, libraries, tools, cloud services, and databases mentioned. 
    Do not include sentences, only precise keyword items.

    Input Text:
    {skills_combined_input}
    """

    skills_result = await call_gemini_for_extraction(skills_prompt, SkillsExtraction)


    # -----------------------------------------------------
    # TASK 3: Extract Education Keywords from (Education)
    # -----------------------------------------------------
    education_raw_text = sections.get('education', '')

    education_prompt = f"""
    Analyze the following Education section. Extract degree names (e.g., B.Tech, Bachelor of Engineering, B.Sc), 
    major streams/branches (e.g., Computer Science and Engineering, Information Technology), 
    and academic focus areas as clean keywords.

    Input Text:
    {education_raw_text}
    """

    education_result = await call_gemini_for_extraction(education_prompt, EducationExtraction)


    # -----------------------------------------------------
    # STEP 4: Return Complete Structured Keyword Dictionary
    # -----------------------------------------------------
    return {
        "resume_job_titles": job_title_result.get("resume_job_titles", []),
        "skill_keywords": skills_result.get("skill_keywords", []),
        "education_keywords": education_result.get("education_keywords", [])
    }

