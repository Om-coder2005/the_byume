from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from api.schemas.user import User
from api.schemas.media import MediaFile

class OrderStatusBase(BaseModel):
    name: str
    color: Optional[str] = None
    sequence: Optional[int] = None

class OrderStatus(OrderStatusBase):
    id: int

    class Config:
        from_attributes = True

class ReferenceImageBase(BaseModel):
    caption: Optional[str] = None
    priority: int = 0

class ReferenceImage(ReferenceImageBase):
    id: int
    media: MediaFile

    class Config:
        from_attributes = True

class OrderTimelineBase(BaseModel):
    message: Optional[str] = None

class OrderTimeline(OrderTimelineBase):
    id: int
    status: OrderStatus
    created_by: int
    created_at: datetime

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    budget: Optional[str] = None
    deadline: Optional[datetime] = None
    gift_message: Optional[str] = None
    priority: Optional[str] = None
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    reference_media_ids: List[int] = []

class Order(OrderBase):
    id: int
    uuid: str
    order_number: str
    customer_id: int
    status: OrderStatus
    estimated_price: Optional[float] = None
    final_price: Optional[float] = None
    accepted_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    reference_images: List[ReferenceImage] = []
    timeline: List[OrderTimeline] = []

    class Config:
        from_attributes = True
