# Generated by Django 2.0.6 on 2018-07-26 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0008_auto_20180726_1059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subquestion',
            name='subquestionURL',
        ),
    ]
