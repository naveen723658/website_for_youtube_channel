# Generated by Django 4.1.5 on 2023-01-17 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Header',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('logo', models.ImageField(upload_to='header/logo', verbose_name='Logo')),
                ('favicon', models.ImageField(upload_to='header/favicon', verbose_name='Favicon')),
            ],
        ),
        migrations.CreateModel(
            name='Hero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='Crousel', verbose_name='Crousel Image')),
                ('desc', models.CharField(blank=True, max_length=70, null=True, verbose_name='Short Title')),
            ],
        ),
    ]
