import jwt 

from datetime import datetime, timedelta
from typing import Optional, Dict
import secrets
from app.core.config import settings



def create_access_token(data: Dict, expires_delta: int = 15) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)

    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt



def verify_token(token: str, token_type: str = "access") -> Optional[Dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None
    

def generate_otp() -> str:
    """Generate 6-digit OTP"""
    return f"{secrets.randbelow(900000) + 100000}"
