from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base
import uuid


class StudentPerformance(Base):
    __tablename__ = "student_performance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    student_name = Column(String(100), nullable=False)
    completed_work = Column(String(20), nullable=False)   # "33 / 36"

    average_score = Column(Float, nullable=False)
    attention = Column(Integer, nullable=False)
    working = Column(Integer, nullable=False)
    mastered = Column(Integer, nullable=False)

    teacher_id = Column(UUID(as_uuid=True), nullable=False)
    class_name = Column(String(20), nullable=False)
