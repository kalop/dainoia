from app.agent.repositories.agent_repository import AgentRepository


class ConversationService:
    def __init__(self, agent_repository: AgentRepository):
        self.agent_repository = agent_repository

    async def send_direct_message(
        self, user_id: str, agent_id: str, message: str, conversation_id: str = None
    ):
        # Get the agent from DB
        agent = await self.agent_repository.get(agent_id)
        if not agent:
            raise ValueError(f"Agent with id {agent_id} not found")

        # Get the conversation / create
        if conversation_id:
            pass
        # TODO: Implement conversation retrieval/creation logic

        # -- Update agent.history with
        # TODO: Implement history update logic

        # -- Create AI service call

        # Build conversation messages
        messages = [
            {
                "role": "user",
                "content": "What are the primary colors?",
            },
            {
                "role": "assistant",
                "content": "The primary colors are red, yellow, and blue.",
            },
            {
                "role": "user",
                "content": "And which one do you prefer? Just say one",
            },
            {
                "role": "assistant",
                "content": "Blue",
            },
            {
                "role": "system",
                "content": "Answer in only one sentence. You are an artist and always express the beauty for the things you see",
            },
            {"role": "user", "content": message},
        ]

        result = agent.call(messages)
        # pprint(result)
        return result.choices[0].message.content
