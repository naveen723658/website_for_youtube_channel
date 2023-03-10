"""profbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , include
from django.conf import settings
from django.conf.urls.static import static
from home.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', include('home.urls')),
    path('playlists/<page_token>/', playlists_endpoint),
    # related video
    path('playlistsitem/<video_id>/', get_playlist_items),
    path('comments/<video_id>/', get_comments, kwargs={'nextPageToken':None}),
    path('comments/<video_id>/nextPageToken', get_comments),

    path('playlists/', playlists_endpoint, name='playlists',kwargs={'page_token':None}),
    path('playlist_items/<str:playlist_id>/<int:max_results>/', playlist_items_endpoint, name='playlist_items'),
    path('video_statistics/<str:video_ids>/', video_statistics_endpoint, name='video_statistics'),

    # Detail video 
    path('video_detail/<video_id>/',video_detail_endpoint, name='video_detail'),
    # 

    path('statistic/', stats, name='statistic'),

    # all video route 
    path('channel_videos/<page_token>', get_channel_videos ),
    path('channel_videos/', get_channel_videos, kwargs={'page_token':None}),
    path('live',fetch_live_video),
    path('combine_data/', get_playlists_and_statistics, name='get_playlists_and_statistics'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)