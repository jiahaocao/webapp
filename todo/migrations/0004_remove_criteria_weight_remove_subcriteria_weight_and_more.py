# Generated by Django 4.2.4 on 2023-11-04 15:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_criteria_subcriteria_variable'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='criteria',
            name='weight',
        ),
        migrations.RemoveField(
            model_name='subcriteria',
            name='weight',
        ),
        migrations.RemoveField(
            model_name='variable',
            name='weight',
        ),
    ]
