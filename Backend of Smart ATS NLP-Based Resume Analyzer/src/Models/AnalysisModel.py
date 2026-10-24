from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime
from src.Utils.Database.db import Base


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    job_title = Column(String, default="Software Engineer")
    company = Column(String, default="Target Company")
    ats_score = Column(Float, nullable=False)
    interpretation = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    result_json = Column(Text, nullable=False)
