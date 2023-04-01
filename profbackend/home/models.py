from django.db import models
from django.core.exceptions import ValidationError
import re
import os
from PIL import Image
class Email(models.Model):
    email = models.EmailField(verbose_name=("Email Address"), unique=True, max_length=100)
    def __str__(self):
        return self.email
    
class ContactNumber(models.Model):
    no = models.CharField(verbose_name=("Number"), max_length=15)
    def clean(self):
        super().clean()
        if not re.match(r'^\+91\d{10}$', self.no):
            raise ValidationError("Please enter a valid phone number in the format +91XXXXXXXXXX.")
    def __str__(self):
        return self.no

class Address(models.Model):
    address = models.TextField(verbose_name=("Address"))
    src = models.URLField(verbose_name=("Embeded URL"), max_length=200, help_text="Embeded Iframe src link")
# Create your models here.
class Header(models.Model):
    logo = models.ImageField(verbose_name=("Logo"), upload_to="header/logo", height_field=None, width_field=None, max_length=None)
    favicon = models.ImageField(verbose_name=("Favicon"), upload_to="header/favicon", height_field=None, width_field=None, max_length=None)
    appointment = models.CharField(verbose_name=("Appointment Text"), max_length=250, default="Your Answer")
    def clean(self):
        super().clean()
        if self.logo:
            # if self.logo.size > 250*250:
            #     raise ValidationError("The logo image size must be less than 250*250 pixels.")
            if not os.path.splitext(self.logo.name)[1] in ['.png', '.jpg', '.jpeg']:
                raise ValidationError("The logo image must be in PNG, JPG, or JPEG format.")
            if len(self.logo.name) > 20:
                raise ValidationError("The logo file name must be less than 20 characters.")
            if ' ' in self.logo.name:
                raise ValidationError("The logo file name cannot contain spaces.")
            image = Image.open(self.logo)
            if image.format not in ['PNG', 'JPEG', 'JPG']:
                raise ValidationError("The logo image must be in PNG, JPG, or JPEG format.")
        if self.favicon:
            # if self.favicon.size > 32*32:
            #     raise ValidationError("The favicon image size must be less than 32x32 pixels.")
            if not os.path.splitext(self.favicon.name)[1] in ['.png', '.jpg', '.jpeg']:
                raise ValidationError("The favicon image must be in PNG, JPG, or JPEG format.")
            if len(self.favicon.name) > 20:
                raise ValidationError("The favicon file name must be less than 20 characters.")
            if ' ' in self.favicon.name:
                raise ValidationError("The favicon file name cannot contain spaces.")
            image = Image.open(self.favicon)
            if image.format not in ['PNG', 'JPEG', 'JPG']:
                raise ValidationError("The favicon image must be in PNG, JPG, or JPEG format.")

    def __str__(self):
        return "Header"
class Hero(models.Model):
    img = models.ImageField(verbose_name=("Banner Image"), upload_to="Banner", height_field=None, width_field=None, max_length=None)
    desc = models.CharField(verbose_name=("Short Title"), max_length=70, null=True, blank=True)

class StotraAndStutiCategory(models.Model):
    title = models.CharField(verbose_name="Title", max_length=100, unique=True)
    desc = models.TextField(verbose_name="Short Description", max_length=500)
    def __str__(self):
        return self.title
    

class StotraAndStuti(models.Model):
    category = models.ForeignKey(StotraAndStutiCategory, verbose_name="category", on_delete=models.CASCADE)
    img = models.ImageField(verbose_name="Upload Image", upload_to="stotra", height_field=None, width_field=None, max_length=None)
    def __str__(self):
        return self.category.title + " | " + str(self.id)
    
class Category(models.Model):
    text = models.CharField(verbose_name=("name"), max_length=50, unique=True)
    def __str__(self):
        return self.text
    
class Video(models.Model):
    playlist = models.ForeignKey(Category, verbose_name=("Category"), on_delete=models.CASCADE)
    title = models.CharField(verbose_name=("Video Title"), max_length=50)
    thumbnail = models.ImageField(verbose_name="Thumbnail", upload_to="video/thumbnail",height_field=None, width_field=None, max_length=None)
    vid = models.FileField(verbose_name=("File"), upload_to="video", max_length=100, null=True, blank=True)
    path = models.URLField(verbose_name=("Youtube Embed Video Url"), max_length=200, null=True, blank=True, default='')
    desc = models.CharField(verbose_name=("Video Description"), max_length=50, null=True, blank=True)
    def __str__(self):
        return self.title + " | " + str(self.id)
    

class BaseForm(models.Model):
    name = models.CharField(verbose_name=("Full Name"), max_length=50)
    email = models.EmailField(verbose_name=("Email Address"), max_length=254)
    update_at = models.DateTimeField(verbose_name=("Date & Time"), auto_now_add=True)

    class Meta:
        abstract = True

class Comment(BaseForm):
    message = models.TextField(verbose_name=("Comment"))
    videoid = models.CharField(verbose_name=("Video ID"), max_length=50, default="None")
    def __str__(self):
        return self.name + " | " + self.email
    
class Appointment(BaseForm):
    phone = models.CharField(verbose_name=("Phone Number"), max_length=15)
    token = models.CharField(verbose_name=("Token"), max_length=50)
    date_time = models.DateTimeField(verbose_name=("Appointment Date & Time"), auto_now_add=False)
    message = models.TextField(verbose_name=("Message"))

class SocialLinks(models.Model):
    facebook = models.CharField(verbose_name=("Facebook Account"), max_length=254, null=True, blank=True)
    twitter = models.CharField(verbose_name=("Twitter Account"), max_length=254, null=True, blank=True)
    instagram = models.CharField(verbose_name=("Instagram Account"), max_length=254, null=True, blank=True)
    youtube = models.CharField(verbose_name=("Youtube Account"), max_length=254, null=True, blank=True)
    linkedin = models.CharField(verbose_name=("Linkedin Account"), max_length=254, null=True, blank=True)

class AboutUs(models.Model):
    about = models.TextField(verbose_name=("About"))
    img = models.ImageField(verbose_name=("Image"), upload_to=None, height_field=None, width_field=None, max_length=None)  
