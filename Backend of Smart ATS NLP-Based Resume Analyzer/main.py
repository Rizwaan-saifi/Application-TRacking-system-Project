from fastapi import FastAPI
from src.Utils.Database.db import Base, engine
import src.Models.UserModel  
from src.Routers.UserRouter import use_routes
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev ke liye ok
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(use_routes)