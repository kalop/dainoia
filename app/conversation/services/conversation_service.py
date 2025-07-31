from app.agent.domain.agent_factory import AgentFactory, AgentTypes


class ConversationService:

    def send_direct_message(
        self, user_id: str, agent_id: str, message: str, conversation_id: str = None
    ):

        # Get the agent form DB
        agent_factory = AgentFactory()
        agent = agent_factory.create(AgentTypes.GENERIC)

        # Get the conversation / create
        if conversation_id:
            pass
        # Atomic operation
        # -- Update history
        

        # -- Create AI service call

        # Return response
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
