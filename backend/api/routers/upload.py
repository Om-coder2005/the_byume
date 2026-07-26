from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, BackgroundTasks, Request
from typing import Any

from api.core import deps
from api.core.upload import upload_image
from api.models.user import User

from api.core.limiter import limiter
from api.worker.tasks import evaluate_image_variations

router = APIRouter()

@router.post("/")
@limiter.limit("20/hour")
async def upload_file(
    request: Request,
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    folder: str = "byume/general",
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Upload a file to Cloudinary.
    Requires an authenticated user. 
    """
    # Size Validation (Check first 5MB)
    MAX_FILE_SIZE = 5 * 1024 * 1024 # 5 MB
    
    # We can check size by seeking if it's spooled to disk, or by reading chunk
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large. Maximum size is 5MB.")

    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG, PNG, and WebP are allowed.")
        
    try:
        url = await upload_image(file, folder=folder)
        
        # Enqueue Background Task (Optimization & Malware Check)
        background_tasks.add_task(evaluate_image_variations, file.filename, url)
        
        return {"url": url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")
