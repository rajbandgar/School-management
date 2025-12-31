from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class Teacher(BaseModel):
    __tablename__ = "teachers"

    user_id = Column(
        String(36),
        ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    phone = Column(String(20), nullable=True)
    address = Column(String(255), nullable=True)
    subject_specialization = Column(String(100), nullable=True)
    years_of_experience = Column(Integer, nullable=True)
    salary = Column(Integer, nullable=True)
    Emergency_contact = Column(String(20), nullable=True)
    Qualification = Column(String(100), nullable=True)
    City = Column(String(50), nullable=True)
    DOB = Column(String(20), nullable=True)
    State = Column(String(50), nullable=True)
    Joining_date = Column(String(20), nullable=True)
    Blood_group = Column(String(5), nullable=True)
    Employment = Column(String(50), nullable=True)
    ClassIncharge = Column(String(50), nullable=True)

    user = relationship("User", back_populates="teacher")