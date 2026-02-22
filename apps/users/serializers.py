from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Profile

class RegisterSerializer (serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators = [validate_password])
    password2 = serializers.CharField(write_only = True)

    class Meta :
        model = User
        fields = ['email','username',
                  'password', 'password2']


    def validate ( self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Las contraseñas no coinciden'})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role']
        read_only_fields = ['role']

class ProfileSerializer (serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields=['user', 'phone', 'address', 'avatar']
        