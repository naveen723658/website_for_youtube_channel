# Generated by Django 4.1.5 on 2023-04-01 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0006_comment_videoid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="stotraandstuticategory",
            name="desc",
            field=models.TextField(max_length=500, verbose_name="Short Description"),
        ),
        migrations.AlterField(
            model_name="stotraandstuticategory",
            name="title",
            field=models.CharField(max_length=100, unique=True, verbose_name="Title"),
        ),
    ]
