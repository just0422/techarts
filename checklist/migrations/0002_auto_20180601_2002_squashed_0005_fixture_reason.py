# Generated by Django 2.0.5 on 2018-06-01 22:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('checklist', '0002_auto_20180601_2002'), ('checklist', '0003_auto_20180601_2036'), ('checklist', '0004_auto_20180601_2232'), ('checklist', '0005_fixture_reason')]

    dependencies = [
        ('checklist', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='section',
            name='next_section',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='previous_section', to='checklist.Section'),
        ),
        migrations.AlterField(
            model_name='section',
            name='next_section',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='previous_section', to='checklist.Section'),
        ),
        migrations.RenameModel(
            old_name='Fixtures',
            new_name='Fixture',
        ),
        migrations.AddField(
            model_name='fixture',
            name='reason',
            field=models.TextField(blank=True),
        ),
    ]