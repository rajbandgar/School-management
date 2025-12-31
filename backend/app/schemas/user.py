from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserCreate(BaseModel):
    phone: str
    role: str
    




class UserCreate(BaseModel):
    phone: str
    role: str
    

class UserUpdate(BaseModel):
    phone: Optional[str] = None
    role: Optional[str] = None
    

class UserResponse(BaseModel):
    id: UUID
    phone: str
    role: str
    
    status: str
    created_at: datetime
    
    
    class Config:
        from_attributes = True






