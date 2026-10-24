from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session
from src.Schemas.UserSchema import UserCreate, UserResponse, LoginSchema
from src.Utils.Database.db import get_db
from src.Controllers import Usercontroller

use_routes = APIRouter(prefix="/user", tags=["User"])


@use_routes.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(body: UserCreate, db: Session = Depends(get_db)):
    return Usercontroller.register(body, db)


@use_routes.post("/login", status_code=status.HTTP_200_OK)
def login(body: LoginSchema, db: Session = Depends(get_db)):
    return Usercontroller.login_user(body, db)


@use_routes.get("/is_auth", response_model=UserResponse, status_code=status.HTTP_200_OK)
def is_auth(request: Request, db: Session = Depends(get_db)):
    return Usercontroller.is_authenticated(request, db)
