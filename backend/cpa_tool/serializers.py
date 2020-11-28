
from rest_framework import serializers
from .models import Event, ArchiveDate, ArchiveEntry, User

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ('id', 'user', 'title', 'start', 'end')
    # lookup_field = 'title'


class UserSerializer(serializers.ModelSerializer):
  class Meta:
      model = User
      fields = ('username', 'password')
      extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
      password = validated_data.pop('password')
      user = User(**validated_data)
      user.set_password(password)
      user.save()
      return user
class ArchiveDateSerializer(serializers.ModelSerializer):
  class Meta:
    model = ArchiveDate
    fields = ('date',)

class ArchiveEntrySerializer(serializers.ModelSerializer):
  class Meta:
    model = ArchiveEntry
    fields = ('time', 'link')
