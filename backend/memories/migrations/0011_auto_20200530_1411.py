# Generated by Django 3.0.6 on 2020-05-30 12:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('memories', '0010_memorysharelink'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memorysharelink',
            name='memory',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='memory_share_link', to='memories.Memory'),
        ),
    ]
