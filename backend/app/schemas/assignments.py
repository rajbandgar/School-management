from pydantic import BaseModel
from uuid import UUID
from datetime import date


class AssignmentBase(BaseModel):
    title: str
    subject: str
    class_name: str
    section: str
    total_students: int
    submitted: int
    pending: int
    assigned_date: date
    due_date: date
    description: str | None = None
    attachment: str | None = None
    status: str


class AssignmentCreate(AssignmentBase):
    pass


class AssignmentOut(AssignmentBase):
    id: UUID

    class Config:
        from_attributes = True
