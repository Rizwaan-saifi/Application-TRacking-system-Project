from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    DB_CONNECTION: str = Field(default="sqlite:///./ats.db", description="Database connection URL")
    SECRET_KEY: str = Field(default="dev_insecure_secret_key_replace_in_production_1234567890", description="JWT secret key")
    ALGORITHM: str = Field(default="HS256", description="JWT signing algorithm")
    EXP_TIME: int = Field(default=60, description="Token expiration time in minutes")
    ALLOWED_ORIGINS: str = Field(
        default="http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000",
        description="Comma-separated list of allowed CORS origins"
    )

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]


# Backward compatibility with existing imports
setting = Settings()
