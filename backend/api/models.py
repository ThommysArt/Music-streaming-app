from django.db import models

# Create your models here.
from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='albums')
    cover_image = models.URLField(blank=True)

    def __str__(self):
        return f"{self.title} - {self.artist.name}"

class Track(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='tracks')
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='tracks')
    audio_file = models.URLField()

    def __str__(self):
        return f"{self.title} - {self.artist.name}"
