# Generated by Django 3.0.6 on 2020-05-27 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memories', '0006_auto_20200524_2320'),
    ]

    operations = [
        migrations.AddField(
            model_name='memoryfile',
            name='media_type',
            field=models.CharField(choices=[('A', 'audio'), ('V', 'video'), ('I', 'image')], default='I', max_length=1),
            preserve_default=False,
        ),
    ]
