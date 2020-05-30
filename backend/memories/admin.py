from django.contrib import admin
from .models import Memory, MemoryFile, MemoryShareLink
# Register your models here.
admin.site.register(Memory)
admin.site.register(MemoryFile)
admin.site.register(MemoryShareLink)