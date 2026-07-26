from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health_check():
    from api.core.config import settings
    return {
        "status": "ok", 
        "message": "Byume backend is running properly", 
        "debug_origins": settings.BACKEND_CORS_ORIGINS
    }
