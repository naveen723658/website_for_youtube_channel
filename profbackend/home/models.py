from django.db import models

class Email(models.Model):
    email = models.EmailField(verbose_name=("Email Address"), unique=True, max_length=254)
    
class ContactNumber(models.Model):
    no = models.CharField(verbose_name=("Number"), max_length=15)

# Create your models here.
class Header(models.Model):
    logo = models.ImageField(verbose_name=("Logo"), upload_to="header/logo", height_field=None, width_field=None, max_length=None)
    favicon = models.ImageField(verbose_name=("Favicon"), upload_to="header/favicon", height_field=None, width_field=None, max_length=None)
    appointment = models.CharField(verbose_name=("Appointment Text"), max_length=150, default="Your Answer")
    
class Hero(models.Model):
    img = models.ImageField(verbose_name=("Crousel Image"), upload_to="Crousel", height_field=None, width_field=None, max_length=None)
    desc = models.CharField(verbose_name=("Short Title"), max_length=70, null=True, blank=True)
# class Category(models.Model):
#     text = models.CharField(verbose_name=("name"), max_length=50, unique=True)

# class Video(models.Model):
#     playlist = models.ForeignKey(Category, verbose_name=_("Category"), on_delete=models.CASCADE)
#     thumbnail = models.ImageField(verbose_name=("Thumbnail"), upload_to="video/thumbnail", height_field=None, width_field=None, max_length=None)
#     vid = models.FileField(verbose_name=("Video File"), upload_to="video", max_length=100)
#     path = models.URLField(verbose_name=("Youtube Embed Video Url"), max_length=200)
#     title = models.CharField(verbose_name=("Video Title"), max_length=50)
    