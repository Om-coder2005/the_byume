from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.core import deps
from api.models.gallery import Gallery, Category, Tag
from api.schemas.gallery import Gallery as GallerySchema, GalleryCreate

router = APIRouter()

@router.get("/", response_model=List[GallerySchema])
def read_galleries(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve galleries (products).
    """
    galleries = db.query(Gallery).offset(skip).limit(limit).all()
    return galleries

# Define categories schema inline since it's simple
from pydantic import BaseModel
class CategorySchema(BaseModel):
    id: int
    name: str
    slug: str
    class Config:
        from_attributes = True

@router.get("/categories", response_model=List[CategorySchema])
def read_categories(
    db: Session = Depends(deps.get_db)
) -> Any:
    """
    Retrieve all categories.
    """
    return db.query(Category).all()

@router.get("/{id}/recommendations", response_model=List[GallerySchema])
def read_gallery_recommendations(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    """
    Get recommendations based on a specific gallery item.
    For this MVP, we return items in the same category or difficulty, excluding the item itself.
    """
    gallery = db.query(Gallery).filter(Gallery.id == id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")
        
    recommendations = db.query(Gallery).filter(
        Gallery.id != id,
        (Gallery.category_id == gallery.category_id) | (Gallery.difficulty == gallery.difficulty)
    ).limit(3).all()
    
    # If not enough recommendations, just grab some random ones
    if len(recommendations) < 3:
        more = db.query(Gallery).filter(Gallery.id != id).limit(3 - len(recommendations)).all()
        recommendations.extend(more)
        
    return recommendations

@router.get("/{id}", response_model=GallerySchema)
def read_gallery(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    """
    Get gallery by ID.
    """
    gallery = db.query(Gallery).filter(Gallery.id == id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")
    return gallery

from api.models.user import User

@router.post("/", response_model=GallerySchema)
def create_gallery(
    *,
    db: Session = Depends(deps.get_db),
    gallery_in: GalleryCreate,
    current_user: User = Depends(deps.get_current_active_admin) 
) -> Any:
    """
    Create new gallery (product). Admin only.
    """
    gallery = Gallery(
        title=gallery_in.title,
        description=gallery_in.description,
        difficulty=gallery_in.difficulty,
        estimated_days=gallery_in.estimated_days,
        price_from=gallery_in.price_from,
        price_to=gallery_in.price_to,
        featured=gallery_in.featured,
        slug=gallery_in.slug,
        category_id=gallery_in.category_id
    )
    db.add(gallery)
    db.commit()
    db.refresh(gallery)
    return gallery

@router.delete("/{id}")
def delete_gallery(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_admin)
) -> Any:
    """
    Delete a gallery item.
    """
    gallery = db.query(Gallery).filter(Gallery.id == id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery not found")
    db.delete(gallery)
    db.commit()
    return {"status": "deleted"}
