from sqlalchemy import Column, Integer, String, Boolean
from src.Utils.Database.db import Base


class User(Base):
    __tablename__ = "Users"

    id = Column(Integer,primary_key = True)
    name = Column (String)
    email = Column (String,unique= True, index= True, nullable=False)
    password = Column (String, nullable=False)
 