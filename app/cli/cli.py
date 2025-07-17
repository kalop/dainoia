import typer

from app.agents.services.agent_service import AgentService

cli = typer.Typer()

agent_service = AgentService()


@cli.command()
def list_agents():
    agents = agent_service.list_available_agents()
    typer.echo(f"Available agents: {agents}")


@cli.command()
def call_agent(agent_type: str):
    result = agent_service.create_agent()
    typer.echo(result)


if __name__ == "__main__":
    cli()
