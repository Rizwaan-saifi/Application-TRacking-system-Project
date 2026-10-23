import spacy
from training_data import TRAIN_DATA 
from spacy.training.example import Example


nlp = spacy.blank("en")

ner_model = nlp.add_pipe("ner")

LABELS = [
    # Personal
    "PERSON",
    "EMAIL",
    "PHONE",
    "LOCATION",

    # Experience
    "COMPANY",
    "JOB_TITLE",
    "START_DATE",
    "END_DATE",
    "EXPERIENCE_DURATION",

    # Education
    "DEGREE",
    "INSTITUTE",
    "EDUCATION_YEAR",
    "FIELD_OF_STUDY",

    # Skills (custom)
    "SKILL_TECH",
    "SKILL_FRAMEWORK",
    "SKILL_LANGUAGE",
    "SKILL_TOOL",
    "SKILL_DATABASE",

    # Projects
    "PROJECT_NAME",
    "PROJECT_TECH",
    "PROJECT_ROLE",
    "PROJECT_DESCRIPTION",

    # Certifications
    "CERTIFICATION_NAME",
    "CERTIFICATION_PLATFORM",
    "CERTIFICATION_DATE",

    # Achievements
    "ACHIEVEMENT_TITLE",
    "ACHIEVEMENT_TYPE",

    # Links
    "GITHUB_URL",
    "LINKEDIN_URL",
    "PORTFOLIO_URL"
]

for label in LABELS:
    ner_model.add_label(label)


optimizer = nlp.begin_training()

for epoch in range(10):
    for item in TRAIN_DATA:
        text = item["text"]
        annotations = {"entities": item["entities"]}
        
        doc = nlp.make_doc(text)
        example = Example.from_dict(doc, annotations)
        nlp.update([example], drop=0.5, losses={})

nlp.to_disk("ats_ner_model")