# Generated by Django 4.1.5 on 2023-02-04 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("home", "0004_stotraandstuticategory"),
    ]

    operations = [
        migrations.CreateModel(
            name="StotraAndStuti",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "img",
                    models.ImageField(upload_to="stotra", verbose_name="Upload Image"),
                ),
            ],
        ),
    ]