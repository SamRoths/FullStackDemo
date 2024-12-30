from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.

class SSGroup(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    name = models.CharField(max_length=100,blank=False,unique=True)
    description = models.CharField(max_length = 500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    recommended_price_min = models.IntegerField(default=0)
    recommended_price_max = models.IntegerField(default=0)
    members = models.ManyToManyField(User,through='SSGroupUsers',through_fields=('group','user'),blank=True)

    def __str__(self):
        return self.name

class SSGroupUsers(models.Model):
    group = models.ForeignKey(SSGroup,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    is_admin = models.BooleanField(default=False)
    join_date = models.DateTimeField(auto_now_add=True)
    giftee = models.ForeignKey(User,on_delete=models.SET_NULL,null=True, related_name="gifter")
    gift_preferences = models.CharField(max_length=500,blank=True)

    def __str__(self):
        return "{}: {}".format(self.group.name, self.user.username)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['group', 'user'], name='unique_relationship'),
        ]
    
