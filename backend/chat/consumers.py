import json
from channels.generic.websocket import WebsocketConsumer
from datetime import datetime



class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        now = datetime.now()
        
        self.send(text_data=json.dumps({
            'title': 'user',
            'subtitle': message,
            'date': now.strftime("%d/%m/%Y %H:%M:%S")
        }))
