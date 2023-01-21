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
    path('latest_videos/', latest_videos_endpoint, name='latest_videos'),
    path('playlists/', playlists_endpoint, name='playlists'),
    path('playlist_items/<str:playlist_id>/<int:max_results>/', playlist_items_endpoint, name='playlist_items'),
    path('video_statistics/<str:video_ids>/', video_statistics_endpoint, name='video_statistics'),
    path('video_detail/<video_id>/',video_detail_endpoint, name='video_detail'),
    # path('playlists/<channel_id>/', playlists_endpoint, name='playlists'),
    # path('playlist_items/<playlist_id>/', playlist_items_endpoint, name='playlist_items'),
    path('comments/<video_id>/', comments_endpoint, name='comments'),
    path('comments_replies/<parent_id>/', comments_replies_endpoint, name='comments_replies'),
]
    # path('api-auth/', include('rest_framework.urls'))

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)