from django.db import models
from django.contrib.auth import get_user_model
from django.utils.timezone import now
from django.dispatch import receiver
import uuid
import string   
from secrets import token_urlsafe
import random
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
    # datetime = models.DateTimeField(default=now, blank=True)
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)

    memory_date = models.DateField(default=now, blank=True, null=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.user.username + ": " + self.memory





# cleaning filetypes https://stackoverflow.com/questions/4853581/django-get-uploaded-file-type-mimetype

MEDIA_TYPES = [
    ('audio', 'audio'),
    ('video', 'video'),
    ('image', 'image'),
    ('youtube', 'youtube')
]

class MemoryFile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    external_url = models.URLField(max_length=500, null=True, default=None, blank=True)
    file = models.FileField(upload_to=get_unique_file_path, null=True, blank=True)
    memory = models.ForeignKey(to=Memory,related_name="memory_file", on_delete=models.CASCADE)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)

    def __str__(self):
        strVal = str(self.id)

        if self.external_url:
            strVal += " url: " + str(self.external_url)

        if self.file:
            strVal += " file: " + str(self.file.url)

        return strVal


@receiver(models.signals.post_delete, sender=MemoryFile)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)




class MemoryShareLink(models.Model): 
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hash_key =  models.CharField(unique=True, max_length=11)
    memory = models.OneToOneField(to=Memory,related_name="memory_share_link", on_delete=models.CASCADE)
    clicks = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def clicked(self):
        self.clicks += 1;
        self.save()

    def random_choice(self):
        alphabet = string.ascii_lowercase + string.digits
        return ''.join(random.choices(alphabet, k=8))

    # override save and create short hash


    def save(self, *args, **kwargs):
        if not self.hash_key:
            random_hash = get_random_hash(self)
            self.hash_key = random_hash

        return super().save(*args, **kwargs)


def get_random_hash(instance):
    print("hello mello")
    random_string = token_urlsafe(11)
    qs_exists = MemoryShareLink.objects.filter(hash_key=random_string).exists()
    if qs_exists:
        return get_random_hash(instance)
    return random_string
