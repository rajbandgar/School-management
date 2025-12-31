from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.labs import Lab
from app.schemas.labs import LabCreate


def create_lab(db: Session, payload: LabCreate) -> Lab:
    lab = Lab(**payload.model_dump())
    db.add(lab)
    db.commit()
    db.refresh(lab)
    return lab


def get_all_labs(db: Session):
    return db.execute(select(Lab)).scalars().all()
