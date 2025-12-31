from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.core.database import engine, Base
from app.routers import auth, admin, principal,teachers
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="School Management System API",
    description="Production-ready School Management System with OTP-based authentication",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(principal.router)
app.include_router(teachers.router)
#app.include_router(parent.router)


# Global exception handler
@app.exception_handler(Exception)
def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error"}
    )


@app.exception_handler(RequestValidationError)
def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Validation error handler"""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()}
    )


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT
    }


# Startup event
@app.on_event("startup")
def startup_event():
    """Initialize database on startup"""
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as exc:
        logger.exception("Failed to initialize database on startup: %s", exc)
        raise


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    from app.core.redis_client import RedisClient
    await RedisClient.close()






