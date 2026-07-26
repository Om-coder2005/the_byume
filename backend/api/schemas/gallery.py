from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from api.schemas.media import MediaFile

class TagBase(BaseModel):
    name: str
    slug: str

class Tag(TagBase):
    id: int

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    name: str
    slug: str
    icon: Optional[str] = None
    parent_id: Optional[int] = None

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class GalleryImageBase(BaseModel):
    sort_order: int = 0

class GalleryImage(GalleryImageBase):
    id: int
    media: MediaFile

    class Config:
        from_attributes = True

class GalleryBase(BaseModel):
    title: str
    description: Optional[str] = None
    difficulty: Optional[str] = None
    estimated_days: Optional[int] = None
    price_from: Optional[float] = None
    price_to: Optional[float] = None
    featured: bool = False
    slug: str

class GalleryCreate(GalleryBase):
    category_id: Optional[int] = None
    tag_ids: List[int] = []
    media_ids: List[int] = []

class Gallery(GalleryBase):
    id: int
    category: Optional[Category] = None
    tags: List[Tag] = []
    images: List[GalleryImage] = []
    created_at: datetime

    class Config:
        from_attributes = True
