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

class StotraAndStutiCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StotraAndStutiCategory
        fields = ('id','title', 'desc')

class StotraAndStutiSerializer(serializers.ModelSerializer):
    category = StotraAndStutiCategorySerializer(read_only=True)

    class Meta:
        model = StotraAndStuti
        fields = ('id', 'category', 'img')

    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','text')
class VideoSerializer(serializers.ModelSerializer):
    playlist = CategorySerializer(read_only=True)
    thumbnail = serializers.SerializerMethodField()
    vid = serializers.SerializerMethodField()
    class Meta:
        model = Video
        fields = ('id', 'playlist', 'title', 'thumbnail', 'vid', 'path','desc')

    def get_thumbnail(self, obj):
        try:
            return self.context['request'].build_absolute_uri(obj.thumbnail.url) if obj.thumbnail else None
        except ValueError:
            return None

    def get_vid(self, obj):
        return self.context['request'].build_absolute_uri(obj.vid.url) if obj.vid else None
    
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'name', 'email', 'message', 'videoid' ,'update_at')
        extra_kwargs = {
            'update_at': {'read_only': True},
        }
        read_only_fields = ('id',)

    def create(self, validated_data):
        # print(validated_data)
        return Comment.objects.create(**validated_data)
