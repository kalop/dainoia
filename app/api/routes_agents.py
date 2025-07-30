from typing import Dict

from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer

from app.agents.domain.agent import Agent
from app.domain.user import User

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# In-memory store for users (replace with DB later)
fake_agents_db: Dict[str, Agent] = {}


@router.get("/agents")
def registered_users():
    return [User(**user.model_dump()) for user in fake_agents_db.values()]
