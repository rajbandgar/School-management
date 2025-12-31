from sqlalchemy import Column, String, Integer, Date, Enum
from sqlalchemy.dialects.mysql import VARCHAR
from app.core.database import Base
import uuid

class Student(Base):
    __tablename__ = "students"

    id = Column(VARCHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    first_name = Column(VARCHAR(50), nullable=False)
    last_name = Column(VARCHAR(50), nullable=False)

    roll_number = Column(VARCHAR(10), nullable=False)
    admission_number = Column(VARCHAR(20), unique=True, nullable=False)

    email = Column(VARCHAR(100))
    phone = Column(VARCHAR(15))
    emergency_contact = Column(VARCHAR(15))

    gender = Column(VARCHAR(10))
    date_of_birth = Column(Date)
    blood_group = Column(VARCHAR(5))

    class_name = Column(VARCHAR(10))
    section = Column(VARCHAR(5))
    admission_date = Column(Date)

    father_name = Column(VARCHAR(100))
    mother_name = Column(VARCHAR(100))
    parent_phone = Column(VARCHAR(15))

    address = Column(VARCHAR(255))
    city = Column(VARCHAR(50))
    state = Column(VARCHAR(50))
    pincode = Column(VARCHAR(10))
    nationality = Column(VARCHAR(30))

    attendance = Column(VARCHAR(10))
    status = Column(
        Enum("active", "inactive", name="student_status"),
        default="active",
    )
