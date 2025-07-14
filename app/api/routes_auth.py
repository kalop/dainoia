# app/api/routes_auth.py

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.api.routes_users import fake_users_db
from app.domain.user import UserInDB

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def fake_hash_password(pw: str):
    return "fakehashed" + pw


def get_user(email: str) -> UserInDB | None:
    return fake_users_db.get(email)


@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(form_data.username)  # treat username as email
    if not user or user.hashed_password != fake_hash_password(form_data.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"access_token": user.email, "token_type": "bearer"}


@router.get("/me")
def read_users_me(token: str = Depends(oauth2_scheme)):
    user = get_user(token)
    if not user or user.disabled:
        raise HTTPException(status_code=400, detail="Invalid user")
    return user
