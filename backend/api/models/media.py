from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from api.core.database import Base

class MediaFile(Base):
    __tablename__ = "media_files"

    id = Column(Integer, primary_key=True, index=True)
    cloudinary_public_id = Column(String, unique=True, index=True, nullable=False)
    url = Column(String, nullable=False)
    width = Column(Integer)
    height = Column(Integer)
    mime = Column(String)
    size = Column(Integer)
    checksum = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
