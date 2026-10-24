import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from main import app
from src.Utils.Database.db import Base, get_db
from src.Models.UserModel import User

# In-memory SQLite for fully isolated test execution
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


# ==============================================================================
# Health Check Tests
# ==============================================================================

def test_health_check_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "Smart ATS" in data["service"]


def test_health_check_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


# ==============================================================================
# Security Headers Middleware Tests
# ==============================================================================

def test_security_headers_present():
    response = client.get("/health")
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert response.headers.get("x-frame-options") == "DENY"
    assert response.headers.get("x-xss-protection") == "1; mode=block"
    assert response.headers.get("referrer-policy") == "strict-origin-when-cross-origin"


# ==============================================================================
# User Registration Tests
# ==============================================================================

def test_register_user_success():
    payload = {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "SecurePassword123!"
    }
    response = client.post("/user/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Jane Doe"
    assert data["email"] == "jane.doe@example.com"
    assert "id" in data
    # Password must NEVER be returned in response
    assert "password" not in data


def test_register_duplicate_email_fails():
    payload = {
        "name": "First User",
        "email": "duplicate@example.com",
        "password": "Password123!"
    }
    res1 = client.post("/user/register", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/user/register", json=payload)
    assert res2.status_code == 400
    assert "already registered" in res2.json()["detail"].lower()


def test_register_case_insensitive_email():
    payload1 = {
        "name": "User One",
        "email": "case.test@example.com",
        "password": "Password123!"
    }
    res1 = client.post("/user/register", json=payload1)
    assert res1.status_code == 201

    payload2 = {
        "name": "User Two",
        "email": "CASE.TEST@EXAMPLE.COM",
        "password": "Password123!"
    }
    res2 = client.post("/user/register", json=payload2)
    assert res2.status_code == 400


def test_register_short_password_fails_validation():
    payload = {
        "name": "Short Pass",
        "email": "short@example.com",
        "password": "short"
    }
    response = client.post("/user/register", json=payload)
    assert response.status_code == 422


def test_register_invalid_email_fails_validation():
    payload = {
        "name": "Bad Email",
        "email": "not-an-email",
        "password": "ValidPassword123!"
    }
    response = client.post("/user/register", json=payload)
    assert response.status_code == 422


# ==============================================================================
# User Login Tests
# ==============================================================================

def test_login_success():
    reg_payload = {
        "name": "Login User",
        "email": "login@example.com",
        "password": "SuperSecretPassword123!"
    }
    client.post("/user/register", json=reg_payload)

    login_payload = {
        "email": "login@example.com",
        "password": "SuperSecretPassword123!"
    }
    response = client.post("/user/login", json=login_payload)
    assert response.status_code == 200
    data = response.json()
    assert "token" in data
    assert isinstance(data["token"], str)


def test_login_wrong_password_fails():
    reg_payload = {
        "name": "Login User",
        "email": "wrongpass@example.com",
        "password": "CorrectPassword123!"
    }
    client.post("/user/register", json=reg_payload)

    login_payload = {
        "email": "wrongpass@example.com",
        "password": "IncorrectPassword123!"
    }
    response = client.post("/user/login", json=login_payload)
    assert response.status_code == 401
    assert "invalid email or password" in response.json()["detail"].lower()


def test_login_nonexistent_user_fails():
    login_payload = {
        "email": "nonexistent@example.com",
        "password": "SomePassword123!"
    }
    response = client.post("/user/login", json=login_payload)
    assert response.status_code == 401
    # Check that error is uniform (anti-account-enumeration)
    assert "invalid email or password" in response.json()["detail"].lower()


# ==============================================================================
# Authentication & Protected Route Tests (/user/is_auth)
# ==============================================================================

def test_is_auth_with_valid_token():
    reg_payload = {
        "name": "Auth User",
        "email": "auth@example.com",
        "password": "AuthPassword123!"
    }
    client.post("/user/register", json=reg_payload)

    login_res = client.post("/user/login", json={"email": "auth@example.com", "password": "AuthPassword123!"})
    token = login_res.json()["token"]

    response = client.get("/user/is_auth", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "auth@example.com"
    assert data["name"] == "Auth User"


def test_is_auth_missing_header():
    response = client.get("/user/is_auth")
    assert response.status_code == 401
    assert "header missing" in response.json()["detail"].lower()


def test_is_auth_invalid_scheme():
    response = client.get("/user/is_auth", headers={"Authorization": "Basic somebase64"})
    assert response.status_code == 401
    assert "bearer" in response.json()["detail"].lower()


def test_is_auth_malformed_token():
    response = client.get("/user/is_auth", headers={"Authorization": "Bearer invalid_token_xyz"})
    assert response.status_code == 401
    assert "invalid or expired token" in response.json()["detail"].lower()
