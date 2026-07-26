from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from api.core.database import Base

# Many-to-Many association table for Gallery and Tags
gallery_tags = Table(
    'gallery_tags', Base.metadata,
    Column('gallery_id', Integer, ForeignKey('gallery.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    icon = Column(String)
    parent_id = Column(Integer, ForeignKey('categories.id'), nullable=True)

    galleries = relationship("Gallery", back_populates="category")

class Tag(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)

    galleries = relationship("Gallery", secondary=gallery_tags, back_populates="tags")

class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    category_id = Column(Integer, ForeignKey('categories.id'))
    difficulty = Column(String)
    estimated_days = Column(Integer)
    price_from = Column(Float)
    price_to = Column(Float)
    featured = Column(Boolean, default=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    category = relationship("Category", back_populates="galleries")
    tags = relationship("Tag", secondary=gallery_tags, back_populates="galleries")
    images = relationship("GalleryImage", back_populates="gallery", cascade="all, delete-orphan")

class GalleryImage(Base):
    __tablename__ = "gallery_images"

    id = Column(Integer, primary_key=True, index=True)
    gallery_id = Column(Integer, ForeignKey('gallery.id'))
    media_id = Column(Integer, ForeignKey('media_files.id'))
    sort_order = Column(Integer, default=0)

    gallery = relationship("Gallery", back_populates="images")
    media = relationship("MediaFile")
