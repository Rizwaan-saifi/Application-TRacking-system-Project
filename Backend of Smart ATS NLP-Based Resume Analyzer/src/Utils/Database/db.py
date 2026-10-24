from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from src.Utils.Database.Settings import setting 

Base = declarative_base()

connect_args = {}
if setting.DB_CONNECTION.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    url=setting.DB_CONNECTION,
    connect_args=connect_args,
    pool_pre_ping=True
)

LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    session = LocalSession()
    try:
        yield session
    finally:
        session.close()
