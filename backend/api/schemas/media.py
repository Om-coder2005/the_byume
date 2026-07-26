from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MediaFileBase(BaseModel):
    cloudinary_public_id: str
    url: str
    width: Optional[int] = None
    height: Optional[int] = None
    mime: Optional[str] = None
    size: Optional[int] = None
    checksum: Optional[str] = None

class MediaFileCreate(MediaFileBase):
    pass

class MediaFile(MediaFileBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
