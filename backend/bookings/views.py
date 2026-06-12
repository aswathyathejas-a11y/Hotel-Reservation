from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from .models import Booking
from .serializers import BookingSerializer


from hotels.models import Room

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):

    room_id = request.data.get('room')

    try:
        room = Room.objects.get(id=room_id)

        if room.is_available == False:

            return Response({
                "message": "Room Already Booked"
            }, status=400)

        data = request.data.copy()

        data['user'] = request.user.id

        serializer = BookingSerializer(data=data)

        if serializer.is_valid():

            serializer.save()

            room.is_available = False
            room.save()

            return Response({
                "message": "Room Booked Successfully"
            })

        return Response(serializer.errors)

    except Room.DoesNotExist:

        return Response({
            "message": "Room Not Found"
        }, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):

    bookings = Booking.objects.filter(
        user=request.user
    )

    serializer = BookingSerializer(
        bookings,
        many=True
    )

    return Response(serializer.data)