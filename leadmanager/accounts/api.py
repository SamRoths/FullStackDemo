from rest_framework import generics, permissions, viewsets, status,views
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegiseterSerializer,LoginSerializer,UserSettingsSerializer,AddressSerializer
from django.contrib.auth.models import User
from secretsanta.models import SSGroupUsers
from .models import UserSettings, Address

#register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegiseterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        user_settings_serializer = UserSettingsSerializer(data = {'user' :user,'address':{}},context={'request': request})
        if user_settings_serializer.is_valid():
            user_settings_serializer.save()
        else:
            return Response(user_settings_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "user":UserSerializer(user,context=self.get_serializer_context()).data, 
            "token":AuthToken.objects.create(user)[1]
        })
#Login API

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        return Response({
            "user":UserSerializer(user,context=self.get_serializer_context()).data, 
            "token":AuthToken.objects.create(user)[1]
        })
#Get User API

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
# Get Users list by group membership

class UsersInGroup(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_queryset(self):

        groupID = self.kwargs['groupid']
        return User.objects.filter(id__in=SSGroupUsers.objects.filter(group =groupID).values('user'))
    
#Update User

class UpdateUserAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
class GetUserSettingsAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSettingsSerializer

    def get_object(self):
        #using get or create since user settings were added later in development and not all users have settings associated with them
        return UserSettings.objects.get_or_create(user = self.request.user)[0]

class UpdateUserSettingsAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSettingsSerializer
    def get_object(self):
        return UserSettings.objects.get(user = self.request.user)