from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from api.core import deps
from api.models.review import Review
from api.models.order import Order
from api.models.user import User
from api.schemas.review import Review as ReviewSchema, ReviewCreate, ReviewUpdate

router = APIRouter()

@router.get("/", response_model=List[ReviewSchema])
def read_reviews(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    featured_only: bool = False
) -> Any:
    """
    Retrieve reviews. 
    Public endpoint. Will only return public reviews.
    Can filter by featured_only for the Community Showcase.
    """
    query = db.query(Review).filter(Review.is_public == True)
    if featured_only:
        query = query.filter(Review.is_featured == True)
    
    # Order by newest first
    reviews = query.order_by(Review.created_at.desc()).offset(skip).limit(limit).all()
    
    # Mask user names if anonymous
    for review in reviews:
        if review.is_anonymous and review.customer:
            # Create a shallow copy or just modify the returned representation
            # A cleaner way is to just blank out the name fields
            review.customer.first_name = "Anonymous"
            review.customer.last_name = "Crafter"
            review.customer.email = "hidden"
            
    return reviews

@router.get("/admin", response_model=List[ReviewSchema])
def read_all_reviews_admin(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Admin endpoint to view all reviews including private ones.
    """
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    reviews = db.query(Review).order_by(Review.created_at.desc()).offset(skip).limit(limit).all()
    return reviews

@router.post("/", response_model=ReviewSchema)
def create_review(
    *,
    db: Session = Depends(deps.get_db),
    review_in: ReviewCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Submit a new review for an order.
    """
    # Verify order exists and belongs to user
    order = db.query(Order).filter(Order.id == review_in.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to review this order")
        
    # Check if order is completed
    if order.status.name != "Completed":
        raise HTTPException(status_code=400, detail="Can only review completed orders")
        
    try:
        review = Review(
            order_id=order.id,
            customer_id=current_user.id,
            rating=review_in.rating,
            story=review_in.story,
            occasion=review_in.occasion,
            is_public=review_in.is_public,
            is_anonymous=review_in.is_anonymous
        )
        db.add(review)
        db.commit()
        db.refresh(review)
        return review
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="You have already reviewed this order")

@router.patch("/{id}", response_model=ReviewSchema)
def update_review(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    review_in: ReviewUpdate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Admin endpoint to moderate/feature a review.
    """
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
        
    review = db.query(Review).filter(Review.id == id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
        
    if review_in.is_featured is not None:
        review.is_featured = review_in.is_featured
    if review_in.is_public is not None:
        review.is_public = review_in.is_public
        
    db.commit()
    db.refresh(review)
    return review
