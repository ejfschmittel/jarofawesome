from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.utils.timezone import now

User = get_user_model()



class Memory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    memory = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)

    date = models.DateField(default=now, blank=True)

    user = models.ForeignKey(to=User,on_delete=models.CASCADE)


    def __str__(self):
        return self.user.username + ": " + self.memory
