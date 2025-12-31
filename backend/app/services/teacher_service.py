from sqlalchemy.orm import Session
from sqlalchemy import select, func
from typing import List, Optional, Tuple
from uuid import UUID

from app.models.teachers import Teacher
from app.models.user import User
from app.schemas.teachers import TeacherCreate, TeacherUpdate


# =========================
# CREATE TEACHER (FIXED)
# =========================
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.user import User
from app.models.teachers import Teacher
from app.schemas.teachers import TeacherCreate


def create_teacher(
    teacher_data: TeacherCreate,
    
    db: Session
) -> Teacher:
    """
    Create Teacher.
    - Reuse User if phone already exists
    - Otherwise create new User
    """

    # 1️⃣ Check if user already exists by phone
    user = db.execute(
        select(User).where(User.phone == teacher_data.phone)
    ).scalar_one_or_none()

    # 2️⃣ Create user if not exists
    if not user:
        user = User(
            phone=teacher_data.phone,
            role="TEACHER",
            
            status="active",
           
        )
        db.add(user)
        db.flush() 

        teacher = Teacher(
        user_id=user.id,
        first_name=teacher_data.first_name,
        last_name=teacher_data.last_name,
        email=teacher_data.email,
        phone=teacher_data.phone,
        address=teacher_data.address,
        subject_specialization=teacher_data.subject_specialization,
        years_of_experience=teacher_data.years_of_experience,
        salary=teacher_data.salary,
        Emergency_contact=teacher_data.Emergency_contact,
        Qualification=teacher_data.Qualification,
        City=teacher_data.City,
        State=teacher_data.State,
        DOB=teacher_data.DOB,
        Joining_date=teacher_data.Joining_date,
        Blood_group=teacher_data.Blood_group,
        Employment=teacher_data.Employment,
        ClassIncharge=teacher_data.ClassIncharge,
        status="active"
    )
        db.add(teacher)
        db.commit()
        db.refresh(teacher)

        print(teacher_data.model_dump())

# generates user.id

    # 3️⃣ Check if teacher already exists for this user
    existing_teacher = db.execute(
        select(Teacher).where(Teacher.user_id == user.id)
    ).scalar_one_or_none()

    if existing_teacher:
        return existing_teacher  # or raise 409 if you prefer

    # 4️⃣ Create teacher profile
    

    db.add(teacher)
    db.commit()
    db.refresh(teacher)

    return teacher


# =========================
# GET TEACHER BY ID
# =========================
def get_teacher(
    teacher_id: UUID,
    db: Session
) -> Optional[Teacher]:
    result = db.execute(
        select(Teacher).where(
            Teacher.id == teacher_id,
            Teacher.status != "soft_deleted"
        )
    )
    return result.scalar_one_or_none()


# =========================
# GET ALL TEACHERS
# =========================
def get_all_teachers(
    school_id: Optional[UUID],
    skip: int,
    limit: int,
    db: Session
) -> Tuple[List[Teacher], int]:

    query = select(Teacher).where(Teacher.status != "soft_deleted")

    if school_id:
        query = query.where(Teacher.school_id == school_id)

    count_query = select(func.count(Teacher.id)).where(
        Teacher.status != "soft_deleted"
    )
    if school_id:
        count_query = count_query.where(Teacher.school_id == school_id)

    total = db.execute(count_query).scalar()

    result = db.execute(
        query.offset(skip)
        .limit(limit)
        .order_by(Teacher.created_at.desc())
    )
    teachers = result.scalars().all()

    return teachers, total


# =========================
# UPDATE TEACHER
# =========================
def update_teacher(
    teacher_id: UUID,
    teacher_data: TeacherUpdate,
    current_user: User,
    db: Session
) -> Optional[Teacher]:

    teacher = get_teacher(teacher_id, db)
    if not teacher:
        return None

    update_data = teacher_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(teacher, field, value)

    teacher.updated_by = current_user.id
    db.commit()
    db.refresh(teacher)
    return teacher


# =========================
# DELETE TEACHER (SOFT)
# =========================
def delete_teacher(
    teacher_id: UUID,
    current_user: User,
    db: Session
) -> bool:

    teacher = get_teacher(teacher_id, db)
    if not teacher:
        return False

    teacher.status = "soft_deleted"
    teacher.updated_by = current_user.id
    db.commit()
    return True
