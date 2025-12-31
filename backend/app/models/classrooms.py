import uuid
from sqlalchemy import Column, String, Integer, Date
from sqlalchemy.dialects.mysql import CHAR
from app.core.database import Base


class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    room_number = Column(String(20), nullable=False)
    class_name = Column(String(20), nullable=False)
    section = Column(String(10), nullable=False)

    floor = Column(String(50))
    building = Column(String(100))

    capacity = Column(Integer)
    current_students = Column(Integer)

    class_teacher = Column(String(100))
    assistant_teacher = Column(String(100))

    board = Column(String(50))
    medium = Column(String(50))

    projector = Column(String(10))
    smart_board = Column(String(10))
    air_conditioned = Column(String(10))

    benches = Column(Integer)
    desks = Column(Integer)
    windows = Column(Integer)

    timetable = Column(String(50))
    cleanliness_rating = Column(String(50))

    last_inspection = Column(Date)

    emergency_exit = Column(String(20))
    fire_extinguisher = Column(String(20))

    status = Column(String(20), default="active")
