from django.db import models
import uuid

class Memory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    memory = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)
