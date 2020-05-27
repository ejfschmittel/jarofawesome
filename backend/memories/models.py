from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.utils.timezone import now
import os

User = get_user_model()


def get_unique_file_path(instance, filename):
    # handle differnt save / for differnt fiel formats?
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('uploads/', filename)

class Memory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    memory = models.CharField(max_length=128)
    description = models.TextField(null=True, blank=True)
    datetime = models.DateTimeField(default=now, blank=True)
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)


    @property
    def date(self):
        return self.datetime.date()


    def __str__(self):
        return self.user.username + ": " + self.memory

# cleaning filetypes https://stackoverflow.com/questions/4853581/django-get-uploaded-file-type-mimetype

class MemoryFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    external_url = models.URLField(max_length=500, null=True, default=None, blank=True)
    file = models.FileField(upload_to=get_unique_file_path, null=True, blank=True)
    memory = models.ForeignKey(to=Memory,related_name="memory_file", on_delete=models.CASCADE)

    def __str__(self):
        strVal = str(self.id)

        if self.external_url:
            strVal += " url: " + str(self.external_url)

        if self.file:
            strVal += " file: " + str(self.file.url)

        return strVal
