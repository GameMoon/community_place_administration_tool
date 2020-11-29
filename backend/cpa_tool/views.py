import datetime
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics, status
from .serializers import EventSerializer
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.views.defaults import bad_request
from rest_framework.generics import ListCreateAPIView
from django.db import IntegrityError
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# from rest_framework import generics
from .serializers import EventSerializer, ArchiveDateSerializer, ArchiveEntrySerializer
from .models import Event, ArchiveDate, ArchiveEntry, User
from .gdrive import GDrive
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

# Create your views here.
class EventView(viewsets.ModelViewSet):   
  permission_classes = (IsAuthenticated,)
  serializer_class = EventSerializer        
  queryset = Event.objects.all()     
  filterset_fields = ('user',)
  
  def create(self, request, *args, **kwargs):
      request.data['user'] = Token.objects.get(key=request.auth.key).user_id
      serializer = EventSerializer(data=request.data)
      try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
      except ValidationError:
          return Response({"errors": (serializer.errors,)},
                          status=status.HTTP_400_BAD_REQUEST)

  def destroy(self, request, *args, **kwargs):
    user_id = Token.objects.get(key=request.auth.key).user_id
    event = Event.objects.get(pk=self.kwargs['pk'])
    if event.user.pk == user_id:
       instance = self.get_object()
       self.perform_destroy(instance)
       return Response(status=status.HTTP_204_NO_CONTENT)
    else:  return Response(status=status.HTTP_401_UNAUTHORIZED)



  @action(detail=False, methods=['get'])
  def get_own(self, request, pk=None):
    user_id = Token.objects.get(key=request.auth.key).user_id
    serializer = EventSerializer(Event.objects.filter(user = user_id),many="true")
    return Response(serializer.data)


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def create(self, request, *args, **kwargs):
        try:
            return super(generics.CreateAPIView, self).create(request, *args, **kwargs)
        except IntegrityError:
            return HttpResponse("User already exists",status=409)

class ArchiveView(viewsets.ModelViewSet):   
  serializer_class = ArchiveDateSerializer        
  queryset = ArchiveDate.objects.all()     
  filterset_fields = ('date',)
  http_method_names = ['get']
  drive = GDrive()

  def _parseDate(self, dateStr):
    return datetime.datetime.strptime(dateStr, self.drive.dateFormat).date()

  def _parseTime(self, timeStr):
    return datetime.datetime.strptime(timeStr, '{}.jpg'.format(self.drive.timeFormat)).time()

  def list(self, response):
    dates = self.drive.getDates()
    converted = []
    for date in dates:
      obj = ArchiveDate()
      obj.date = self._parseDate(date['name'])
      converted.append(obj)
    converted.sort(
      key = lambda x: x.date,
      reverse = True
    )
    serializer = ArchiveDateSerializer(converted, many='true')
    return Response(serializer.data)

  def retrieve(self, request, pk):
    try:
      pkdate = datetime.datetime.strptime(pk, "%Y-%m-%d").date()
    except:
      return Response('[]')
    srcdate = pkdate.strftime(self.drive.dateFormat)

    dates = self.drive.getDates()
    for date in dates:
      if date['name'] == srcdate:
        entries = self.drive.getEntries(date)
        converted = []
        for entry in entries:
          obj = ArchiveEntry()
          obj.time = self._parseTime(entry['name'])
          obj.link = entry['id']
          converted.append(obj)
        converted.sort(
          key = lambda x: x.time,
          reverse = True
        )
        serializer = ArchiveEntrySerializer(converted, many='true')
        return Response(serializer.data)

    return Response('[]')
