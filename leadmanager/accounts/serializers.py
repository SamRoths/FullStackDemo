from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Address,UserSettings

#User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','first_name','last_name')

#Register Serializer

class RegiseterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','password')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
        return user
    
#login Serializer

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
    
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id','street_line','city','state_province','postal_code','country']

    def validate_postal_code(self,value):
        for char in value:
            if char<48 or char>57:
                raise serializers.ValidationError("Postal code contains non-integer characters")
        return value

class UserSettingsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default = serializers.CurrentUserDefault())
    address = AddressSerializer()
    class Meta:
        model= UserSettings
        fields = ['user','profile_picture','address','phone_number']
    
    def create(self,validated_data):
        try:
            address_data = validated_data.pop('address')
            address = Address.objects.create(**address_data)
            user_settings = UserSettings.objects.create(address=address,**validated_data)
            return user_settings
        except KeyError:
            user_settings = UserSettings.objects.create(**validated_data)
            return user_settings
    
    def update(self, instance, validated_data):
        try:
            address_data = validated_data.pop('address')
            print('address data: ',address_data)
            address = instance.address
            if address:
                address.street_line = address_data.get('street_line',address.street_line)
                address.city = address_data.get('city',address.city)
                address.state_province = address_data.get('state_province',address.state_province)
                address.postal_code = address_data.get('postal_code',address.postal_code)
                address.country = address_data.get('country',address.country)
                address.save()
            else:
                address = Address.objects.create(**address_data)
                address.save()
                instance.address = address
        except KeyError:
            print("key error oops")
            pass
        instance.profile_picture = validated_data.get('profile_picture',instance.profile_picture)
        instance.phone_number = validated_data.get('phone_number',instance.phone_number)
        instance.save()
        return instance
    
    def validate_phone_number(self,value):
        for char in value:
            if char<48 or char>57:
                raise serializers.ValidationError("Phone number contains non-integer characters")
        return value

