from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from api.core import deps
from api.models.payment import Payment
from api.models.order import Order, OrderStatus, OrderTimeline
from api.schemas.payment import Payment as PaymentSchema, PaymentCreate
from api.models.user import User
import razorpay
from api.core.config import settings

client = None
if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

router = APIRouter()

@router.post("/quote/{order_id}")
def generate_quote(
    order_id: int,
    final_price: float,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_admin)
) -> Any:
    """
    Admin: Generate a quote and update the order to "Awaiting Payment"
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    order.final_price = final_price
    
    # Update Status
    status = db.query(OrderStatus).filter(OrderStatus.name == "Awaiting Payment").first()
    if not status:
        status = OrderStatus(name="Awaiting Payment", color="bg-blue-100 text-blue-800", sequence=2)
        db.add(status)
        db.commit()
        db.refresh(status)
        
    order.status_id = status.id
    
    # Add timeline event
    timeline = OrderTimeline(
        order_id=order.id,
        status_id=status.id,
        message=f"Quote generated for ${final_price}. Awaiting payment.",
        created_by=current_user.id
    )
    db.add(timeline)
    
    # Create Pending Payment Record
    payment = Payment(
        order_id=order.id,
        amount=final_price,
        status="Pending"
    )
    db.add(payment)
    
    db.commit()
    
    return {"status": "success", "message": "Quote generated"}

@router.get("/order/{order_id}", response_model=List[PaymentSchema])
def get_order_payments(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get payments for an order
    """
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not current_user.is_admin and order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view these payments")
        
    return db.query(Payment).filter(Payment.order_id == order_id).all()

@router.post("/razorpay-order/{payment_id}")
def create_razorpay_order(
    payment_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Customer: Create Razorpay Order
    """
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    order = db.query(Order).filter(Order.id == payment.order_id).first()
    if not current_user.is_admin and order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized for this payment")
        
    if payment.status == "Paid":
        raise HTTPException(status_code=400, detail="Already paid")
        
    if not client:
        # Fallback to mock if razorpay is not configured (for dev)
        payment.status = "Paid"
        payment.payment_method = "Mock_CreditCard"
        payment.transaction_id = f"txn_{uuid.uuid4().hex[:10]}"
        
        # Update Order Status
        status = db.query(OrderStatus).filter(OrderStatus.name == "In Production").first()
        if not status:
             status = OrderStatus(name="In Production", color="bg-purple-100 text-purple-800 border-purple-200", sequence=3)
             db.add(status)
             db.commit()
             db.refresh(status)
        order.status_id = status.id
        db.add(OrderTimeline(order_id=order.id, status_id=status.id, message=f"Payment received.", created_by=current_user.id))
        db.commit()
        return {"status": "success", "url": "http://localhost:3000/dashboard?mock_paid=true"}
        
    try:
        # Razorpay expects amount in paise (multiply by 100)
        data = {
            "amount": int(payment.amount * 100),
            "currency": "INR", # Assuming INR for Razorpay, or USD if enabled for international
            "receipt": f"receipt_order_{payment.order_id}",
            "notes": {
                "payment_id": payment.id
            }
        }
        
        razorpay_order = client.order.create(data=data)
        
        return {
            "status": "success", 
            "razorpay_order_id": razorpay_order["id"],
            "amount": razorpay_order["amount"],
            "currency": razorpay_order["currency"],
            "key_id": settings.RAZORPAY_KEY_ID
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify-payment")
def verify_payment(
    payment_id: int,
    razorpay_payment_id: str,
    razorpay_order_id: str,
    razorpay_signature: str,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Verify payment signature after frontend checkout success
    """
    if not client:
        raise HTTPException(status_code=400, detail="Razorpay not configured")
        
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
        
    order = db.query(Order).filter(Order.id == payment.order_id).first()
    if not current_user.is_admin and order.customer_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized for this payment")
        
    try:
        # Verify signature
        client.utility.verify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        })
        
        # If successful, mark as paid
        payment.status = "Paid"
        payment.transaction_id = razorpay_payment_id
        
        status = db.query(OrderStatus).filter(OrderStatus.name == "In Production").first()
        if not status:
             status = OrderStatus(name="In Production", color="bg-purple-100 text-purple-800 border-purple-200", sequence=3)
             db.add(status)
             db.commit()
             db.refresh(status)
        order.status_id = status.id
        db.add(OrderTimeline(order_id=order.id, status_id=status.id, message=f"Payment received.", created_by=current_user.id))
        db.commit()
        
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Payment verification failed")
