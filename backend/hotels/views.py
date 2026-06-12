from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Hotel, Room
from .serializers import HotelSerializer, RoomSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hotel_list(request):

    hotels = Hotel.objects.all()

    serializer = HotelSerializer(
        hotels,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def room_list(request, hotel_id):

    rooms = Room.objects.filter(
        hotel_id=hotel_id
    )

    serializer = RoomSerializer(
        rooms,
        many=True
    )

    return Response(serializer.data)