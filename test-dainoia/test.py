# Import required modules
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub

from pubnub.pubnub import SubscribeListener

import os
from dotenv import load_dotenv

load_dotenv()
SUBSCRIBE_KEY = os.getenv('SUBSCRIBE_KEY')
PUBLISH_KEY = os.getenv('PUBLISH_KEY')

# Set up PubNub configuration
pnconfig = PNConfiguration()
pnconfig.subscribe_key = SUBSCRIBE_KEY  # Replace with your subscribe key
pnconfig.publish_key = PUBLISH_KEY    # Replace with your publish key
pnconfig.user_id = 'python-user'
pnconfig.enable_subscribe = True


# Create a PubNub instance
pubnub = PubNub(pnconfig)

##Set up event listeners

# Create a custom listener for status events
class StatusListener(SubscribeListener):
    def status(self, pubnub, status):
        # This method is called when the status of the connection changes
        print(f'Status: {status.category.name}')
    
    # We're not implementing the message handler here as we'll use a subscription-specific handler

# Add the listener to your PubNub instance
status_listener = StatusListener()
pubnub.add_listener(status_listener)

## Create a subscription

# Define the channel you want to subscribe to
my_channel = 'my-channel'

# Create a subscription for the channel
subscription = pubnub.channel(my_channel).subscription()

# Set up a message handler
subscription.on_message = lambda message: print(f'Message received: {message.message}')

# Subscribe to the channel
subscription.subscribe()

print(f'Subscribed to channel: {my_channel}')


## Publish messages
import time
from pubnub.exceptions import PubNubException

# Wait for a moment to ensure the subscription is active
time.sleep(1)

# Create a message
message = {
    'msg': 'Hello from PubNub Python SDK!'
}

# Publish the message to the channel
try:
    envelope = pubnub.publish().channel(my_channel).message(message).sync() #future() or async()
    print(f'Published message with timetoken: {envelope.result.timetoken}')
except PubNubException as e:
    print(f'Publish failed: {e}')


# Keep the script running to receive messages
time.sleep(3)

# Step 8: Clean up before exiting
pubnub.stop()
print('Cleanup complete.')