from pydantic import BaseModel
from datetime import date
from typing import Optional

class StudentBase(BaseModel):
    first_name: str
    last_name: str
    roll_number: str
    admission_number: str
    email: Optional[str]
    phone: Optional[str]
    emergency_contact: Optional[str]
    gender: Optional[str]
    date_of_birth: Optional[date]
    blood_group: Optional[str]
    class_name: Optional[str]
    section: Optional[str]
    admission_date: Optional[date]
    father_name: Optional[str]
    mother_name: Optional[str]
    parent_phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    nationality: Optional[str]
    attendance: Optional[str]
    status: Optional[str] = "active"

class StudentCreate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: str

    class Config:
        from_attributes = True
