import re

def clean_text(raw_text: str) -> str:
    # 1. Extra tabs, newlines aur spaces ko single space banayein
    text = re.sub(r'\s+', ' ', raw_text)
    
    # 2. Non-ASCII / junk symbols ko hataayein
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)
    
    return text.strip()