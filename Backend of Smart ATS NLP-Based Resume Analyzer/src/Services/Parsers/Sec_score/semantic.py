# src/Services/shared_embedding.py
from sentence_transformers import SentenceTransformer

print("[INFO] Loading Global Sentence Transformer Model ONCE...")
# Ye model pure application me sirf ek hi baar RAM me load hoga
global_semantic_model = SentenceTransformer('all-MiniLM-L6-v2')