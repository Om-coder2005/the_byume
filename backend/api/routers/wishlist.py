from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.core import deps
from api.models.wishlist import Wishlist
from api.models.user import User
from api.models.gallery import Gallery
from api.schemas.wishlist import Wishlist as WishlistSchema

router = APIRouter()

@router.get("/", response_model=List[WishlistSchema])
def read_wishlist(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Retrieve wishlist items for current user.
    """
    items = db.query(Wishlist).filter(
        Wishlist.customer_id == current_user.id
    ).order_by(Wishlist.created_at.desc()).offset(skip).limit(limit).all()
    
    return items

@router.post("/{gallery_id}")
def toggle_wishlist_item(
    *,
    db: Session = Depends(deps.get_db),
    gallery_id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Toggle a gallery item in the wishlist. Returns {"status": "added"} or {"status": "removed"}
    """
    # Check if gallery item exists
    gallery = db.query(Gallery).filter(Gallery.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Gallery item not found")

    # Check if already in wishlist
    existing = db.query(Wishlist).filter(
        Wishlist.customer_id == current_user.id,
        Wishlist.gallery_id == gallery_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"status": "removed"}
    else:
        new_item = Wishlist(
            customer_id=current_user.id,
            gallery_id=gallery_id
        )
        db.add(new_item)
        db.commit()
        return {"status": "added"}

@router.get("/{gallery_id}/check")
def check_wishlist_item(
    *,
    db: Session = Depends(deps.get_db),
    gallery_id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Check if a specific item is in the wishlist
    """
    existing = db.query(Wishlist).filter(
        Wishlist.customer_id == current_user.id,
        Wishlist.gallery_id == gallery_id
    ).first()
    
    return {"is_saved": existing is not None}
