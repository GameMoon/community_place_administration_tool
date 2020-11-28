from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import EventSerializer
from .serializers import UserSerializer
from .models import Event
from .models import User
from rest_framework.permissions import AllowAny
from django.views.defaults import bad_request
from rest_framework.generics import ListCreateAPIView
from django.db import IntegrityError
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class EventView(viewsets.ModelViewSet):   
  permission_classes = (IsAuthenticated,)
  serializer_class = EventSerializer        
  queryset = Event.objects.all()     
  filterset_fields = ('user', )
  
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def create(self, request, *args, **kwargs):
        try:
            return super(generics.CreateAPIView, self).create(request, *args, **kwargs)
        except IntegrityError:
            return HttpResponse("User already exists",status=409)

