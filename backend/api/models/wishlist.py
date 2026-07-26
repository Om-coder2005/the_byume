from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from api.core.database import Base

class Wishlist(Base):
    __tablename__ = "wishlist"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.id"))
    gallery_id = Column(Integer, ForeignKey("gallery.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    customer = relationship("User")
    gallery_item = relationship("Gallery")
