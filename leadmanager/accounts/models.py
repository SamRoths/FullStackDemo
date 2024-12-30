from django.db import models
from django.contrib.auth.models import User
import uuid


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Address(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    country = models.CharField(max_length=32,blank=True)
    state_province = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64, blank =True)
    postal_code = models.CharField(max_length=12,blank=True)
    street_line = models.CharField(max_length=64,blank=True)

    def __str__(self):
        raw_string = '{}{}{}{}{}'.format(self.street_line+', ' if self.street_line else '',
                            self.city+', ' if self.city else '',
                            self.state_province+', ' if self.state_province else '',
                            self.postal_code+', ' if self.postal_code else '',
                            self.country+', ' if self.country else '')
        #remove trailing ', '
        if(len(raw_string)>2):
            raw_string = raw_string[:len(raw_string)-2]
        return raw_string


# Create your models here.
class UserSettings(models.Model):
    user = models.OneToOneField(User,primary_key=True, on_delete=models.CASCADE,blank=True, related_name='settings')
    profile_picture = models.ImageField(upload_to=upload_to, blank=True, null=True)
    address = models.OneToOneField(Address, on_delete=models.SET_NULL, blank=True, null=True)
    phone_number = models.CharField(max_length=32,blank=True)