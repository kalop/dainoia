import os

from dotenv import load_dotenv

load_dotenv()  # loads from .env into os.environ

OPENAI_API_KEY = os.getenv("OPENAI_MY_DAINOIA_KEY")

OPEN_ROUTER_URL="https://openrouter.ai/api/v1/chat/completions"
OPEN_ROUTER_AGENT_KEY = os.getenv("OPEN_ROUTER_AGENT_KEY")
