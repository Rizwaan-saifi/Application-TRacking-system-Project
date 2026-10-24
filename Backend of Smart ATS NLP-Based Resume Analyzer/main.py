from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from src.Utils.Database.db import Base, engine
from src.Utils.Database.Settings import setting
import src.Models.UserModel
import src.Models.AnalysisModel
from src.Routers.UserRouter import use_routes
from src.Routers.ResumeRouter import resume_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Smart ATS NLP-Based Resume Analyzer API",
    version="1.0.0",
    description="Backend API for Smart ATS Resume Analyzer and User Management",
    lifespan=lifespan
)


# Security headers middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response


app.add_middleware(SecurityHeadersMiddleware)

# Secure CORS configuration: explicit origins required when allow_credentials=True
app.add_middleware(
    CORSMiddleware,
    allow_origins=setting.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
)

app.include_router(use_routes)
app.include_router(resume_router)


@app.get("/", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "Smart ATS NLP-Based Resume Analyzer API",
        "version": "1.0.0"
    }
