from typing import Dict, Optional

from fastapi import APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr

from app.domain.user import User, UserInDB

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# In-memory store for users (replace with DB later)
fake_users_db: Dict[str, UserInDB] = {}


class RegisterRequest(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: Optional[str] = None


@router.post("/register")
def register_user(payload: RegisterRequest):
    # Simple email uniqueness check
    if payload.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = "fakehashed" + payload.password  # solo para ejemplo
    user_in_db = UserInDB(**payload.dict(), hashed_password=hashed)
    fake_users_db[payload.email] = user_in_db
    return {"msg": "User registered"}


@router.get("/users")
def registered_users():
    return [User(**user.model_dump()) for user in fake_users_db.values()]
