# Local Development Setup Guide (Windows)

> [!NOTE]
> This guide has been verified on Windows with Python 3.11 and Node.js v22.13.0.

---

## 1. Prerequisites

Verify installed runtimes from Windows PowerShell:

```powershell
python --version    # Expected: Python 3.11+ or 3.12+
node -v             # Expected: Node.js 18+ (v22.13.0 verified)
npm -v              # Expected: npm 9+
git --version       # Expected: git 2.40+
```

> [!TIP]
> If `node` is not in your current PowerShell PATH, it is installed via NVM at:
> `C:\Users\devne\AppData\Local\nvm\v22.13.0`
> You can add it temporarily to your session with:
> `$env:PATH = "C:\Users\devne\AppData\Local\nvm\v22.13.0;$env:PATH"`

---

## 2. Repository Configuration & Environment Setup

### 2.1 Backend Environment Setup

Navigate to the backend directory:

```powershell
cd "C:\Users\devne\Application-TRacking-system-Project\Backend of Smart ATS NLP-Based Resume Analyzer"
```

Copy the example environment file:

```powershell
Copy-Item .env.example .env
```

The default `.env` is configured for **zero-config local SQLite development**:

```ini
# Database: Local SQLite
DB_CONNECTION=sqlite:///./ats.db

# Authentication: Generate a fresh key using: python -c "import secrets; print(secrets.token_hex(32))"
SECRET_KEY=dev_insecure_secret_key_replace_in_production_1234567890
ALGORITHM=HS256
EXP_TIME=60

# CORS: Allowed origins for local React frontend
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000

# Optional: Google Gemini API key for Tier-3 LLM Resume and JD parsing
LLM_KEY=your_gemini_api_key_here
```

### 2.2 Python Virtual Environment & Dependencies

If a virtual environment does not exist, create one:

```powershell
python -m venv .venv
```

Activate the virtual environment:

```powershell
# PowerShell:
.\.venv\Scripts\Activate.ps1

# Or Command Prompt (cmd.exe):
# .\.venv\Scripts\activate.bat
```

Install backend dependencies:

```powershell
pip install -r requirements.txt
```

---

## 3. Database Initialization

The backend uses **SQLAlchemy** with automatic schema creation on startup via the `lifespan` handler in `main.py`:

```python
Base.metadata.create_all(bind=engine)
```

No manual database migrations or seed scripts are required for local SQLite development. When the server starts, it will automatically create `ats.db` and the `Users` table.

To manually test database table creation without starting the HTTP server:

```powershell
python -c "from src.Utils.Database.db import Base, engine; import src.Models.UserModel; Base.metadata.create_all(bind=engine); print('Database initialized successfully!')"
```

---

## 4. Starting the Backend Server

From `Backend of Smart ATS NLP-Based Resume Analyzer`:

```powershell
# Make sure .venv is activated:
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Verify backend health:

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)
- **Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

Expected response from `/health`:

```json
{
  "status": "healthy",
  "service": "Smart ATS NLP-Based Resume Analyzer API",
  "version": "1.0.0"
}
```

---

## 5. Starting the Frontend Application

Open a **separate** terminal window:

```powershell
cd "C:\Users\devne\Application-TRacking-system-Project\Smart ATS NLP-Based Resume Analyzer"

# If Node is not in PATH:
$env:PATH = "C:\Users\devne\AppData\Local\nvm\v22.13.0;$env:PATH"

# Install npm dependencies (if not already installed):
npm install

# Start Vite development server:
npm run dev
```

The frontend will start at [http://localhost:5173](http://localhost:5173).

---

## 6. Running Tests & Quality Verification

### 6.1 Backend API Test Suite

From `Backend of Smart ATS NLP-Based Resume Analyzer`:

```powershell
.\.venv\Scripts\pytest.exe -v
```

This runs the 15 automated test cases in `tests/test_auth_api.py` covering:
- Health checks
- Security headers
- User registration, duplicate handling, and field validation
- User login, credential verification, and timing leak mitigations
- Bearer token verification on `/user/is_auth`

### 6.2 Frontend Production Build Test

From `Smart ATS NLP-Based Resume Analyzer`:

```powershell
npm run build
```

Expected output:
```
vite v8.3.5 building client environment for production...
✓ built in ~700ms
```

---

## 7. Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| `'node.exe' is not recognized` | NVM path missing from current PowerShell session | Run `$env:PATH = "C:\Users\devne\AppData\Local\nvm\v22.13.0;$env:PATH"` |
| `Cannot load script Activate.ps1 because script execution is disabled` | PowerShell execution policy | Run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| `ModuleNotFoundError: No module named 'src'` | Running python from subfolder | Run scripts from `Backend of Smart ATS NLP-Based Resume Analyzer` root |
| `CORS Error in Browser` | Frontend port mismatch | Ensure frontend URL matches `ALLOWED_ORIGINS` in backend `.env` |
| `Port 8000 already in use` | Zombie uvicorn or python process | Check running processes: `Get-Process python*` |
