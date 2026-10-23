import os
import re
from Services.Parsers.resume.resume_parse import extract_raw_text_from_pdf, extract_raw_text_from_docx
from Services.Parsers.resume.resume_key_sec_ext import extract_resume_keywords_via_llm
# ---------------------------------------------------------
# STEP 2: RAW TEXT EXTRACTOR ROUTER
# ---------------------------------------------------------

def get_raw_resume_text(file_path: str) -> str:
    """Extension ke basis par correct extractor call karta hai."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found at path: {file_path}")

    _, ext = os.path.splitext(file_path)
    ext = ext.lower().strip()

    if ext == ".pdf":
        print(f"[INFO] Processing PDF file: {file_path}")
        return extract_raw_text_from_pdf(file_path)
    elif ext in [".docx", ".doc"]:
        print(f"[INFO] Processing DOCX file: {file_path}")
        return extract_raw_text_from_docx(file_path)
    else:
        raise ValueError(f"Unsupported file format '{ext}'. Only .pdf and .docx are supported.")


# ---------------------------------------------------------
# STEP 3: SECTION SEGMENTATION ENGINE
# ---------------------------------------------------------

SECTION_PATTERNS = {
    "summary": r"\b(summary|about\s+me|profile|professional\s+summary|objective)\b",
    "skills": r"\b(skills|technical\s+skills|skills\s*&\s*tools|technologies|core\s+competencies)\b",
    "experience": r"\b(work\s+experience|experience|employment\s+history|work\s+history)\b",
    "projects": r"\b(projects|personal\s+projects|academic\s+projects)\b",
    "education": r"\b(education|academic\s+background|qualifications)\b",
    "certifications": r"\b(certifications|certificates|licenses)\b"
}

def parse_text_into_sections(raw_text: str) -> dict:
    """Raw text string ko Regex headers ke base par dictionary me split karta hai."""
    sections = {
        "header_info": [],
        "summary": [],
        "skills": [],
        "experience": [],
        "projects": [],
        "education": [],
        "certifications": []
    }
    
    current_section = "header_info"
    lines = raw_text.split("\n")

    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue

        matched_section = None

        # Short header check (< 5 words)
        if len(clean_line.split()) < 5:
            for sec_name, pattern in SECTION_PATTERNS.items():
                if re.search(pattern, clean_line, re.IGNORECASE):
                    matched_section = sec_name
                    break

        if matched_section:
            current_section = matched_section
        else:
            sections[current_section].append(clean_line)

    return {sec: "\n".join(content) for sec, content in sections.items()}


# ---------------------------------------------------------
# EXECUTION / DRIVER CODE - CODE CHECK
# ---------------------------------------------------------

# if __name__ == "__main__":

    # Test Path (Pass PDF or DOCX)
    file_path = "/home/ro/Code_X/desktop/Working Area/CV.pdf"

    try:
        # Phase 1: Raw Text Extraction
        raw_text = get_raw_resume_text(file_path)
        print("\n[SUCCESS] Raw Text Extracted Successfully!")
        print(f"Total Character Length: {len(raw_text)}")

        # Phase 2: Section Splitting
        parsed_sections = parse_text_into_sections(raw_text)

        # Output Display
        print("\n" + "=" * 50)
        print("             PARSED RESUME SECTIONS             ")
        print("=" * 50)

        for section_name, section_content in parsed_sections.items():
            print(f"\n--- [ SECTION: {section_name.upper()} ] ---")
            if section_content.strip():
                print(section_content)
            else:
                print("(No content found for this section)")

        print("\n" + "=" * 50)

    except Exception as err:
        print(f"\n[ERROR] Pipeline Failed: {str(err)}")



import asyncio

async def main():
    file_path = "/home/ro/Code_X/desktop/Working Area/CV.pdf"
    
    raw_text = get_raw_resume_text(file_path)
    parsed_sections = parse_text_into_sections(raw_text)

    result = await extract_resume_keywords_via_llm(parsed_sections)

    print("\n--- LLM EXTRACTED RESULTS ---")
    import json
    print(json.dumps(result, indent=4))

if __name__ == "__main__":
    asyncio.run(main())

