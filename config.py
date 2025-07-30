import os

from dotenv import load_dotenv

load_dotenv()  # loads from .env into os.environ

OPENAI_API_KEY = os.getenv("OPENAI_MY_DAINOIA_KEY")

OPEN_ROUTER_URL = "https://openrouter.ai/api/v1"
OPEN_ROUTER_AGENT_KEY = os.getenv("OPEN_ROUTER_AGENT_KEY")

MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASSW = os.getenv("MONGO_PASSW")
MONGO_URI = os.getenv("MONGO_URI", f"mongodb://{MONGO_USER}:{MONGO_PASSW}@localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "dainoia")
