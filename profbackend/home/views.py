from django.shortcuts import render, HttpResponse
from .serializers import *
from rest_framework import viewsets, permissions
from decouple import config
import json
from django.http import JsonResponse
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from django.core.cache import cache
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import *


KEYLIST = config(
    "API_KEYS", default="", cast=lambda v: [i.strip() for i in v.split(",")]
)
CHANNEL_ID = config("CHANNEL_ID")
Time_slot = 60 * 60 * 24 # for 24 hours or 1 day

def check_api_key(api_key):
    try:
        print("I am executed")
        youtube = build("youtube", "v3", developerKey=api_key)
        request = (
            youtube.search().list(part="snippet", q="test", type="video").execute()
        )
        return True
    except HttpError as error:
        if error.resp.status in [400, 401, 403]:
            return False
        else:
            raise error


def get_api_key():
    print("I am call")
    for i in KEYLIST:
        boolean = check_api_key(i)
        if boolean == True:
            return i
            break
        else:
            continue
    return None

# Live video

def fetch_live_video(request):
    cache_key = "live_video"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build('youtube', 'v3', developerKey=api_key)
        request = youtube.search().list(
            part='id',
            type='video',
            eventType='live',
            channelId=CHANNEL_ID,
            videoDefinition='high',
            maxResults=1,
            fields='items(id(videoId))'
        )
        response = request.execute()
        cache.set(cache_key, response, 60 * 20 )        
    return JsonResponse(response)


# Video detail funtion
def video_detail_endpoint(request, video_id):
    cache_key = f"video_detail_endpoint_{video_id}"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        request = youtube.videos().list(
            id=video_id, part="snippet,statistics,localizations, contentDetails",
        )
        response = request.execute()
        cache.set(cache_key, response, Time_slot)
    return JsonResponse(response)

# related videos endpoint
def get_playlist_items(request, video_id):
    cache_key = f"get_playlist_items_{video_id}"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        request = youtube.search().list(
                relatedToVideoId = video_id,
                channelId=CHANNEL_ID,
                part="snippet, id",
                type ='video',
                maxResults=20
            )
        response = request.execute()
        cache.set(cache_key, response, Time_slot)
        
    videos = []
    for video in response["items"]:
        if video["snippet"]["channelId"] == CHANNEL_ID:
            videos.append(video)

    return JsonResponse({"items": videos})

def get_comments(request, video_id, nextPageToken):
    cache_key = f"get_comments_{video_id}_{nextPageToken}"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        request = youtube.commentThreads().list(
                part="snippet, replies",
                videoId=video_id,
                textFormat="plainText",
                maxResults=20,
                order = 'relevance',
                pageToken = nextPageToken
            )
        response = request.execute()
        cache.set(cache_key, response, Time_slot)

    comments = []

    for comment in response["items"]:
        replies = []
        if "replies" in comment:
            replies = [                
                    {"author": reply["snippet"]["authorDisplayName"],
                    "authorProfileImageUrl": reply["snippet"]["authorProfileImageUrl"],
                    "updatedAt": reply["snippet"]["updatedAt"],
                    "likeCount": reply["snippet"]["likeCount"],
                    "text": reply["snippet"]["textDisplay"]}
                for reply in comment["replies"]["comments"]
            ]
        comments.append({            
            "author": comment["snippet"]["topLevelComment"]["snippet"]["authorDisplayName"],
            "authorProfileImageUrl": comment["snippet"]["topLevelComment"]["snippet"]["authorProfileImageUrl"],
            "updatedAt": comment["snippet"]["topLevelComment"]["snippet"]["updatedAt"],
            "totalReplyCount": comment["snippet"]["totalReplyCount"],
            "likeCount": comment["snippet"]["topLevelComment"]["snippet"]["likeCount"],
            "text": comment["snippet"]["topLevelComment"]["snippet"]["textDisplay"],
            "replies": replies
        })
        encoded_token = response["nextPageToken"]
    return JsonResponse({"items": comments, "nextPageToken": encoded_token})


def get_channel_videos(request, page_token):
    cache_key = f"channel_videos_{page_token}"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        # Fetch video data
        video_request = youtube.search().list(
            part="id, snippet",
            channelId=CHANNEL_ID,
            maxResults=50,
            pageToken=page_token,
            order="date",            
        )
        page_response = video_request.execute()
        video_id = ','.join([i['id']['videoId'] for i in page_response['items']])
        # Fetch statistics data for each video
        statistics_request = youtube.videos().list(id=video_id, part="statistics")
        statistics_response = statistics_request.execute()

        video_items = page_response['items']
        video_stats = statistics_response['items']
        
        # Create a dictionary to map video IDs to statistics data
        video_stats_map = {item['id']: item for item in video_stats}

        # Add statistics data to each video item
        for item in video_items:
            video_id = item['id']['videoId']
            if video_id in video_stats_map:
                item['statistics'] = video_stats_map[video_id]
            else:
                item['statistics'] = {}
        

        response = {
            'items': video_items,
            'nextPageToken': page_response.get("nextPageToken", None)
        }
        cache.set(cache_key, json.dumps(response), Time_slot)
    else:
        response = json.loads(response)

    return JsonResponse(response)


def get_playlists_and_statistics(request):
    max_results = 5
    cache_key = f"get_playlists_and_statistics"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        playlists_request = youtube.playlists().list(
            channelId=CHANNEL_ID,
            maxResults=max_results,
            part="snippet,localizations,contentDetails",
        )
        playlists_response = playlists_request.execute()
        

        playlistsitems = []
        for ids in playlists_response['items']:
            playlist_items_request = youtube.playlistItems().list(
                playlistId=ids['id'], part="snippet, contentDetails",
                maxResults=8,
            )
            playlist_items_response = playlist_items_request.execute()
            playlistsitems.extend(playlist_items_response.get("items", []))


        video_id = ','.join([i['snippet']['resourceId']['videoId'] for i in playlistsitems])
        statistics_request = youtube.videos().list(id=video_id, part="statistics")
        statistics_response = statistics_request.execute()
        
        video_stats = statistics_response['items']

        video_stats_map = {item['id']: item for item in video_stats}

        # Add statistics data to each video item
        for item in playlistsitems:
            video_id = item['snippet']['resourceId']['videoId']
            if video_id in video_stats_map:
                item['statistics'] = video_stats_map[video_id]
            else:
                item['statistics'] = {}
        response = {
            'playlists':playlists_response,
            'playlistsitems': playlistsitems,
        }
        cache.set(cache_key, response, Time_slot)
    return JsonResponse(response)





def playlists_endpoint(request, page_token):
    cache_key = f"playlists_endpoint_{page_token}"
    response = cache.get(cache_key)
    if response is None:
        max_results = 6
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        playlist_request = youtube.playlists().list(
            channelId=CHANNEL_ID,
            maxResults=max_results,
            pageToken=page_token,
            part="snippet,localizations,contentDetails",
        )
        response = playlist_request.execute()
        cache.set(cache_key, response, Time_slot)
    return JsonResponse(response)


def stats(request):
    cache_key = "statistic"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        request = youtube.channels().list(
            part="brandingSettings, statistics, topicDetails", id=CHANNEL_ID
        )
        response = request.execute()
        cache.set(cache_key, response, 60 * 60)
    return JsonResponse(response)





def playlist_items_endpoint(request, playlist_id, max_results):
    cache_key = f"playlist_items_endpoint_{playlist_id}"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        request = youtube.playlistItems().list(
            playlistId=playlist_id, maxResults=max_results, part="snippet"
        )
        response = request.execute()
        cache.set(cache_key, response, Time_slot)
    return JsonResponse(response)


def video_statistics_endpoint(request, video_ids):
    cache_key = f"video_statistics_endpoint_{video_ids}"
    response = cache.get(cache_key)
    if response is None:
        api_key = get_api_key()
        youtube = build("youtube", "v3", developerKey=api_key)
        request = youtube.videos().list(id=video_ids, part="statistics")
        response = request.execute()
        cache.set(cache_key, response, 60 * 60)
    return JsonResponse(response)








class StotraAndStutiCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StotraAndStutiCategory.objects.all()
    serializer_class = StotraAndStutiCategorySerializer

class StotraAndStutiViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StotraAndStuti.objects.all()
    serializer_class = StotraAndStutiSerializer

class HeaderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Header.objects.all()
    serializer_class = HeaderSerializer


class ContactNumberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactNumber.objects.all()
    serializer_class = ContactNumberSerializer


class EmailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer


class CategorySerializerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class VideoSerializerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def list(self, request, *args, **kwargs):
        paginator = PageNumberPagination()
        paginator.page_size = 12 # 2 objects per page
        videos = self.queryset
        result_page = paginator.paginate_queryset(videos, request)
        serializer = self.serializer_class(result_page, many=True, context={'request': request})
        return paginator.get_paginated_response(serializer.data)
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]