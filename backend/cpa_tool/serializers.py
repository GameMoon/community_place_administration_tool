from rest_framework import serializers
from .models import Event, ArchiveDate, ArchiveEntry

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ('id', 'user', 'title', 'start', 'end')
    # lookup_field = 'title'

class ArchiveDateSerializer(serializers.ModelSerializer):
  class Meta:
    model = ArchiveDate
    fields = ('date',)

class ArchiveEntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = ArchiveEntry
    fields = ('time',)
