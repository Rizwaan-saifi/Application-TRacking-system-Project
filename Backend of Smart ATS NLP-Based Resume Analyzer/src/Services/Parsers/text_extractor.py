import re
import io
from typing import List, Dict, Any


COMMON_TECH_SKILLS = [
    "python", "javascript", "typescript", "java", "c++", "c#", "go", "golang", "rust",
    "ruby", "php", "swift", "kotlin", "sql", "nosql", "html", "css", "sass", "graphql",
    "react", "react.js", "next.js", "vue", "vue.js", "angular", "node", "node.js",
    "express", "fastapi", "django", "flask", "spring", "spring boot", "asp.net",
    "postgresql", "postgres", "mysql", "mongodb", "redis", "elasticsearch", "sqlite",
    "aws", "azure", "gcp", "docker", "kubernetes", "k8s", "terraform", "ci/cd",
    "git", "github", "gitlab", "jira", "linux", "rest", "restful api", "rest api",
    "microservices", "kafka", "rabbitmq", "celery", "machine learning", "deep learning",
    "nlp", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy", "tailwind",
    "tailwindcss", "bootstrap", "agile", "scrum", "devops", "cloud computing"
]

DEGREE_PATTERNS = [
    r"b\.?tech", r"b\.?e\.?", r"b\.?s\.?c?", r"bachelor['’]?s?", r"undergraduate",
    r"m\.?tech", r"m\.?e\.?", r"m\.?s\.?c?", r"master['’]?s?", r"postgraduate",
    r"mca", r"bca", r"ph\.?d\.?", r"doctorate", r"diploma"
]


def extract_text_from_file_bytes(filename: str, content: bytes) -> str:
    """Extracts raw text from uploaded PDF, DOCX, or TXT file bytes."""
    filename_lower = filename.lower()
    
    if filename_lower.endswith(".pdf"):
        # Try pdfplumber first
        try:
            import pdfplumber
            with pdfplumber.open(io.BytesIO(content)) as pdf:
                text_pages = [page.extract_text() or "" for page in pdf.pages]
                return "\n".join(text_pages).strip()
        except Exception:
            # Fallback to pypdfium2
            import pypdfium2 as pdfium
            pdf = pdfium.PdfDocument(content)
            pages = []
            for i in range(len(pdf)):
                page = pdf[i]
                text_page = page.get_textpage()
                pages.append(text_page.get_text_range())
            return "\n".join(pages).strip()

    elif filename_lower.endswith(".docx"):
        from docx import Document
        doc = Document(io.BytesIO(content))
        lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
        for table in doc.tables:
            for row in table.rows:
                row_cells = [c.text.strip() for c in row.cells if c.text.strip()]
                if row_cells:
                    lines.append(" | ".join(row_cells))
        return "\n".join(lines).strip()

    else:
        # Plain text
        return content.decode("utf-8", errors="ignore").strip()


def extract_skills_from_text(text: str) -> List[str]:
    """Finds technical skills mentioned in the text using tokenization and pattern matching."""
    text_lower = text.lower()
    found = set()
    for skill in COMMON_TECH_SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text_lower):
            found.add(skill.title())
    return sorted(list(found))


def parse_resume_sections(raw_text: str) -> Dict[str, Any]:
    """Segments a candidate resume into skills, experience, bullet points, and education."""
    lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
    
    skills = extract_skills_from_text(raw_text)
    
    experience_lines = []
    action_points = []
    education_lines = []
    
    in_exp = False
    in_edu = False
    
    action_verb_pattern = re.compile(
        r"^(built|designed|developed|engineered|implemented|led|managed|created|"
        r"optimized|architected|automated|maintained|configured|integrated|deployed|reduced|increased)",
        re.IGNORECASE
    )
    
    for line in lines:
        line_clean = line.strip("•-* \t")
        line_lower = line.lower()
        
        # Section detection
        if any(h in line_lower for h in ["experience", "work history", "employment", "professional background"]):
            in_exp = True
            in_edu = False
            continue
        elif any(h in line_lower for h in ["education", "academic", "qualifications", "degrees"]):
            in_edu = True
            in_exp = False
            continue
        elif any(h in line_lower for h in ["skills", "technical skills", "projects", "certifications", "interests"]):
            in_exp = False
            in_edu = False
            
        if in_exp:
            experience_lines.append(line_clean)
            if action_verb_pattern.match(line_clean) or line.startswith(("-", "•", "*")):
                action_points.append(line_clean)
        elif in_edu:
            education_lines.append(line_clean)
        else:
            # Check for bullet points globally
            if action_verb_pattern.match(line_clean):
                action_points.append(line_clean)
            for deg_pat in DEGREE_PATTERNS:
                if re.search(deg_pat, line_lower):
                    education_lines.append(line_clean)
                    break
                    
    if not experience_lines:
        experience_lines = [l for l in lines if len(l) > 25][:5]
    if not action_points:
        action_points = [l for l in lines if action_verb_pattern.match(l) or len(l) > 30][:6]
    if not education_lines:
        for l in lines:
            for deg_pat in DEGREE_PATTERNS:
                if re.search(deg_pat, l.lower()):
                    education_lines.append(l)
        if not education_lines:
            education_lines = ["Bachelor's Degree in Computer Science or related field"]

    return {
        "skills": skills,
        "experience_blocks": experience_lines,
        "action_points": action_points,
        "education_blocks": education_lines,
        "full_text": raw_text
    }


def extract_role_and_company_from_jd(jd_text: str):
    """Extracts job title / role and company directly from the JD text."""
    role = None
    company = None

    # 1. Regex for role
    m_role = re.search(r'(?:job\s*title|role|position|title)\s*[:\-]\s*([^\n\r]+)', jd_text, re.IGNORECASE)
    if m_role:
        role = m_role.group(1).strip()
        role = re.split(r'[\(\[\{]', role)[0].strip()

    if not role:
        m_seek = re.search(r'(?:seeking|looking for|hiring)\s+(?:an?|our)\s+([A-Z][A-Za-z0-9\s\-/]+?)(?:\s+to|\s+who|\s+with|\.|\n)', jd_text, re.IGNORECASE)
        if m_seek:
            role = m_seek.group(1).strip()

    if not role or len(role) < 3 or len(role) > 60:
        first_line = jd_text.strip().splitlines()[0].strip()
        if len(first_line) < 50 and not any(kw in first_line.lower() for kw in ["about", "summary", "overview", "description"]):
            role = first_line
        else:
            role = "Software Engineer"

    # Company
    m_comp = re.search(r'company\s*[:\-]\s*([^\n\r]+)', jd_text, re.IGNORECASE)
    if m_comp:
        company = m_comp.group(1).strip()
    else:
        company = "Target Company"

    return role, company


def parse_job_description_sections(jd_text: str) -> Dict[str, Any]:
    """Segments a Job Description into required skills, experience, duties, and education."""
    skills = extract_skills_from_text(jd_text)
    if not skills:
        skills = ["Python", "FastAPI", "SQL", "Docker", "Git"]

    role_title, company_name = extract_role_and_company_from_jd(jd_text)
        
    lines = [line.strip() for line in jd_text.splitlines() if line.strip()]
    
    exp_lines = []
    resp_lines = []
    edu_lines = []
    
    current_sec = "intro"
    
    for line in lines:
        l_lower = line.lower()
        if any(w in l_lower for w in ["requirement", "qualification", "experience", "what we're looking for"]):
            current_sec = "exp"
            continue
        elif any(w in l_lower for w in ["responsibilit", "what you'll do", "role overview", "duties"]):
            current_sec = "resp"
            continue
        elif any(w in l_lower for w in ["education", "degree"]):
            current_sec = "edu"
            continue
            
        if current_sec == "exp":
            exp_lines.append(line)
        elif current_sec == "resp":
            resp_lines.append(line)
        elif current_sec == "edu":
            edu_lines.append(line)

    jd_exp_text = " ".join(exp_lines) if exp_lines else jd_text
    jd_resp_text = " ".join(resp_lines) if resp_lines else jd_text
    
    if not edu_lines:
        for line in lines:
            for deg_pat in DEGREE_PATTERNS:
                if re.search(deg_pat, line.lower()):
                    edu_lines.append(line)
        if not edu_lines:
            edu_lines = ["Bachelor's Degree in Computer Science, Engineering, or equivalent practical experience"]

    return {
        "job_skills": skills,
        "jd_experience_text": jd_exp_text,
        "jd_responsibilities_text": jd_resp_text,
        "jd_education_requirements": edu_lines,
        "extracted_role": role_title,
        "extracted_company": company_name
    }
