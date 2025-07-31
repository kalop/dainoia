from pymongo import AsyncMongoClient

from config import MONGO_DB, MONGO_URI

client: AsyncMongoClient | None = None


def get_client() -> AsyncMongoClient:
    # global _client
    global client
    if client is None:
        client = AsyncMongoClient(MONGO_URI)
    return client


def get_db():
    return get_client()[MONGO_DB]
