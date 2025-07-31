from dataclasses import asdict
from typing import List, Protocol

from bson import ObjectId

from app.agent.domain.agent import Agent
from app.infrastructure.db.mongo import get_db


class AgentRepository(Protocol):
    async def list_all(self) -> List[Agent]: ...
    async def get(self, agent_id: str) -> Agent | None: ...


class MongoAgentRepository(AgentRepository):
    def __init__(self):
        self._col = get_db()["agent"]

    async def list_all(self) -> List[Agent]:
        docs = await self._col.find({"enabled": True}).to_list(length=None)
        return [Agent(**doc) for doc in docs]

    async def get(self, agent_id: str) -> Agent | None:
        doc = await self._col.find_one({"_id": ObjectId(agent_id)})
        return Agent(**doc) if doc else None

    async def save(self, agent: Agent):
        data = asdict(agent)
        data["_id"] = ObjectId(agent.id)
        await self._col.replace_one({"_id": data["_id"]}, data, upsert=True)
