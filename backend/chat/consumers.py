import json
from channels.generic.websocket import WebsocketConsumer
from datetime import datetime
from asgiref.sync import async_to_sync
from cpa_tool.models import User
from cpa_tool.models import Event
from rest_framework.authtoken.models import Token
from _datetime import timedelta

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.group_name = "lobby"

        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user_id = Token.objects.get(key=text_data_json['token']).user_id
        user = User.objects.get(pk=user_id)

        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'chat_message',
                'user': user.username,
                'message': message
            }
        )


    def chat_message(self, event):
        message = event['message']
        now = datetime.now()
       
        self.send(text_data=json.dumps({
            'title': event['user'],
            'subtitle': message,
            'date': now.strftime("%d/%m/%Y %H:%M:%S")
        }))
