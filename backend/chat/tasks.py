from __future__ import absolute_import, unicode_literals    
from celery import shared_task    
  
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from cpa_tool.models import Event

from datetime import datetime, timedelta

def send_notification(event_name):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'lobby',
        {
            'type': 'chat_message',
            'user': "System",
            'message': event_name+" starting in 15 minutes"
        }
    )

@shared_task    
def check_events():    
    events = Event.objects.filter(start__lt=(datetime.now() + timedelta(minutes=16)).isoformat(),
                                  start__gt=(datetime.now() + timedelta(minutes=14)).isoformat())
    if len(events) == 0: return
    for event in events:
        print("starting: ", event.title)
        send_notification(event.title)

