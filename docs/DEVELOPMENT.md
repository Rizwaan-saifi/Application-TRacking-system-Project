# Development & Contribution Guide

---

## 1. Codebase Structure & Conventions

```
Backend of Smart ATS NLP-Based Resume Analyzer/
├── main.py                     # FastAPI application entry point
├── requirements.txt            # Python dependencies
├── pytest.ini                  # Pytest configuration
├── tests/                      # Automated test suite
└── src/
    ├── Controllers/            # Business logic and database operations
    ├── Models/                 # SQLAlchemy database models
    ├── Routers/                # FastAPI APIRouter endpoints
    ├── Schemas/                # Pydantic request and response models
    ├── Services/               # NLP pipelines, parsers, and scoring algorithms
    └── Utils/                  # Configuration, database connection, and helpers
```

### 1.1 Python Coding Standards

- **Formatting & Style**: PEP 8 compliant, 4 spaces per indentation level.
- **Typing**: Use Python type annotations (`str`, `int`, `List[str]`, `Optional[str]`).
- **Imports**: Prefer absolute imports starting from `src.` (e.g., `from src.Utils.Database.db import Base`).
- **Module Names**: All new Python filenames should follow `snake_case.py`. Existing files with PascalCase (`Settings.py`, `UserModel.py`, `UserRouter.py`) are maintained for backward compatibility.
- **Passwords**: Never store or log plaintext passwords. Always hash using `PasswordHash.recommended()` (Argon2id) via `pwdlib`.
- **Secrets**: Never commit `.env` files or API keys. Always use `pydantic-settings` to load from environment variables with fallback examples in `.env.example`.

### 1.2 Frontend Coding Standards

```
Smart ATS NLP-Based Resume Analyzer/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies and npm scripts
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Root component
    ├── services/api.js         # Centralized Axios client with Bearer auth interceptor
    ├── pages/                  # Page components (Landing, Login, Register, Dashboard, History)
    └── componets/              # Reusable UI components
```

- **Framework**: React 19 (functional components + hooks).
- **Styling**: TailwindCSS 4 via `@tailwindcss/vite`.
- **API Client**: Always use `src/services/api.js` rather than direct `axios.post()` calls. The centralized client automatically attaches the `Authorization: Bearer <token>` header from `localStorage`.
- **Authentication**: Check `localStorage.getItem("token")` to render authenticated views or redirect to `/login`.

---

## 2. Testing Guidelines

### 2.1 Backend Tests

Run all unit and integration tests:

```powershell
cd "Backend of Smart ATS NLP-Based Resume Analyzer"
.\.venv\Scripts\pytest.exe -v
```

All test files must reside in the `tests/` directory and match the pattern `test_*.py`.
Tests use an in-memory SQLite database (`sqlite:///:memory:`) to ensure complete isolation from local and production data.

To run a specific test file:

```powershell
.\.venv\Scripts\pytest.exe tests/test_auth_api.py -v
```

### 2.2 Frontend Build & Lint

```powershell
cd "Smart ATS NLP-Based Resume Analyzer"
npm run build
npm run lint
```

---

## 3. Managing Dependencies

### 3.1 Backend Dependencies

- Add new core dependencies to `requirements.txt`.
- When adding optional or heavy ML dependencies (e.g., PyTorch, spaCy, sentence-transformers), document them separately or in an optional requirements file so standard web development remains lightweight.

### 3.2 Frontend Dependencies

- Manage via `npm install <package>`.
- Commit changes to `package.json` and `package-lock.json`.
- The `dist/` directory is excluded from version control via `.gitignore`.

---

## 4. Git Workflow & Repository Hygiene

- **Never commit `__pycache__/` or `*.pyc` files**: Gitignore rules are configured at the repository root.
- **Never commit virtual environments (`env/`, `.venv/`)**: Virtual environments are machine-specific and cause filename collisions on case-insensitive filesystems (Windows).
- **Branching**: Create feature branches from `main` (`feature/your-feature-name`), test thoroughly, and open a Pull Request.
