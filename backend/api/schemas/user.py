from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    username: str

class UserCreate(UserBase):
    password: str

class UserInDBBase(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    shipping_address: str | None = None

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class UserUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone_number: str | None = None
    shipping_address: str | None = None

class UserInDB(UserInDBBase):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: int | None = None
