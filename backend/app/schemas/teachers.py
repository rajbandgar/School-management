from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime, date


class TeacherCreate(BaseModel):
    
    first_name : str
    last_name : str
    email :str
    phone : str
    address : str
    subject_specialization : str
    years_of_experience : int
    salary : int
    Emergency_contact : str
    Qualification : str
    City : str
    DOB : str
    State : str
    Joining_date : str
    Blood_group : str
    Employment :str
    ClassIncharge : str 


class TeacherUpdate(BaseModel):
    first_name : str
    last_name : str
    email :str
    phone : str
    address : str
    subject_specialization : str
    years_of_experience : int
    salary : int
    Emergency_contact : str
    Qualification : str
    City : str
    DOB : str
    State : str
    Joining_date : str
    Blood_group : str
    Employment :str
    ClassIncharge : str 

class TeacherResponse(BaseModel):
    id:UUID
    first_name : str
    last_name : str
    email :str
    phone : str
    address : str
    subject_specialization : str
    years_of_experience : int
    salary : int
    Emergency_contact : str
    Qualification : str
    City : str
    DOB : str
    State : str
    Joining_date : str
    Blood_group : str
    Employment :str
    ClassIncharge : str 