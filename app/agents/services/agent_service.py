from app.agents.domain.agent_factory import AgentFactory, AgentTypes


class AgentService:
    def list_available_agents():
        return []

    def create_agent(self):
        agent_factory = AgentFactory()
        # agent = agent_factory.create(AgentTypes.OPEN_AI)
        agent = agent_factory.create(AgentTypes.GEMINI)
        result = agent.call()
        # pprint(result)
        return result["choices"][0]["message"]["content"]
