# Generated by Django 4.2.4 on 2023-11-04 15:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_product'),
    ]

    operations = [
        migrations.CreateModel(
            name='Criteria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criteria_title', models.CharField(max_length=32)),
                ('criteria_text', models.CharField(max_length=512)),
                ('weight', models.DecimalField(decimal_places=2, default=1.0, max_digits=8)),
                ('utility_func', models.CharField(default='', max_length=1024)),
            ],
        ),
        migrations.CreateModel(
            name='Subcriteria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subcriteria_title', models.CharField(max_length=32)),
                ('subcriteria_text', models.CharField(max_length=512)),
                ('weight', models.DecimalField(decimal_places=2, default=1.0, max_digits=8)),
                ('utility_func', models.CharField(default='', max_length=1024)),
                ('criteria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.criteria')),
            ],
        ),
        migrations.CreateModel(
            name='Variable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('variable_title', models.CharField(max_length=32)),
                ('variable_text', models.CharField(max_length=512)),
                ('weight', models.DecimalField(decimal_places=2, default=1.0, max_digits=8)),
                ('utility_func', models.CharField(default='', max_length=1024)),
                ('subcriteria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.subcriteria')),
            ],
        ),
    ]