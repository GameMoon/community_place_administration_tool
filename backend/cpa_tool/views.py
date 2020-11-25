from django.shortcuts import render
from rest_framework import viewsets
# from rest_framework import generics
from .serializers import EventSerializer
from .models import Event

# Create your views here.
class EventView(viewsets.ModelViewSet):   
  serializer_class = EventSerializer        
  queryset = Event.objects.all()     
  filterset_fields = ('user', )
  
