from django.contrib import admin
from .models import Memory, MemoryFile 
# Register your models here.
admin.site.register(Memory)
admin.site.register(MemoryFile)