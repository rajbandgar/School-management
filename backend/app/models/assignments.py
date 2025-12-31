from sqlalchemy import Column, String, Integer, Date
from app.core.database import Base
import uuid


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    title = Column(String(200), nullable=False)
    subject = Column(String(50), nullable=False)
    class_name = Column(String(10), nullable=False)
    section = Column(String(5), nullable=False)

    total_students = Column(Integer, nullable=False)
    submitted = Column(Integer, nullable=False)
    pending = Column(Integer, nullable=False)

    assigned_date = Column(Date, nullable=False)
    due_date = Column(Date, nullable=False)

    description = Column(String(500))
    attachment = Column(String(255))
    status = Column(String(20), default="active")

    
    teacher_id = Column(String(36), nullable=False)
