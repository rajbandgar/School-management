




from sqlalchemy.orm import Session
from app.models.student import Student
from app.schemas.student import StudentCreate

def get_students(db: Session):
    return db.query(Student).all()

def create_student(data: StudentCreate, db: Session):
    student = Student(**data.model_dump())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student

def delete_student(student_id: str, db: Session):
    student = db.query(Student).filter(Student.id == student_id).first()
    if student:
        db.delete(student)
        db.commit()
    return student
