from django.db import models


class Hotel(models.Model):

    hotel_name = models.CharField(
        max_length=100
    )

    location = models.CharField(
        max_length=100
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to='hotels/'
    )

    rating = models.FloatField(
        default=0
    )

    def __str__(self):

        return self.hotel_name


class Room(models.Model):

    hotel = models.ForeignKey(
        Hotel,
        on_delete=models.CASCADE,
        related_name='rooms'
    )

    room_type = models.CharField(
        max_length=100
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    image = models.ImageField(
        upload_to='rooms/'
    )

    is_available = models.BooleanField(
        default=True
    )

    def __str__(self):

        return self.room_type