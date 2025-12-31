from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from requests import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
from enum import Enum
from typing import List

from app.core.database import get_db
from app.core.security import verify_token
from app.models.user import User

security = HTTPBearer()


class Role(str, Enum):
    ADMIN = "ADMIN"
    PRINCIPAL = "PRINCIPAL"
    TEACHER = "TEACHER"
    PARENT = "PARENT"


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    payload = verify_token(token, "access")

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_id = payload.get("user_id")

    result = db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()

    if not user or user.status != "active":
        raise HTTPException(status_code=401, detail="User not found")

    return user





def require_roles(allowed_roles: List[Role]):
    """Dependency factory for role-based access control"""
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in [role.value for role in allowed_roles]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker






