# Generated by Django 2.0.6 on 2018-06-16 13:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0003_auto_20180614_1415'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='section_question', to='checklist.Section'),
        ),
    ]