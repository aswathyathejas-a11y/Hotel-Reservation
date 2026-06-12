from django.urls import path

from .views import (
    create_booking,
    my_bookings
)

urlpatterns = [

    path(
        'book-room/',
        create_booking
    ),

    path(
        'my-bookings/',
        my_bookings
    ),

]