from pydantic import BaseModel
from datetime import datetime
from api.schemas.gallery import Gallery

class WishlistBase(BaseModel):
    gallery_id: int

class WishlistCreate(WishlistBase):
    pass

class Wishlist(WishlistBase):
    id: int
    customer_id: int
    created_at: datetime
    gallery_item: Gallery

    class Config:
        from_attributes = True
