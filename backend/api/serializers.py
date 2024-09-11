# In music_app/serializers.py
from rest_framework import serializers
from .models import Artist, Album, Track

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']

class AlbumSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)

    class Meta:
        model = Album
        fields = ['id', 'title', 'artist', 'cover_image']

class TrackSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)
    album = AlbumSerializer(read_only=True)

    class Meta:
        model = Track
        fields = ['id', 'title', 'artist', 'album', 'audio_file']