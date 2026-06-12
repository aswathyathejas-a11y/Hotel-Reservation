from django.urls import path

from .views import (
    hotel_list,
    room_list
)

urlpatterns = [

    path(
        'hotels/',
        hotel_list
    ),

    path(
        'rooms/<int:hotel_id>/',
        room_list
    ),

]