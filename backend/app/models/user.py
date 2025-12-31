from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class User(BaseModel):
    __tablename__ = "users"

    phone = Column(String(20), unique=True, nullable=False, index=True)
    role = Column(String(20), nullable=False, index=True)  # ADMIN, PRINCIPAL, TEACHER, PARENT

    # Relationships
    principal = relationship("Principal", back_populates="user", uselist=False)
    teacher = relationship("Teacher", back_populates="user", uselist=False)
   
