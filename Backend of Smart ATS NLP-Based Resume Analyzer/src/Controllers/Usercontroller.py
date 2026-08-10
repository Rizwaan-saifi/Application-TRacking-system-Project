from fastapi import HTTPException, status, Request
from src.Schemas.UserSchema import UserCreate,LoginSchema
from sqlalchemy.orm import Session
from src.Models.UserModel import User
from pwdlib import PasswordHash
import jwt 
from jwt.exceptions import InvalidTokenError
from src.Utils.Database.Settings import setting
from datetime import datetime, timedelta

password_hash = PasswordHash.recommended()


def get_password_hash(password):
    return password_hash.hash(password)

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

def resgister(body:UserCreate, db:Session):
    is_user = db.query(User).filter(User.email == body.email).first()
    if is_user:
        raise HTTPException(400, detail="Email is already exist")
    
    hash_password = get_password_hash(body.password)

    new_user = User(
        name = body.name,
        email = body.email,
        password = hash_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login_user(body:LoginSchema,db:Session):
    user = db.query(User).filter(User.email == body.email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email does not exist...")
    
    if not verify_password(body.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You enterd wrong password")
    
    exp_time = datetime.now() + timedelta(minutes= setting.EXP_TIME)
    
    token = jwt.encode({"_id":user.id, "exp":exp_time.timestamp()},setting.SECRET_KEY, setting.ALGORITHM )

    return {"token":token}


def is_authenticated(request:Request, db:Session):
      try:
        token = request.headers.get("authorization")
        if not token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized")

        token = token.split(" ")[-1]

        data = jwt.decode(token, setting.SECRET_KEY, setting.ALGORITHM)
        user_id = data.get("_id")


        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized")
    

        return user
      except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="You are unauthorized")
