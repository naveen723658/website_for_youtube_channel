from rest_framework import serializers
from .models import *

class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = ('id', 'logo', 'favicon','appointment')

class ContactNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactNumber
        fields = ('id', 'no')

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('id', 'email')

    