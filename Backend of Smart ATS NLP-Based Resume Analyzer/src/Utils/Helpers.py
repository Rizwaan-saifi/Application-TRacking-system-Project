
from fastapi import HTTPException, Request, status, Depends
from src.Utils.Database.Settings import setting
from sqlalchemy.orm import Session
from jwt.exceptions import InvalidTokenError
import jwt
from src.Models.UserModel import User
from src.Utils.Database.db import get_db

def is_authenticated(request:Request, db:Session=Depends(get_db)):
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
