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


def clean_role_string(val: str) -> str:
    """Strips markdown headers, bullets, special characters, and trailing info."""
    val = re.sub(r'^[#*\s\-•:>]+', '', val)
    val = re.sub(r'[*_`]+', '', val)
    val = re.split(r'[\(\[\{]', val)[0]
    # Remove leading fluffy adjectives like 'passionate', 'experienced', etc.
    val = re.sub(r'^(?:passionate|talented|skilled|dynamic|experienced|exceptional|enthusiastic|driven)\s+', '', val, flags=re.IGNORECASE)
    return val.strip()


def extract_role_and_company_from_jd(jd_text: str):
    """Extracts job title / role and company directly from the JD text with multi-layer heuristics."""
    role = None
    company = None

    ROLE_KEYWORDS = [
        'engineer', 'developer', 'analyst', 'scientist', 'architect', 'specialist', 
        'designer', 'manager', 'lead', 'consultant', 'administrator', 'qa', 'devops', 
        'intern', 'associate', 'programmer', 'sre', 'product manager'
    ]

    # 1. Regex for explicit label (e.g. "Job Title: Senior React Developer", "Role - Backend Engineer")
    m_role = re.search(r'(?:job\s*(?:title|role|position)|role\s*(?:title|name)?|position\s*(?:title|name)?|title)\s*[:\-]\s*([^\n\r]+)', jd_text, re.IGNORECASE)
    if m_role:
        cleaned = clean_role_string(m_role.group(1))
        if len(cleaned) >= 3 and len(cleaned) <= 65:
            role = cleaned

    # 2. Check the first 5 non-empty lines for common job keywords
    if not role:
        lines = [clean_role_string(l) for l in jd_text.splitlines() if l.strip()]
        for l in lines[:6]:
            l_lower = l.lower()
            if any(kw in l_lower for kw in ROLE_KEYWORDS) and len(l) >= 4 and len(l) <= 65:
                # Avoid matching entire sentence headers like "Responsibilities for the software engineer"
                if not any(header in l_lower for header in ["responsibilit", "qualification", "requirement", "overview", "about us", "summary"]):
                    role = l
                    break

    # 3. Seeking / Looking for patterns
    if not role:
        m_seek = re.search(r'(?:seeking|looking for|hiring|hire|join our team as|position of|opportunity for)\s+(?:an?|our)?\s*([A-Za-z0-9\s\-/]{3,50}?)(?:\s+(?:to|who|with|for|\.|\n|,|;))', jd_text, re.IGNORECASE)
        if m_seek:
            cleaned = clean_role_string(m_seek.group(1))
            if len(cleaned) >= 3 and len(cleaned) <= 60:
                role = cleaned

    # 4. Fallback: inspect first clean line
    if not role:
        lines = [clean_role_string(l) for l in jd_text.splitlines() if l.strip()]
        if lines:
            first_line = lines[0]
            if len(first_line) <= 50 and not any(kw in first_line.lower() for kw in ["about", "summary", "overview", "description", "http"]):
                role = first_line
            else:
                role = "Software Engineer"
        else:
            role = "Software Engineer"

    # Company Extraction
    m_comp = re.search(r'(?:company(?:\s*name)?|organization|employer)\s*[:\-]\s*([^\n\r]+)', jd_text, re.IGNORECASE)
    if m_comp:
        comp_candidate = re.sub(r'[*_`]+', '', m_comp.group(1)).strip()
        comp_candidate = re.split(r'[\(\[\{]', comp_candidate)[0].strip()
        if len(comp_candidate) >= 2 and len(comp_candidate) <= 50:
            company = comp_candidate

    if not company:
        m_comp_at = re.search(r'(?:at|about)\s+([A-Z][A-Za-z0-9\s\.\,&\'\-]+?)(?:\s+(?:is|we are|was founded|\.|\n|,))', jd_text)
        if m_comp_at:
            cand = m_comp_at.group(1).strip()
            if 2 <= len(cand) <= 40 and not any(w in cand.lower() for w in ["the", "this", "our", "your", "a"]):
                company = cand

    if not company:
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
