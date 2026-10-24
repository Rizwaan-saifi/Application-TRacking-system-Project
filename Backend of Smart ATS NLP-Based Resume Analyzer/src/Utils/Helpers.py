from fastapi import Request, Depends
from sqlalchemy.orm import Session
from src.Utils.Database.db import get_db
from src.Controllers.Usercontroller import is_authenticated as user_is_authenticated


def is_authenticated(request: Request, db: Session = Depends(get_db)):
    """FastAPI dependency to verify bearer token and retrieve the current user."""
    return user_is_authenticated(request, db)
