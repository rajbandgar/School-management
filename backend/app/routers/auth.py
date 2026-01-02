from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import OTPRequest, OTPVerify, Token
from app.services.auth_service import send_otp, verify_otp, is_token_blacklisted
from app.core.security import verify_token
from app.core.dependency import get_current_user
from app.models.user import User
from app.core.redis_client import get_redis

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/otp/send", status_code=status.HTTP_200_OK)
async def request_otp(otp_request: OTPRequest, db: Session = Depends(get_db)):
    """Send OTP to phone number"""
    return  await send_otp(otp_request.phone, db)


@router.post("/otp/verify", response_model=Token, status_code=status.HTTP_200_OK)
async def verify_otp_endpoint(otp_verify: OTPVerify, db: Session = Depends(get_db),redis = Depends(get_redis)):
    """Verify OTP and get JWT tokens"""
    return await verify_otp(
        otp_verify.phone,
        otp_verify.otp,
        db,
        redis,  
    )





@router.get("/me", status_code=status.HTTP_200_OK)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return {
        "id": str(current_user.id),
        "phone": current_user.phone,
        "role": current_user.role,
        
    }


from app.services.firebase_service import verify_firebase_token
from app.core.security import create_access_token

from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/firebase-login")
def firebase_login(
    payload: dict,
    db: Session = Depends(get_db)   
):
    firebase_token = payload.get("firebase_token")
    if not firebase_token:
        raise HTTPException(400, "Firebase token required")

    decoded = verify_firebase_token(firebase_token)
    phone = decoded.get("phone_number")

    if not phone:
        raise HTTPException(401, "Invalid Firebase token")

    user = db.query(User).filter(User.phone == phone).first()
    if not user:
            
        user = User(
            phone=phone,
            role="ADMIN",   # or default role
            status="active"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token({
        "user_id": str(user.id),
        "role": user.role,
        
    })

    return {
        "access_token": access_token,
        "role": user.role,
        "userId":user.id
    }

@router.get("/me", status_code=status.HTTP_200_OK)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return {
        "id": str(current_user.id),
        
        "role": current_user.role,
        
    }