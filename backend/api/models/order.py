from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from api.core.database import Base

class OrderStatus(Base):
    __tablename__ = "order_status"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    color = Column(String)
    sequence = Column(Integer)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, unique=True, index=True, nullable=False)
    order_number = Column(String, unique=True, index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey('users.id'))
    status_id = Column(Integer, ForeignKey('order_status.id'))
    estimated_price = Column(Float)
    final_price = Column(Float)
    budget = Column(String)
    deadline = Column(DateTime)
    gift_message = Column(String)
    priority = Column(String)
    notes = Column(String)
    
    accepted_at = Column(DateTime)
    completed_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer = relationship("User")
    status = relationship("OrderStatus")
    timeline = relationship("OrderTimeline", back_populates="order", cascade="all, delete-orphan")
    revisions = relationship("OrderRevision", back_populates="order", cascade="all, delete-orphan")
    reference_images = relationship("ReferenceImage", back_populates="order", cascade="all, delete-orphan")

class OrderTimeline(Base):
    __tablename__ = "order_timeline"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    status_id = Column(Integer, ForeignKey('order_status.id'))
    message = Column(String)
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="timeline")
    status = relationship("OrderStatus")
    creator = relationship("User")

class OrderRevision(Base):
    __tablename__ = "order_revisions"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    version = Column(Integer)
    changed_by = Column(Integer, ForeignKey('users.id'))
    changes = Column(String)  # Store JSON representation of changes
    created_at = Column(DateTime, default=datetime.utcnow)

    order = relationship("Order", back_populates="revisions")
    changer = relationship("User")

class ReferenceImage(Base):
    __tablename__ = "reference_images"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey('orders.id'))
    media_id = Column(Integer, ForeignKey('media_files.id'))
    caption = Column(String)
    priority = Column(Integer, default=0)
    uploaded_by = Column(Integer, ForeignKey('users.id'))

    order = relationship("Order", back_populates="reference_images")
    media = relationship("MediaFile")
    uploader = relationship("User")
