from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime

app = FastAPI()

# In-memory store for users (replace with DB later)
users = {}

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr

class RegisterResponse(BaseModel):
    user_id: str
    registered_at: str

@app.post("/register", response_model=RegisterResponse)
def register_user(payload: RegisterRequest):
    # Simple email uniqueness check
    if payload.email in users:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat()
    users[payload.email] = {
        "user_id": user_id,
        "name": payload.name,
        "email": payload.email,
        "registered_at": timestamp
    }

    print(users)

    return RegisterResponse(user_id=user_id, registered_at=timestamp)
