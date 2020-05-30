# Generated by Django 3.0.6 on 2020-05-29 20:38

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('memories', '0009_auto_20200528_0037'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemoryShareLink',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('hash_key', models.CharField(max_length=11, unique=True)),
                ('clicks', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('memory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='memory_share', to='memories.Memory')),
            ],
        ),
    ]