from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.student import StudentCreate, StudentResponse
from app.services.student_service import (
    get_students,
    create_student,
    delete_student,
)
from app.schemas.assignments import AssignmentCreate, AssignmentOut
from app.services.assignment_service import (
    get_assignments,
    create_assignment,
    delete_assignment,
)
from uuid import UUID

router = APIRouter(prefix="/teacher", tags=["Teacher"])

@router.get("/students", response_model=list[StudentResponse])
def list_students(db: Session = Depends(get_db)):
    return get_students(db)

@router.post("/students", response_model=StudentResponse)
def add_student(payload: StudentCreate, db: Session = Depends(get_db)):
    return create_student(payload, db)

@router.delete("/students/{student_id}")
def remove_student(student_id: str, db: Session = Depends(get_db)):
    student = delete_student(student_id, db)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted"}

@router.get("/assignments", response_model=list[AssignmentOut])
def list_assignments(db: Session = Depends(get_db)):
    return get_assignments(db)


@router.post("/assignments", response_model=AssignmentOut)
def add_assignment(
    data: AssignmentCreate,
    db: Session = Depends(get_db),
):
   
    teacher_id = "00000000-0000-0000-0000-000000000001"
    return create_assignment(data, teacher_id, db)


@router.delete("/assignments/{assignment_id}")
def remove_assignment(
    assignment_id: UUID,
    db: Session = Depends(get_db),
):
    assignment = delete_assignment(assignment_id, db)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return {"message": "Assignment deleted successfully"}