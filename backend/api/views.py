# In music_app/views.py
from rest_framework import generics, filters
from .models import Artist, Album, Track
from .serializers import ArtistSerializer, AlbumSerializer, TrackSerializer

class TrackList(generics.ListAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'artist__name']

class TrackDetail(generics.RetrieveAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

class ArtistList(generics.ListAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class AlbumList(generics.ListAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer