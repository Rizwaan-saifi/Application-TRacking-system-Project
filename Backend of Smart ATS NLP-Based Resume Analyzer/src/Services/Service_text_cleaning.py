import re

def clean_text(text: str):
    # lowercase
    text = text.lower()

    # remove new lines
    text = re.sub(r'\n', ' ', text)

    # remove special characters
    text = re.sub(r'[^a-zA-Z0-9+.# ]', '', text)

    # remove extra spaces
    text = re.sub(r'\s+', ' ', text)

    return text.strip()