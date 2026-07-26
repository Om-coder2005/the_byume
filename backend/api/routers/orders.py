import uuid
from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from api.core import deps
from api.models.order import Order, OrderStatus, OrderTimeline
from api.models.user import User
from api.schemas.order import Order as OrderSchema, OrderCreate
from api.core.email import send_order_status_email

router = APIRouter()

class StatusUpdate(BaseModel):
    status_name: str
    message: str | None = None

@router.get("/", response_model=List[OrderSchema])
def read_orders(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Retrieve orders.
    Admin can see all, customer can only see their own.
    """
    if current_user.is_admin:
        orders = db.query(Order).offset(skip).limit(limit).all()
    else:
        orders = db.query(Order).filter(Order.customer_id == current_user.id).offset(skip).limit(limit).all()
    return orders

@router.post("/", response_model=OrderSchema)
def create_order(
    *,
    db: Session = Depends(deps.get_db),
    order_in: OrderCreate,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Submit a custom order request.
    """
    status = db.query(OrderStatus).filter(OrderStatus.name == "Submitted").first()
    if not status:
        status = OrderStatus(name="Submitted", sequence=1)
        db.add(status)
        db.commit()
        db.refresh(status)

    order_uuid = str(uuid.uuid4())
    order_number = f"BYUME-{order_uuid[:8].upper()}"

    order = Order(
        uuid=order_uuid,
        order_number=order_number,
        customer_id=current_user.id,
        status_id=status.id,
        budget=order_in.budget,
        deadline=order_in.deadline,
        gift_message=order_in.gift_message,
        priority=order_in.priority,
        notes=order_in.notes
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

@router.patch("/{id}/status", response_model=OrderSchema)
def update_order_status(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    status_update: StatusUpdate,
    current_user: User = Depends(deps.get_current_active_admin)
) -> Any:
    """
    Update order status and append to timeline. Admin only.
    """
    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    new_status = db.query(OrderStatus).filter(OrderStatus.name == status_update.status_name).first()
    if not new_status:
        new_status = OrderStatus(name=status_update.status_name, sequence=99)
        db.add(new_status)
        db.commit()
        db.refresh(new_status)

    order.status_id = new_status.id
    
    timeline_entry = OrderTimeline(
        order_id=order.id,
        status_id=new_status.id,
        message=status_update.message or f"Status updated to {status_update.status_name}",
        created_by=current_user.id
    )
    db.add(timeline_entry)
    db.commit()
    db.refresh(order)
    
    # Send email notification to customer
    if order.customer:
        customer_name = order.customer.first_name or order.customer.username or "Customer"
        send_order_status_email(
            email_to=order.customer.email,
            order_number=order.order_number,
            new_status=new_status.name,
            customer_name=customer_name
        )
        
    return order

@router.get("/{id}", response_model=OrderSchema)
def read_order(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get order by ID.
    """
    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not current_user.is_admin and order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return order

class PriceUpdate(BaseModel):
    estimated_price: float | None = None
    final_price: float | None = None

@router.patch("/{id}/price", response_model=OrderSchema)
def update_order_price(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    price_update: PriceUpdate,
    current_user: User = Depends(deps.get_current_active_admin)
) -> Any:
    """
    Update order pricing. Admin only.
    """
    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    if price_update.estimated_price is not None:
        order.estimated_price = price_update.estimated_price
    if price_update.final_price is not None:
        order.final_price = price_update.final_price
        
    db.commit()
    db.refresh(order)
    return order
