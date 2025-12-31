import uuid
from sqlalchemy import Column, String, Integer, Date
from sqlalchemy.dialects.mysql import CHAR
from app.core.database import Base


class Lab(Base):
    __tablename__ = "labs"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))

    lab_name = Column(String(100), nullable=False)
    lab_code = Column(String(50), nullable=False)
    subject = Column(String(50))

    floor = Column(String(50))
    building = Column(String(100))

    capacity = Column(Integer)

    incharge = Column(String(100))
    assistant = Column(String(100))

    equipment_count = Column(Integer)
    computers = Column(Integer)

    internet = Column(String(10))
    safety_equipment = Column(String(50))
    fire_extinguisher = Column(String(10))
    ventilation = Column(String(50))
    power_backup = Column(String(10))

    last_audit = Column(Date)
    next_audit = Column(Date)

    utilization = Column(String(20))
    maintenance_cost = Column(String(50))
    cleanliness = Column(String(50))
    remarks = Column(String(255))

    status = Column(String(20), default="active")
