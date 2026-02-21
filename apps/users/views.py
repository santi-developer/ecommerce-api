from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import RegisterSerializer, ProfileSerializer
from .models import Profile

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
    

