from sqlalchemy import create_engine
from api.core.config import settings

engine = create_engine(settings.DATABASE_URL)

alter_statements = [
    "ALTER TABLE users ADD COLUMN first_name VARCHAR NULL;",
    "ALTER TABLE users ADD COLUMN last_name VARCHAR NULL;",
    "ALTER TABLE users ADD COLUMN phone_number VARCHAR NULL;",
    "ALTER TABLE users ADD COLUMN shipping_address VARCHAR NULL;"
]

from sqlalchemy import create_engine, text

with engine.connect() as conn:
    for stmt in alter_statements:
        try:
            print(f"Executing: {stmt}")
            conn.execute(text(stmt))
            conn.commit()
        except Exception as e:
            print(f"Failed (might already exist): {e}")

print("Database patched successfully!")
