import cloudinary
import cloudinary.uploader
import cloudinary.api
from api.core.config import settings
from fastapi import UploadFile

# Configure Cloudinary if URL is provided
if settings.CLOUDINARY_URL:
    cloudinary.config(
        # The SDK automatically picks up CLOUDINARY_URL from env if set,
        # but we can also explicitly configure it if needed.
    )

async def upload_image(file: UploadFile, folder: str = "byume") -> str:
    """
    Uploads an image to Cloudinary and returns the secure URL.
    If Cloudinary is not configured, saves locally or returns a mock URL.
    """
    if not settings.CLOUDINARY_URL:
        # Fallback for local development without Cloudinary
        print(f"⚠️ [MOCK UPLOAD] Would upload {file.filename} to {folder}")
        return f"https://via.placeholder.com/600?text={file.filename}"
        
    try:
        # Cloudinary uploader.upload expects a file-like object or bytes
        result = cloudinary.uploader.upload(
            file.file,
            folder=folder,
            resource_type="image"
        )
        return result.get("secure_url")
    except Exception as e:
        print(f"❌ Failed to upload image to Cloudinary: {str(e)}")
        raise e
