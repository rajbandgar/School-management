from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from uuid import UUID
from sqlalchemy import select


from app.core.database import get_db
from app.core.dependency import require_roles, Role
from app.models.user import User


from app.schemas.principal import PrincipalCreate, PrincipalUpdate, PrincipalResponse


from app.services.principal_service import (
    create_principal, get_principal, get_all_principals, update_principal, delete_principal
)
from app.models.principal import Principal

router = APIRouter(prefix="/admin", tags=["Admin"])

admin_only = require_roles([Role.ADMIN])








@router.post("/principals", response_model=PrincipalResponse, status_code=status.HTTP_201_CREATED)
def create_principal_endpoint(
    principal_data: PrincipalCreate,
    
    db: Session = Depends(get_db)
):
    return create_principal(principal_data, db)


@router.get("/principals", response_model=dict)
def get_all_principals_endpoint(
    
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    
    db: Session = Depends(get_db)
):
    principals, total = get_all_principals(
         skip=skip, limit=limit, db=db
    )
    return {
        "items": [PrincipalResponse.model_validate(p) for p in principals],
        "total": total,
        "skip": skip,
        "limit": limit
    }


@router.get("/principals/{principal_id}", response_model=PrincipalResponse)
def get_principal_endpoint(
    principal_id: UUID,
    
    db: Session = Depends(get_db)
):
    principal = get_principal(principal_id, db)
    if not principal:
        raise HTTPException(status_code=404, detail="Principal not found")
    return principal


@router.put("/principals/{principal_id}", response_model=PrincipalResponse)
def update_principal_route(
    principal_id: str,
    principal_data: PrincipalUpdate,
    db: Session = Depends(get_db)
):

    # Fetch the existing principal (even if soft-deleted)
    result = db.execute(select(Principal).where(Principal.id == principal_id))
    principal = result.scalar_one_or_none()

    if not principal:
        raise HTTPException(status_code=404, detail="Principal not found")

    # Partial update (only update fields provided)
    update_data = principal_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(principal, key, value)

    db.commit()
    db.refresh(principal)

    return principal


@router.delete("/principals/{principal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_principal_route(principal_id: str, db: Session = Depends(get_db)):

    result = db.execute(select(Principal).where(Principal.id == principal_id))
    principal = result.scalar_one_or_none()

    if not principal:
        raise HTTPException(status_code=404, detail="Principal not found")

    db.delete(principal)
    db.commit()

    return {"message": "Principal deleted successfully"}
