from fastapi import APIRouter,HTTPException,status,Query,Depends
from sqlalchemy.orm import Session
from uuid import UUID


from app.core.database import get_db
from app.core.dependency import require_roles, Role
from app.models.user import User
from app.schemas.teachers import TeacherCreate,TeacherResponse,TeacherUpdate
from app.schemas.labs import LabCreate, LabResponse
from app.services.lab_service import create_lab, get_all_labs
from app.services.classroom_service import (
    get_all_classrooms,
    create_classroom
)
from app.schemas.classrooms import ClassroomCreate, ClassroomResponse
from app.services.teacher_service import (
    create_teacher, get_teacher, get_all_teachers, update_teacher, delete_teacher
)

router = APIRouter(prefix="/principal", tags=["Teacher"])
@router.post("/teachers",response_model = TeacherResponse,status_code=status.HTTP_201_CREATED )
def create_teacher_endpoint(
    teacher_data:TeacherCreate,
    db: Session = Depends(get_db)
):
    return create_teacher(teacher_data,db)

@router.get("/teachers", response_model=dict)
def get_all_principals_endpoint(
    
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    
    db: Session = Depends(get_db)
):
    teachers, total = get_all_teachers(
         skip=skip, limit=limit, db=db
    )
    return {
        "items": [TeacherResponse.model_validate(p) for p in teachers],
        "total": total,
        "skip": skip,
        "limit": limit
    }

@router.get("/classrooms", response_model=list[ClassroomResponse])
def list_classrooms(
    db: Session = Depends(get_db),
    
):
    return get_all_classrooms(db)

@router.post("/classrooms", response_model=ClassroomResponse)
def add_classroom(
    payload: ClassroomCreate,
    db: Session = Depends(get_db),
    
):
    return create_classroom(db, payload)


@router.get("/labs", response_model=list[LabResponse])
def list_labs(db: Session = Depends(get_db)):
    return get_all_labs(db)


@router.post("/labs", response_model=LabResponse)
def add_lab(
    payload: LabCreate,
    db: Session = Depends(get_db),
):
    return create_lab(db, payload)












