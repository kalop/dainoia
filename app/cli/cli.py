import asyncio

import typer

from app.agent.repositories.agent_repository import MongoAgentRepository
from app.agent.services.agent_service import AgentService
from app.conversation.services.conversation_service import ConversationService

cli = typer.Typer()


def get_agent_service() -> AgentService:
    repo = MongoAgentRepository()
    return AgentService(repo)


def get_conversation_service() -> ConversationService:
    repo = MongoAgentRepository()
    return ConversationService(repo)


@cli.command("list-agents")
def list_agents():
    agent_service: AgentService = get_agent_service()

    async def _run():
        agents = await agent_service.list_available_agents()
        for agent in agents:
            # agent = agent.model_dump()
            typer.echo(f"{agent.id}  |  {agent.name}")

    asyncio.run(_run())


@cli.command()
def call_agent():
    agent_service: AgentService = get_agent_service()

    result = agent_service.create()
    typer.echo(result)


@cli.command("send-message")
def send_message():
    user_id = "User1234"
    agent_id = "3dfe5c6c-410e-443e-b84d-73c90a3623b0"
    message = "What things have this color?"

    conversation_service: ConversationService = get_conversation_service()

    async def _run():
        response = await conversation_service.send_direct_message(
            user_id, agent_id, message
        )
        return response

    response = asyncio.run(_run())
    typer.echo(response)


if __name__ == "__main__":
    cli()
