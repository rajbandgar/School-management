from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.classrooms import Classroom
from app.schemas.classrooms import ClassroomCreate

def get_all_classrooms(db: Session):
    result = db.execute(select(Classroom))
    return result.scalars().all()

def create_classroom(db: Session, payload: ClassroomCreate):
    classroom = Classroom(**payload.model_dump())
    db.add(classroom)
    db.commit()
    db.refresh(classroom)
    return classroom
