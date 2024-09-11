from django.urls import path
from .views import TrackList, TrackDetail, ArtistList, AlbumList

urlpatterns = [
    path('tracks/', TrackList.as_view(), name='track-list'),
    path('tracks/<int:pk>/', TrackDetail.as_view(), name='track-detail'),
    path('artists/', ArtistList.as_view(), name='artist-list'),
    path('albums/', AlbumList.as_view(), name='album-list'),
]