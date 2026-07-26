import os
import sys

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from api.core.database import SessionLocal, engine, Base
from api.models.user import User
from api.models.gallery import Category, Gallery, Tag, GalleryImage
from api.models.media import MediaFile
from api.core.security import get_password_hash

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # 1. Create a test user
    test_user = db.query(User).filter(User.email == "test@byume.com").first()
    if not test_user:
        test_user = User(
            email="test@byume.com",
            username="testuser",
            hashed_password=get_password_hash("password123"),
            is_active=True
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        print("Created test user: test@byume.com / password123")
        
    # 2. Create Categories
    categories_data = [
        {"name": "Abstract Geometry", "slug": "abstract-geometry"},
        {"name": "Botanical Dreams", "slug": "botanical-dreams"},
        {"name": "Earth & Clay", "slug": "earth-and-clay"}
    ]
    
    cats = []
    for c_data in categories_data:
        cat = db.query(Category).filter(Category.name == c_data["name"]).first()
        if not cat:
            cat = Category(name=c_data["name"], slug=c_data["slug"])
            db.add(cat)
            db.commit()
            db.refresh(cat)
        cats.append(cat)
        
    print(f"Ensured {len(cats)} categories exist.")
    
    # 3. Create some Gallery items and MediaFiles
    gallery_data = [
        {
            "title": "Sunrise Arch",
            "slug": "sunrise-arch",
            "description": "A beautiful terracotta arch design.",
            "category_id": cats[0].id,
            "image_url": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600"
        },
        {
            "title": "Monstera Leaf",
            "slug": "monstera-leaf",
            "description": "Lush green botanical rug.",
            "category_id": cats[1].id,
            "image_url": "https://images.unsplash.com/photo-1617392683938-1647890bc4ff?q=80&w=600"
        },
        {
            "title": "Desert Sand",
            "slug": "desert-sand",
            "description": "Warm and cozy textures.",
            "category_id": cats[2].id,
            "image_url": "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600"
        }
    ]
    
    for g_data in gallery_data:
        item = db.query(Gallery).filter(Gallery.title == g_data["title"]).first()
        if not item:
            item = Gallery(
                title=g_data["title"], 
                slug=g_data["slug"],
                description=g_data["description"], 
                category_id=g_data["category_id"]
            )
            db.add(item)
            db.commit()
            db.refresh(item)
            
            # Create MediaFile
            media_pub_id = f"seed_{g_data['slug']}"
            media = db.query(MediaFile).filter(MediaFile.cloudinary_public_id == media_pub_id).first()
            if not media:
                media = MediaFile(
                    cloudinary_public_id=media_pub_id,
                    url=g_data["image_url"],
                    mime="image/jpeg"
                )
                db.add(media)
                db.commit()
                db.refresh(media)

            # Link via GalleryImage
            img = GalleryImage(
                gallery_id=item.id,
                media_id=media.id
            )
            db.add(img)
            db.commit()
            
    print("Seeded gallery items.")
    db.close()

if __name__ == "__main__":
    print("Seeding database...")
    seed_db()
    print("Done!")
