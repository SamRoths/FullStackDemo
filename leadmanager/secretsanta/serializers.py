from rest_framework import serializers
from secretsanta.models import SSGroup, SSGroupUsers
from accounts.serializers import UserSerializer

class CreateSSGroupUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = SSGroupUsers
        fields = '__all__'

class SSGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SSGroup
        fields = '__all__'
    
    def validate(self, data):
        if(not 'recommended_price_min' in data):
            return data
        if(not "recommended_price_max" in data):
            return data
        if(data['recommended_price_min']>data['recommended_price_max']):
            raise serializers.ValidationError("Min Price Must Be Less Than Max Price")
        return data

        

class ViewSSGroupUsersSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    giftee = UserSerializer()
    class Meta:
        model = SSGroupUsers
        fields = ['group','user','is_admin','join_date','giftee','gift_preferences']
        


 
    
        


    
