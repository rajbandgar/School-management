from sqlalchemy.orm import Session
from app.models.assignments import Assignment
from app.schemas.assignments import AssignmentCreate


def get_assignments(db: Session):
    return db.query(Assignment).order_by(Assignment.assigned_date.desc()).all()


def create_assignment(
    data: AssignmentCreate,
    teacher_id,
    db: Session,
):
    assignment = Assignment(
        **data.model_dump(),
        teacher_id=teacher_id,
    )

    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


def delete_assignment(assignment_id, db: Session):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id).first()
    if assignment:
        db.delete(assignment)
        db.commit()
    return assignment
