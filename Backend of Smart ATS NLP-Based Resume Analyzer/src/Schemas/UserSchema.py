from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name:str
    email:EmailStr
    password :str


class UserResponse(BaseModel):
    name:str
    email:EmailStr
    id:int

class LoginSchema(BaseModel):
    email:EmailStr
    password :str