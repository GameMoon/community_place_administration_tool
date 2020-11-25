from django.contrib import admin

# Register your models here.
from .models import Event  # add this


class EventAdmin(admin.ModelAdmin):  # add this
  list_display = ('user','title', 'start', 'end')  # add this


# Register your models here.
admin.site.register(Event, EventAdmin)  # add this
