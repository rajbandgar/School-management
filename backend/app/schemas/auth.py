from pydantic import BaseModel
from typing import Optional


class OTPRequest(BaseModel):
    phone: str


class OTPVerify(BaseModel):
    phone: str
    otp: str


class Token(BaseModel):
    access_token: str
    
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: Optional[str] = None
    role: Optional[str] = None
    school_id: Optional[str] = None






