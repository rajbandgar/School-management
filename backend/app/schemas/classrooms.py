from pydantic import BaseModel
from typing import Optional
from datetime import date
from uuid import UUID

class ClassroomBase(BaseModel):
    room_number: str
    class_name: str
    section: str

    floor: Optional[str] = None
    building: Optional[str] = None

    capacity: Optional[int] = None
    current_students: Optional[int] = None

    class_teacher: Optional[str] = None
    assistant_teacher: Optional[str] = None

    board: Optional[str] = None
    medium: Optional[str] = None

    projector: Optional[str] = None
    smart_board: Optional[str] = None
    air_conditioned: Optional[str] = None

    benches: Optional[int] = None
    desks: Optional[int] = None
    windows: Optional[int] = None

    timetable: Optional[str] = None
    cleanliness_rating: Optional[str] = None

    last_inspection: Optional[date] = None

    emergency_exit: Optional[str] = None
    fire_extinguisher: Optional[str] = None

    status: str = "active"


class ClassroomCreate(ClassroomBase):
    pass


class ClassroomResponse(ClassroomBase):
    id: UUID

    class Config:
        from_attributes = True
