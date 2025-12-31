from sqlalchemy import Column, String, DateTime
from app.core.database import Base
from datetime import datetime
import uuid

class BaseModel(Base):
    __abstract__ = True

    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4())
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    created_by = Column(
        String(36),
        nullable=True
    )

    updated_at = Column(
        DateTime,
        onupdate=datetime.utcnow,
        nullable=True
    )

    updated_by = Column(
        String(36),
        nullable=True
    )

    status = Column(
        String(20),
        default="active",
        nullable=False
    )
