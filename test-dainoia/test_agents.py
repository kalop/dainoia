from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from pubnub.exceptions import PubNubException
import threading
import time
import random
import os
from dotenv import load_dotenv

load_dotenv()
SUBSCRIBE_KEY = os.getenv('SUBSCRIBE_KEY')
PUBLISH_KEY = os.getenv('PUBLISH_KEY')

# Define agent roles
agents = ["arquitecto", "dev", "qa"]

# Common channel
channel = "tech-room"

# Basic messages per agent
agent_responses = {
    "arquitecto": "Creo que deberíamos considerar la escalabilidad desde el principio.",
    "dev": "Implementemos un backend modular con NestJS.",
    "qa": "¿Qué pasa si hay múltiples usuarios editando al mismo tiempo?"
}

# Store PubNub instances per agent
pubnubs = {}

# Function to simulate each agent
def run_agent(agent_name):
    config = PNConfiguration()
    config.subscribe_key = SUBSCRIBE_KEY
    config.publish_key = PUBLISH_KEY
    config.user_id = agent_name
    config.enable_subscribe = True

    pubnub = PubNub(config)
    pubnubs[agent_name] = pubnub

    subscription = pubnub.channel(channel).subscription()

    def handle_message(message):
        incoming = message.message
        sender = incoming.get("sender")
        if sender != agent_name:
            print(f"[{agent_name}] recibió de [{sender}]: {incoming.get('msg')}")
            time.sleep(random.uniform(0.5, 1.5))  # Simulate thinking
            response = {
                "sender": agent_name,
                "msg": agent_responses[agent_name]
            }
            try:
                pubnub.publish().channel(channel).message(response).sync()
            except PubNubException as e:
                print(f"[{agent_name}] Error al publicar: {e}")

    subscription.on_message = handle_message
    subscription.subscribe()
    time.sleep(10)
    pubnub.stop()

# Run all agents in threads
threads = []
for name in agents:
    t = threading.Thread(target=run_agent, args=(name,))
    t.start()
    threads.append(t)

# Start the conversation with first message
time.sleep(1)
pnconfig = PNConfiguration()
pnconfig.subscribe_key = SUBSCRIBE_KEY
pnconfig.publish_key = PUBLISH_KEY
pnconfig.user_id = 'starter'

starter = PubNub(pnconfig)
try:
    starter.publish().channel(channel).message({"sender": "starter", "msg": "¿Cómo estructuramos el backend?"}).sync()
except PubNubException as e:
    print("[starter] Error al iniciar conversación:", e)

for t in threads:
    t.join()

starter.stop()
