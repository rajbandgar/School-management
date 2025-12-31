from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.core.dependency import require_roles, Role
from app.models.user import User


from app.schemas.principal import PrincipalCreate, PrincipalUpdate, PrincipalResponse


from app.services.principal_service import (
    create_principal, get_principal, get_all_principals, update_principal, delete_principal
)

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
def update_principal_endpoint(
    principal_id: UUID,
    principal_data: PrincipalUpdate,
    current_user: User = Depends(admin_only),
    db: Session = Depends(get_db)
):
    principal = update_principal(principal_id, principal_data, current_user, db)
    if not principal:
        raise HTTPException(status_code=404, detail="Principal not found")
    return principal


@router.delete("/principals/{principal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_principal_endpoint(
    principal_id: UUID,
    current_user: User = Depends(admin_only),
    db: Session = Depends(get_db)
):
    success = delete_principal(principal_id, current_user, db)
    if not success:
        raise HTTPException(status_code=404, detail="Principal not found")
