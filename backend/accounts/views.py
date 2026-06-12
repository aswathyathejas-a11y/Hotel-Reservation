from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({
            "error": "Username already exists"
        })

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response({
        "message": "User Registered Successfully"
    })


@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    try:

        user = User.objects.get(
            username=username
        )

        if not user.check_password(password):

            return Response({
                "error": "Invalid Password"
            }, status=401)

        refresh = RefreshToken.for_user(user)

        return Response({

            "refresh": str(refresh),

            "access": str(
                refresh.access_token
            ),

            "username": user.username

        })

    except User.DoesNotExist:

        return Response({
            "error": "User Not Found"
        }, status=404)