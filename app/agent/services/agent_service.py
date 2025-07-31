from typing import List

from app.agent.domain.agent import Agent
from app.agent.domain.agent_factory import AgentFactory, AgentTypes
from app.agent.repositories.agent_repository import AgentRepository


class AgentService:
    def __init__(self, repo: AgentRepository):
        self.repo = repo

    async def list_available_agents(self) -> List[Agent]:
        return await self.repo.list_all()

    async def get_agent(self, agent_id: str) -> Agent | None:
        return await self.repo.get(agent_id)

    async def create_agent(self):
        agent_factory = AgentFactory()
        # agent = agent_factory.create(AgentTypes.OPEN_AI)
        agent = agent_factory.create(AgentTypes.GEMINI)
        result = agent.call()
        # pprint(result)
        return result["choices"][0]["message"]["content"]
