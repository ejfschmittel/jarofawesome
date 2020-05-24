# Generated by Django 3.0.6 on 2020-05-24 21:20

from django.db import migrations, models
import django.db.models.deletion
import memories.models


class Migration(migrations.Migration):

    dependencies = [
        ('memories', '0005_memoryfile'),
    ]

    operations = [
        migrations.AddField(
            model_name='memoryfile',
            name='memory',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='memory_file', to='memories.Memory'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='memoryfile',
            name='external_url',
            field=models.URLField(blank=True, default=None, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='memoryfile',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to=memories.models.get_unique_file_path),
        ),
    ]
