from pydantic import BaseModel
from typing import Optional
from datetime import date


class LabBase(BaseModel):
    lab_name: str
    lab_code: str
    subject: Optional[str] = None

    floor: Optional[str] = None
    building: Optional[str] = None

    capacity: Optional[int] = None

    incharge: Optional[str] = None
    assistant: Optional[str] = None

    equipment_count: Optional[int] = None
    computers: Optional[int] = None

    internet: Optional[str] = None
    safety_equipment: Optional[str] = None
    fire_extinguisher: Optional[str] = None
    ventilation: Optional[str] = None
    power_backup: Optional[str] = None

    last_audit: Optional[date] = None
    next_audit: Optional[date] = None

    utilization: Optional[str] = None
    maintenance_cost: Optional[str] = None
    cleanliness: Optional[str] = None
    remarks: Optional[str] = None

    status: Optional[str] = "active"


class LabCreate(LabBase):
    pass


class LabResponse(LabBase):
    id: str

    class Config:
        from_attributes = True
