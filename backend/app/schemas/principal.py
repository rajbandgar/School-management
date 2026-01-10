from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime, date


class PrincipalCreate(BaseModel):
    
    
    phone: str # for creating linked User
    first_name: str
    last_name: str
    email: Optional[str] = None
    date_of_birth: Optional[date] = None
    qualification: Optional[str] = None
    experience_years: Optional[int] = None
    joining_date: Optional[date] = None


class PrincipalUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    date_of_birth: Optional[date] = None
    qualification: Optional[str] = None
    experience_years: Optional[int] = None
    joining_date: Optional[date] = None


class PrincipalResponse(BaseModel):
    id: UUID
    
    
    first_name: str
    last_name: str
    email: Optional[str]
    
    qualification: Optional[str]
    experience_years: Optional[int]
    
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True






