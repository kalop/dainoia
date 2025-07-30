from pydantic import BaseModel


class Agent(BaseModel):
    id: str
    name: str
    model: str
    description: str
    enabled: bool = True
    owner: str

    model_config = {
        "populate_by_name": True,  # permite usar agent.id y agent.model_dump()
    }

    def __repr__(self) -> str:
        return f"Agent(id={self.id!r}, name={self.name!r})"


class AgentInDB(Agent):
    pass
