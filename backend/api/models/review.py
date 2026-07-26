from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from api.core.database import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'), unique=True)
    customer_id = Column(Integer, ForeignKey('users.id'))
    rating = Column(Integer, nullable=False)
    story = Column(Text, nullable=False)
    occasion = Column(String)
    
    is_public = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    is_anonymous = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    order = relationship("Order")
    customer = relationship("User")
