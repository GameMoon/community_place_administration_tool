import datetime
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
# from rest_framework import generics
from .serializers import EventSerializer, ArchiveDateSerializer, ArchiveEntrySerializer
from .models import Event, ArchiveDate, ArchiveEntry
from .gdrive import GDrive

# Create your views here.
class EventView(viewsets.ModelViewSet):   
  serializer_class = EventSerializer        
  queryset = Event.objects.all()     
  filterset_fields = ('user',)
  
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
