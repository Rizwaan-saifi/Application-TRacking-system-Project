# API Documentation — Smart ATS Resume Analyzer

> [!NOTE]
> Base URL: `http://127.0.0.1:8000` (Local Development)
> Interactive API Docs: `http://127.0.0.1:8000/docs` (Swagger UI) / `http://127.0.0.1:8000/redoc` (ReDoc)

---

## 1. Authentication Overview

- **Mechanism**: Bearer Token (JSON Web Token - JWT)
- **Algorithm**: `HS256`
- **Default Expiration**: 60 minutes (configurable via `EXP_TIME` environment variable)
- **Token Storage (Client)**: Stored in browser `localStorage.getItem("token")`
- **Authorization Header**:
  ```http
  Authorization: Bearer <your_jwt_token_here>
  ```

---

## 2. API Endpoints (Implemented & Verified)

### 2.1 Health Check

#### `GET /` or `GET /health`

Returns service health, title, and API version. Used by load balancers, container orchestrators, and monitoring probes.

- **Authentication**: None (Public)
- **Request Body**: None
- **Response `200 OK`**:
  ```json
  {
    "status": "healthy",
    "service": "Smart ATS NLP-Based Resume Analyzer API",
    "version": "1.0.0"
  }
  ```

---

### 2.2 User Registration

#### `POST /user/register`

Creates a new user account with an Argon2-hashed password.

- **Authentication**: None (Public)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "SecurePassword123!"
  }
  ```
  | Field | Type | Rules | Description |
  |-------|------|-------|-------------|
  | `name` | string | `1 <= length <= 100` | Full name of the user |
  | `email` | string | Valid email format (`EmailStr`) | Unique user email (automatically lowercased) |
  | `password` | string | `8 <= length <= 128` | Plaintext password to hash |

- **Responses**:
  - **`201 Created`**: User registered successfully. Password is never returned.
    ```json
    {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
  - **`400 Bad Request`**: Email already registered.
    ```json
    {
      "detail": "Email already registered"
    }
    ```
  - **`422 Unprocessable Entity`**: Validation failure (e.g., password < 8 characters, invalid email syntax).
    ```json
    {
      "detail": [
        {
          "type": "string_too_short",
          "loc": ["body", "password"],
          "msg": "String should have at least 8 characters"
        }
      ]
    }
    ```

---

### 2.3 User Login

#### `POST /user/login`

Authenticates a user via email and password, returning a signed JWT access token.

- **Authentication**: None (Public)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "jane.doe@example.com",
    "password": "SecurePassword123!"
  }
  ```

- **Responses**:
  - **`200 OK`**: Authentication successful.
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - **`401 Unauthorized`**: Invalid email or password.
    > [!IMPORTANT]
    > To prevent user enumeration attacks, this endpoint returns the identical error message and status code regardless of whether the email exists or the password was incorrect.
    ```json
    {
      "detail": "Invalid email or password"
    }
    ```
  - **`422 Unprocessable Entity`**: Missing email or password field.

---

### 2.4 Verify Authentication & Get Current User

#### `GET /user/is_auth`

Validates the provided Bearer token and returns the authenticated user's profile.

- **Authentication**: **Required** (`Authorization: Bearer <token>`)
- **Request Body**: None
- **Responses**:
  - **`200 OK`**:
    ```json
    {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    }
    ```
  - **`401 Unauthorized`**: Token missing, expired, malformed, or invalid scheme.
    ```json
    {
      "detail": "Authorization header missing"
    }
    ```
    or
    ```json
    {
      "detail": "Invalid authorization scheme. Expected 'Bearer <token>'"
    }
    ```
    or
    ```json
    {
      "detail": "Invalid or expired token"
    }
    ```

---

## 3. Security Headers Enforced

Every API response automatically includes standard protective HTTP headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-sniffing attacks |
| `X-Frame-Options` | `DENY` | Prevents clickjacking in iframes |
| `X-XSS-Protection` | `1; mode=block` | Enables legacy browser XSS filters |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Protects referrer leakage |

---

## 4. Proposed / Unimplemented Endpoints (Roadmap)

The NLP modules exist in the codebase but are **not yet wired** to FastAPI routers. To connect the frontend Dashboard to the NLP engine, the following endpoints should be implemented:

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `POST` | `/api/v1/resume/upload` | Upload PDF/DOCX resume file, parse text into sections | *Proposed* |
| `POST` | `/api/v1/resume/analyze` | Run 3-tier scoring (Skills, Education, Experience, Responsibilities) against a Job Description | *Proposed* |
| `GET` | `/api/v1/resume/history` | List candidate's previous analyses and scores | *Proposed* |
| `GET` | `/api/v1/resume/analysis/{id}` | Detailed breakdown of a specific score | *Proposed* |
