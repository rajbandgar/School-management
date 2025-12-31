from sqlalchemy.orm import Session
from sqlalchemy import select, func
from typing import List, Optional
from uuid import UUID

from app.models.principal import Principal
from app.models.user import User
from app.schemas.principal import PrincipalCreate, PrincipalUpdate


# =========================
# CREATE PRINCIPAL (FIXED)
# =========================
def create_principal(
    principal_data: PrincipalCreate,
    
    db: Session
) -> Principal:
    """
    Create a Principal.
    Automatically creates a User with role=PRINCIPAL.
    """

    # 1️⃣ Create USER first
    user = User(
        phone=principal_data.phone,
        role="PRINCIPAL",
        
        status="active",
        created_by=None  # System user
    )
    db.add(user)
    db.flush()  # 🔥 generates user.id without commit

    # 2️⃣ Create PRINCIPAL linked to user
    principal = Principal(
        user_id=user.id,
        
        first_name=principal_data.first_name,
        last_name=principal_data.last_name,
        email=principal_data.email,
        
        qualification=principal_data.qualification,
        experience_years=principal_data.experience_years,
        
        
    )

    db.add(principal)
    db.commit()
    db.refresh(principal)

    return principal


# =========================
# GET PRINCIPAL BY ID
# =========================
def get_principal(
    principal_id: UUID,
    db: Session
) -> Optional[Principal]:
    result = db.execute(
        select(Principal).where(
            Principal.id == principal_id,
            Principal.status != "soft_deleted"
        )
    )
    return result.scalar_one_or_none()


# =========================
# GET ALL PRINCIPALS
# =========================
def get_all_principals(
    school_id: Optional[UUID] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = None
) -> tuple[List[Principal], int]:

    query = select(Principal).where(Principal.status != "soft_deleted")

    if school_id:
        query = query.where(Principal.school_id == school_id)

    count_query = select(func.count(Principal.id)).where(
        Principal.status != "soft_deleted"
    )
    if school_id:
        count_query = count_query.where(Principal.school_id == school_id)

    total = db.execute(count_query).scalar()

    result = db.execute(
        query.offset(skip)
        .limit(limit)
        .order_by(Principal.created_at.desc())
    )
    principals = result.scalars().all()

    return principals, total


# =========================
# UPDATE PRINCIPAL
# =========================
def update_principal(
    principal_id: UUID,
    principal_data: PrincipalUpdate,
    current_user: User,
    db: Session
) -> Optional[Principal]:

    principal = get_principal(principal_id, db)
    if not principal:
        return None

    update_data = principal_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(principal, field, value)

    principal.updated_by = current_user.id
    db.commit()
    db.refresh(principal)
    return principal


# =========================
# DELETE PRINCIPAL (SOFT)
# =========================
def delete_principal(
    principal_id: UUID,
    current_user: User,
    db: Session
) -> bool:

    principal = get_principal(principal_id, db)
    if not principal:
        return False

    principal.status = "soft_deleted"
    principal.updated_by = current_user.id
    db.commit()
    return True
