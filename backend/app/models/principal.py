from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Principal(BaseModel):
    __tablename__ = "principals"

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
    qualification = Column(String(100), nullable=True)
    experience_years = Column(Integer, nullable=True)

    user = relationship("User", back_populates="principal")
