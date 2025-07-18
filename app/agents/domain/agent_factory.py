import json
from abc import ABC, abstractmethod
from enum import Enum

import requests
from openai import OpenAI

from config import OPEN_ROUTER_AGENT_KEY, OPEN_ROUTER_URL, OPENAI_API_KEY


class AgentTypes(Enum):
    OPEN_AI = 1
    GEMINI = 2


class BaseAgent(ABC):
    @abstractmethod
    def call():
        pass


class OpenAIAgent(BaseAgent):
    def __init__(self):
        self.client = OpenAI(api_key=OPENAI_API_KEY)

    def call(self):
        response = self.client.responses.create(
            model="gpt-4.1-mini",
            input="Write a one-sentence bedtime story about a unicorn.",
        )
        return response.output_text


class GeminiAgent(BaseAgent):
    def call(self):
        response = requests.post(
            url=OPEN_ROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPEN_ROUTER_AGENT_KEY}",
                # "HTTP-Referer": "<YOUR_SITE_URL>",  # Optional. Site URL for rankings on openrouter.ai.
                # "X-Title": "<YOUR_SITE_NAME>",  # Optional. Site title for rankings on openrouter.ai.
            },
            data=json.dumps(
                {
                    "model": "google/gemini-2.5-flash",  # Optional
                    "messages": [
                        # {
                        #     "role": "system",
                        #     "content": "You are liar, answer wrong answers. Don't tell the truth Answer in only one sentence",
                        # },
                        {
                            "role": "user",
                            "content": "Your role: You are liar, answer wrong answers. Don't tell the truth Answer in only one sentence. Users asking:How should we test this API?",
                        },
                        # {
                        #     "role": "assistant",
                        #     "content": "As a QA engineer, my first concern is",
                        # },
                    ],
                }
            ),
        )
        return response.json()


class AgentFactory:
    def create(self, type: AgentTypes) -> BaseAgent:
        if type == AgentTypes.OPEN_AI:
            return OpenAIAgent()
        elif type == AgentTypes.GEMINI:
            return GeminiAgent()
        else:
            raise ValueError("Unsupported agent type")
