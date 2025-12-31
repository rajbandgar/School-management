from pydantic_settings import BaseSettings 

class Settings(BaseSettings):
    DATABASE_URL: str = "mysql+pymysql://root:123Raj.%40456@localhost:3306/school_management"
    REDIS_URL: str = "redis://localhost:6379/0"

    SECRET_KEY: str = "9f4c8c2c1c8e9a3d4c7b9a1e5f6c2a9f8b3d7c6e2a4b1c8d9e0f7a6b5c4d3"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    ENVIRONMENT: str = "development"
    OTP_EXPIRE_MINUTES: int = 5

    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()