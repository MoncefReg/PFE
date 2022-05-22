import json
from channels.generic.websocket import AsyncWebsocketConsumer
from baseapp.models import *


class Consumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "notification"

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def notify(self, text_data=None, type='notify', **kwargs):
        message = text_data.get("message", {})
        await self.send(json.dumps({
            "id": message.get("id", None),
            "log": message.get("log", None),
            "date": message.get("date", None),
        }))
