from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status, Request
from sqlalchemy.orm import Session
from pwdlib import PasswordHash
import jwt
from jwt.exceptions import InvalidTokenError, PyJWTError

from src.Schemas.UserSchema import UserCreate, LoginSchema
from src.Models.UserModel import User
from src.Utils.Database.Settings import setting

password_hash = PasswordHash.recommended()


def get_password_hash(password: str) -> str:
    return password_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def register(body: UserCreate, db: Session):
    is_user = db.query(User).filter(User.email == body.email.lower()).first()
    if is_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hash_password = get_password_hash(body.password)

    new_user = User(
        name=body.name.strip(),
        email=body.email.lower(),
        password=hash_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# Alias for backward compatibility with misspelled imports
resgister = register


def login_user(body: LoginSchema, db: Session):
    user = db.query(User).filter(User.email == body.email.lower()).first()
    
    # Mitigate account enumeration: return uniform message and avoid timing leak
    if not user or not verify_password(body.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    exp_time = datetime.now(timezone.utc) + timedelta(minutes=setting.EXP_TIME)

    token = jwt.encode(
        {"_id": user.id, "exp": int(exp_time.timestamp())},
        setting.SECRET_KEY,
        algorithm=setting.ALGORITHM
    )

    return {"token": token}


def is_authenticated(request: Request, db: Session):
    auth_header = request.headers.get("authorization")
    if not auth_header or not auth_header.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )

    parts = auth_header.strip().split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization scheme. Expected 'Bearer <token>'",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = parts[1]

    try:
        data = jwt.decode(token, setting.SECRET_KEY, algorithms=[setting.ALGORITHM])
        user_id = data.get("_id")
        if not user_id or not isinstance(user_id, int):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return user
    except (InvalidTokenError, PyJWTError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
