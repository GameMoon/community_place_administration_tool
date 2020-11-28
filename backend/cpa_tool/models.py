from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Message(models.Model):
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  content = models.TextField()
  date = models.DateTimeField()

class Event(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=120)
  start = models.DateTimeField()
  end = models.DateTimeField()

class ArchiveDate(models.Model):
  date = models.DateField()

class ArchiveEntry(models.Model):
  time = models.TimeField()
  link = models.CharField(max_length=64)
