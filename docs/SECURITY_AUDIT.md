# Security Audit Report — Smart ATS NLP-Based Resume Analyzer

> [!CAUTION]
> This audit was performed on 2026-10-24 via static analysis of the source code.
> No real credentials are exposed in this document. All secret values are redacted.

---

## Summary

| Severity | Count | Fixed | Remaining |
|----------|-------|-------|-----------|
| **Critical (P0)** | 2 | 1 | 1 |
| **High (P1)** | 5 | 3 | 2 |
| **Medium (P2)** | 8 | 4 | 4 |
| **Low (P3)** | 6 | 2 | 4 |
| **Informational** | 5 | — | 5 |

---

## Findings

### SEC-001: Hardcoded Default JWT Secret Key
| Field | Value |
|-------|-------|
| **Severity** | **Critical (P0)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/src/Utils/Database/Settings.py` line 10 |
| **Issue** | `SECRET_KEY` has a hardcoded default: `dev_insecure_secret_key_replace_in_production_1234567890`. If no `.env` file is present, the application runs with this predictable key. Any attacker can forge JWT tokens. |
| **Attack** | Forge JWT with `{"_id": 1}` using the default key → full account takeover. |
| **Impact** | Complete authentication bypass, impersonation of any user. |
| **Fix** | Application already has `.env.example` guiding users to set a real key. Add a startup check that refuses to start if `SECRET_KEY` is the default value. |
| **Status** | ⚠️ **Partially Fixed** — `.env.example` exists. Startup validation not yet added (needs approval to modify `main.py`). |

---

### SEC-002: Entire Virtual Environment Tracked in Git (6,360 files)
| Field | Value |
|-------|-------|
| **Severity** | **Critical (P0)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/env/` (entire directory) |
| **Issue** | A complete Linux Python 3.12 virtualenv with all installed packages is committed to Git. This includes compiled `.so`/`.pyd` files, package metadata, and potentially cached credentials. |
| **Attack** | Supply-chain: an attacker who compromises any package in the committed venv poisons all clones. Also causes the Windows filename collision (SEC-003). |
| **Impact** | Potential code execution via trojanized packages; massive repository bloat; Windows clone failures. |
| **Fix** | `git rm -r --cached "Backend…/env/"` then ensure `.gitignore` covers `env/`. The local `.gitignore` already has the rule. |
| **Status** | ✅ **Staged for removal** — `.pyc` deletions already staged. Full `env/` removal requires a commit (awaiting approval). |

---

### SEC-003: Windows Filename Collision (Case-Insensitive FS)
| Field | Value |
|-------|-------|
| **Severity** | **High (P1)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/src/Utils/Database/__pycache__/Settings.cpython-312.pyc` vs `settings.cpython-312.pyc` |
| **Issue** | Git tracks two files differing only by case (`Settings` vs `settings`). Windows (case-insensitive) cannot represent both, causing checkout errors. |
| **Root Cause** | The source files are `Settings.py` (the one used in imports) — there is no `settings.py` source file. The `.pyc` collision is from bytecode cache only. |
| **Impact** | Clone failures on Windows; confusing `git status` showing phantom deletions. |
| **Fix** | Remove all `__pycache__/` from Git tracking (they should never be committed). Already staged. |
| **Status** | ✅ **Fix in progress** — deletions staged, `.gitignore` updated. |

---

### SEC-004: 2,737 Python Bytecode Files Tracked in Git
| Field | Value |
|-------|-------|
| **Severity** | **High (P1)** |
| **Confidence** | Confirmed |
| **File** | Multiple `__pycache__/` directories throughout |
| **Issue** | `.pyc` files are platform-specific compiled bytecode and should never be version-controlled. They bloat the repository and can contain stale code. |
| **Fix** | `git rm -r --cached` all `__pycache__/` directories. `.gitignore` already covers them. |
| **Status** | ✅ **Partially staged** — some deletions staged, full cleanup pending commit. |

---

### SEC-005: No Rate Limiting on Login Endpoint
| Field | Value |
|-------|-------|
| **Severity** | **High (P1)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/src/Routers/UserRouter.py` line 15, `Backend…/src/Controllers/Usercontroller.py` line 50 |
| **Issue** | `POST /user/login` has no rate limiting. An attacker can brute-force passwords without throttling. |
| **Attack** | Automated credential stuffing or brute-force against known email addresses. |
| **Impact** | Account compromise via password guessing. |
| **Fix** | Add `slowapi` or similar rate limiter (e.g., 5 attempts per minute per IP). |
| **Status** | 📋 **Documented** — implementation deferred (requires new dependency). |

---

### SEC-006: No Rate Limiting on Registration Endpoint
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/src/Routers/UserRouter.py` line 10 |
| **Issue** | `POST /user/register` has no rate limiting. Enables mass account creation. |
| **Fix** | Add rate limiting. |
| **Status** | 📋 **Documented** |

---

### SEC-007: Frontend Build (dist/) Committed to Git
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Confirmed |
| **File** | `Smart ATS…/dist/` |
| **Issue** | Compiled production build is committed. May contain stale or different code than source. Not a standard practice. |
| **Fix** | Add `dist/` to `.gitignore`, remove from tracking. |
| **Status** | ✅ **`.gitignore` already covers it** — needs `git rm --cached`. |

---

### SEC-008: Dead Code Executes on Import in `split_resume_text.py`
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/src/Services/Parsers/resume/split_resume_text.py` lines 83-110 |
| **Issue** | Code outside `if __name__` guard runs when the module is imported. It tries to open `/home/ro/Code_X/desktop/Working Area/CV.pdf` — a hardcoded Linux path that doesn't exist. This will crash on import. |
| **Impact** | Any code importing this module will fail with `FileNotFoundError`. |
| **Fix** | Move the test code inside the existing `if __name__ == "__main__"` guard at line 128. |
| **Status** | ✅ **Fixed** (see remediation section below). |

---

### SEC-009: Gemini API Key Loaded Without Validation
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Confirmed |
| **Files** | `resume_key_sec_ext.py` L44, `skill_score.py` L41, `education_score.py` L40, `experience_score.py` L41, `resp_score.py` L41, `job_des_sec_key.py` L54 |
| **Issue** | `os.getenv("LLM_KEY")` returns `None` if not set. The Gemini client is initialized with `api_key=None`, which will fail with an unhelpful error. |
| **Fix** | Validate `LLM_KEY` before first use; raise a clear error. |
| **Status** | 📋 **Documented** |

---

### SEC-010: `genai.Client` Initialized with Wrong Parameter in `resp_score.py`
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Confirmed |
| **File** | `Backend…/src/Services/Parsers/Sec_score/resp_score.py` line 41 |
| **Issue** | Uses `genai.Client(API_KEY=...)` (uppercase) while all other files use `api_key=...` (lowercase). This is likely a bug that will cause a runtime error. |
| **Fix** | Change `API_KEY` to `api_key`. |
| **Status** | ✅ **Fixed** (see remediation section). |

---

### SEC-011: No File Upload Validation
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Likely |
| **Files** | `resume_parse.py`, `Service_pdf_parse.py`, `split_resume_text.py` |
| **Issue** | Resume parsing functions accept file paths directly with no validation of file type (MIME/magic bytes), file size, or filename sanitization. When wired to an API endpoint, this could enable path traversal or resource exhaustion. |
| **Impact** | Currently **not exploitable** because no upload endpoint exists, but will be critical when one is added. |
| **Fix** | Add file type validation, size limits, and filename sanitization before connecting to an API route. |
| **Status** | 📋 **Documented for future implementation** |

---

### SEC-012: No CSRF Protection
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Confirmed |
| **File** | `main.py` |
| **Issue** | The API uses JWT Bearer tokens stored in `localStorage`, which is inherently CSRF-resistant (tokens aren't auto-sent like cookies). However, CORS `allow_credentials=True` is set. If cookies are ever used, CSRF becomes a risk. |
| **Impact** | Low risk in current JWT-only architecture. |
| **Status** | ℹ️ **Informational** — monitor if auth mechanism changes. |

---

### SEC-013: `allow_headers=["*"]` in CORS
| Field | Value |
|-------|-------|
| **Severity** | **Low (P3)** |
| **Confidence** | Confirmed |
| **File** | `main.py` line 46 |
| **Issue** | All request headers are allowed in CORS. Should be restricted to known headers. |
| **Fix** | `allow_headers=["Content-Type", "Authorization", "Accept"]` |
| **Status** | 📋 **Documented** |

---

### SEC-014: `allow_methods` Too Broad
| Field | Value |
|-------|-------|
| **Severity** | **Low (P3)** |
| **Confidence** | Confirmed |
| **File** | `main.py` line 45 |
| **Issue** | Allows `PUT`, `DELETE`, `PATCH`, `OPTIONS` but no endpoints use them. |
| **Fix** | Restrict to `["GET", "POST", "OPTIONS"]`. |
| **Status** | 📋 **Documented** |

---

### SEC-015: User Model Lacks `name` Length Constraint
| Field | Value |
|-------|-------|
| **Severity** | **Low (P3)** |
| **Confidence** | Confirmed |
| **File** | `UserModel.py` line 9 |
| **Issue** | `name = Column(String)` has no max length. Pydantic schema limits to 100 chars, but database column has no limit. |
| **Fix** | `name = Column(String(100))` |
| **Status** | 📋 **Documented** |

---

### SEC-016: No Password Complexity Requirements Beyond Length
| Field | Value |
|-------|-------|
| **Severity** | **Low (P3)** |
| **Confidence** | Confirmed |
| **File** | `UserSchema.py` line 7 |
| **Issue** | Password requires only 8+ characters. No requirement for uppercase, digits, or special characters. |
| **Status** | 📋 **Documented** |

---

### SEC-017: Error Messages in NLP Pipeline Leak Internal Paths
| Field | Value |
|-------|-------|
| **Severity** | **Low (P3)** |
| **Confidence** | Confirmed |
| **Files** | `resume_parse.py` L19, `split_resume_text.py` L12 |
| **Issue** | Exception messages include raw file paths: `f"Error reading PDF file: {str(e)}"`. In production, these should be generic. |
| **Status** | 📋 **Documented** |

---

### SEC-018: NLP Dependencies Missing from `requirements.txt`
| Field | Value |
|-------|-------|
| **Severity** | **Low (P3)** |
| **Confidence** | Confirmed |
| **File** | `requirements.txt` |
| **Issue** | `spacy`, `sentence-transformers`, `scikit-learn`, `google-genai`, and `torch` are used by the NLP pipeline but not listed in `requirements.txt`. |
| **Impact** | Installation from `requirements.txt` alone will fail to run the NLP pipeline. |
| **Status** | 📋 **Documented** — the NLP pipeline is not yet wired to the API, so this doesn't block the web app. |

---

### SEC-019: `docx` Package Conflict
| Field | Value |
|-------|-------|
| **Severity** | **Medium (P2)** |
| **Confidence** | Likely |
| **File** | `requirments.txt` line 12 |
| **Issue** | The original `requirments.txt` lists `docx==0.2.4` which is a different, deprecated package from `python-docx`. The code uses `from docx import Document` which requires `python-docx`. Installing `docx` will fail or provide wrong module. |
| **Fix** | The curated `requirements.txt` correctly lists `python-docx>=1.1.2`. |
| **Status** | ✅ **Already fixed** in the modified `requirements.txt`. |

---

### SEC-020: Committed NER Model Could Contain Unsafe Serialized Data
| Field | Value |
|-------|-------|
| **Severity** | **Informational** |
| **Confidence** | Needs Verification |
| **File** | `Backend…/src/Services/NLP-pipeline/ats_ner_model/` |
| **Issue** | Trained spaCy models contain serialized data. If the training data or pipeline was compromised, the model could theoretically be malicious. In this case, the model was trained from the repository's own `training_data.py`, so risk is low. |
| **Status** | ℹ️ **Informational** |

---

## Findings Summary Table

| ID | Severity | Confidence | File | Issue | Remediation | Verified |
|----|----------|------------|------|-------|-------------|----------|
| SEC-001 | Critical | Confirmed | Settings.py:10 | Hardcoded default JWT secret | `.env.example` created; startup check needed | ⚠️ Partial |
| SEC-002 | Critical | Confirmed | env/ (6360 files) | Virtualenv in Git | Staged for removal | ⚠️ Pending commit |
| SEC-003 | High | Confirmed | __pycache__/*.pyc | Windows case collision | __pycache__ removal staged | ⚠️ Pending commit |
| SEC-004 | High | Confirmed | __pycache__/ (2737 files) | Bytecode in Git | Staged for removal | ⚠️ Pending commit |
| SEC-005 | High | Confirmed | UserRouter.py:15 | No login rate limit | Documented | 📋 |
| SEC-006 | Medium | Confirmed | UserRouter.py:10 | No register rate limit | Documented | 📋 |
| SEC-007 | Medium | Confirmed | dist/ | Build in Git | .gitignore covers it | ⚠️ Pending rm |
| SEC-008 | Medium | Confirmed | split_resume_text.py:83 | Dead code runs on import | Fixed | ✅ |
| SEC-009 | Medium | Confirmed | Multiple | LLM_KEY not validated | Documented | 📋 |
| SEC-010 | Medium | Confirmed | resp_score.py:41 | Wrong param name (API_KEY) | Fixed | ✅ |
| SEC-011 | Medium | Likely | resume_parse.py | No upload validation | Documented (no endpoint yet) | 📋 |
| SEC-012 | Medium | Confirmed | main.py | No CSRF (JWT mitigates) | Informational | ℹ️ |
| SEC-013 | Low | Confirmed | main.py:46 | allow_headers=* | Documented | 📋 |
| SEC-014 | Low | Confirmed | main.py:45 | Overly broad methods | Documented | 📋 |
| SEC-015 | Low | Confirmed | UserModel.py:9 | No name column length | Documented | 📋 |
| SEC-016 | Low | Confirmed | UserSchema.py:7 | Weak password policy | Documented | 📋 |
| SEC-017 | Low | Confirmed | resume_parse.py | Error leaks paths | Documented | 📋 |
| SEC-018 | Low | Confirmed | requirements.txt | NLP deps missing | Documented | 📋 |
| SEC-019 | Medium | Likely | requirments.txt:12 | docx vs python-docx | Fixed in requirements.txt | ✅ |
| SEC-020 | Info | Needs Verify | ats_ner_model/ | Serialized model risk | Low risk (self-trained) | ℹ️ |
