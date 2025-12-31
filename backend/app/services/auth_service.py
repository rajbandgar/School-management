from app.schemas.auth import Token

from sqlalchemy.orm import Session
from sqlalchemy import select,func
from fastapi import HTTPException, status
from app.models.user import User
from app.core.security import create_access_token, generate_otp
from app.core.redis_client import get_redis
from app.core.config import settings
import phonenumbers
from phonenumbers import NumberParseException


def normalize_phone(phone: str) -> str:
    try:
        phone = str(phone)
        parsed = phonenumbers.parse(phone, "IN")
        if not phonenumbers.is_valid_number(parsed):
            raise ValueError
        return phonenumbers.format_number(
            parsed, phonenumbers.PhoneNumberFormat.E164
        )
    except (NumberParseException, ValueError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number format"
        )


async def send_otp(phone: str, db: Session) -> dict:
    formatted_phone = normalize_phone(phone)

    # ✅ SYNC DB call (no await)
    result = db.execute(select(User).where(User.phone == formatted_phone))
    user = result.scalar_one_or_none()

    

    if not user:
        # Check if this is the first user
        user_count = db.execute(
            select(func.count(User.id))
        ).scalar()

        role = "ADMIN" if user_count == 0 else "PARENT"

        user = User(
            phone=formatted_phone,
            role=role,
            status="active",
            created_by=None if role == "ADMIN" else "system"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    if user.status != "active":
        raise HTTPException(status_code=403, detail="User inactive")

    otp = generate_otp()

    # ✅ ASYNC Redis (await everything)
    redis = await get_redis()
    await redis.setex(
        f"otp:{formatted_phone}",
        settings.OTP_EXPIRE_MINUTES * 60,
        otp
    )

    response = {"message": "OTP sent successfully"}
    if settings.ENVIRONMENT == "development":
        response["otp"] = otp

    return response



async def verify_otp(phone: str, otp: str, db: Session, redis) -> Token: # type: ignore
    formatted_phone = normalize_phone(phone)

    stored_otp = await redis.get(f"otp:{formatted_phone}")

    if not stored_otp or stored_otp != otp:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP"
        )

    await redis.delete(f"otp:{formatted_phone}")

    result = db.execute(
        select(User).where(User.phone == formatted_phone)
    )
    user = result.scalar_one_or_none()

    if not user or user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )

    token_data = {
        "user_id": str(user.id),
        "role": user.role,
        
    }

    access_token = create_access_token(token_data)
    
    
    return Token(
        access_token=access_token,
       
        token_type="bearer"
    )

# async def verify_otp(phone: str, otp: str, db: Session, redis) ->Token:
#     phone = normalize_phone(phone)

#     # 1️ Verify OTP
#     stored_otp = await redis.get(f"otp:{phone}")
    
#     if not stored_otp or stored_otp != otp:
#         raise HTTPException(status_code=400, detail="Invalid or expired OTP")

#     # 2️ Get or create user
#     user = db.execute(
#         select(User).where(User.phone == phone)
#     ).scalar_one_or_none()

#     if not user:
#         is_first_user = db.execute(select(User)).first() is None

#         user = User(
#             phone=phone,
#             role="ADMIN" if is_first_user else "PARENT",
#             status="active",
#         )
#         db.add(user)
#         db.commit()
#         db.refresh(user)

#     # 3️ Create token
#     access_token = create_access_token({
#         "user_id": str(user.id),
#         "role": user.role,
#         "type": "access"
#     })

#     # 4️ Return EVERYTHING
#     return {
#         "access_token": access_token,
#         "user": {
#             "id": str(user.id),
#             "phone": user.phone,
#             "role": user.role,
            
#         }
#     }








async def is_token_blacklisted(token: str) -> bool:
    redis = await get_redis()
    return await redis.get(f"blacklist:{token}") is not None
