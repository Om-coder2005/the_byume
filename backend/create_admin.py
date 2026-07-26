import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api.core.database import SessionLocal
from api.models.user import User
from api.core.security import get_password_hash

db = SessionLocal()

# Check if admin already exists
admin_email = "admin@byume.com"
admin = db.query(User).filter(User.email == admin_email).first()

if admin:
    print(f"Admin already exists: {admin_email}")
else:
    new_admin = User(
        email=admin_email,
        username="admin",
        hashed_password=get_password_hash("Admin123!"),
        is_active=True,
        is_admin=True,
        first_name="Byume",
        last_name="Admin"
    )
    db.add(new_admin)
    db.commit()
    print(f"Admin created successfully! Email: {admin_email} | Password: Admin123!")

db.close()
