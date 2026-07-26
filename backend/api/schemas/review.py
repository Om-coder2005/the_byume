from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from api.schemas.user import User
from api.schemas.order import Order

class ReviewBase(BaseModel):
    rating: int
    story: str
    occasion: Optional[str] = None
    is_public: bool = True
    is_anonymous: bool = False

class ReviewCreate(ReviewBase):
    order_id: int

class ReviewUpdate(BaseModel):
    is_featured: Optional[bool] = None
    is_public: Optional[bool] = None

class Review(ReviewBase):
    id: int
    order_id: int
    customer_id: int
    is_featured: bool
    created_at: datetime
    updated_at: datetime
    
    # We can include customer and order for display on frontend
    customer: Optional[User] = None
    order: Optional[Order] = None

    class Config:
        from_attributes = True
