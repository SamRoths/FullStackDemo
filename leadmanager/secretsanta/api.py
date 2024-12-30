from leads.models import Lead
from rest_framework import viewsets, permissions,response,generics,status,views
from .serializers import SSGroupSerializer, ViewSSGroupUsersSerializer,CreateSSGroupUsersSerializer
from .models import SSGroup,SSGroupUsers
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
import random



class SSGroupViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SSGroupSerializer

    def get_queryset(self):
        return SSGroup.objects.filter(id__in = SSGroupUsers.objects.filter(user = self.request.user ).values('group').distinct())
    #def create(self, request, *args, **kwargs):
    #    resp = super().create(request, *args, **kwargs)
    #    print(resp.data)
    #    print(self.request.user)
    #    return resp

    def update(self, request, *args, **kwargs):
        pk = kwargs['pk']
        #print("group id: ",pk)
        try:
            group_users = SSGroupUsers.objects.filter(user=request.user).filter(group_id =pk)
        except SSGroupUsers.DoesNotExist:
            return response.Response({"details": "User must be a group admin to modify group"}, status=status.HTTP_401_UNAUTHORIZED)
        #print("group users: ",group_users)
        if(len(group_users)>0):
            group_user = group_users[0]
            #print("group user: ",group_user)
            if(group_user.is_admin):
                return super().update(request, *args, **kwargs)
            
        return response.Response({"details": "User must be a group admin to modify group"}, status=status.HTTP_401_UNAUTHORIZED)
    def destroy(self, request, *args, **kwargs):
        pk = kwargs['pk']
        #print("group id: ",pk)
        try:
            group_users = SSGroupUsers.objects.filter(user=request.user).filter(group_id =pk)
        except SSGroupUsers.DoesNotExist:
            return response.Response({"details": "User must be a group admin to delete group"}, status=status.HTTP_401_UNAUTHORIZED)
        #print("group users: ",group_users)
        if(len(group_users)>0):
            group_user = group_users[0]
            #print("group user: ",group_user)
            if(group_user.is_admin):
                return super().destroy(request, *args, **kwargs)
            
        return response.Response({"details": "User must be a group admin to delete group"}, status=status.HTTP_401_UNAUTHORIZED)
    def create(self,request,*args,**kwargs):
        group_serializer = self.serializer_class(data=request.data)
        if not group_serializer.is_valid():
            return response.Response(group_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        group_serializer.save()
        init_group_user_data = {
            'group':group_serializer.data['id'],
            'user':self.request.user.id,
            'is_admin':True
        }
        user_serializer = CreateSSGroupUsersSerializer(data = init_group_user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return response.Response(group_serializer.data,status=status.HTTP_201_CREATED)
        else:
            return response.Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            

    
class ViewSSGroupUsersAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ViewSSGroupUsersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'group']

    def get_queryset(self):
        return SSGroupUsers.objects.all()
    


class UpdateSSGroupUsersAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ViewSSGroupUsersSerializer
    lookup_field = 'group'
    def get_queryset(self):
        return SSGroupUsers.objects.filter(user = self.request.user)

 #helper function to make sure no user is their own secret santa
def is_derangement(list1,list2):
    if len(list1)!=len(list2):
        return False
    for i in range(len(list1)):
        if(list1[i]==list2[i]):
            return False
    return True
  
class AssignSecretSantasAPI(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

   

    def patch(self,request, *args, **kwargs):
        pk = kwargs['pk']
        #print("group id: ",pk)
        group_users = None
        try:
            group_users = SSGroupUsers.objects.filter(user=request.user).filter(group_id =pk)
        except SSGroupUsers.DoesNotExist:
            return response.Response({"details": "User must be a group admin to modify group"}, status=status.HTTP_401_UNAUTHORIZED)
        group_user = group_users[0]
        if not group_user.is_admin:
            return response.Response({"details": "User must be a group admin to modify group"}, status=status.HTTP_401_UNAUTHORIZED)
        
        group_members = list(SSGroup.objects.get(id = pk).members.values())
        giftees = group_members.copy()
        while(not is_derangement(group_members,giftees)):
            random.shuffle(giftees)
        #we store serializers in an array and check if all are valid first in case one goes wrong we dont want to only update some of the users
        serializer_list = []
        for i in range(len(group_members)):
            req_data = {
                "giftee":giftees[i]['id']
            }
            serializer =CreateSSGroupUsersSerializer(SSGroupUsers.objects.filter(group_id = pk).get(user_id=group_members[i]['id']),data=req_data,partial=True)
            if serializer.is_valid():
                serializer_list.append(serializer)
            else:
                return response.Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        responses = []
        for serializer in serializer_list:
            serializer.save()
            responses.append(serializer.data)
        return response.Response(responses, status=status.HTTP_200_OK)
        
    
class InviteUserAPI(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, format=None):
        #check if user who sent request is a member of the group
        print("data: ",request.data)
        group_users = None
        try:
            group_users = SSGroupUsers.objects.filter(user = self.request.user).filter(group=request.data['group'])
        except SSGroupUsers.DoesNotExist:
            return response.Response({"details":"Must be a member of the group to send an invite"})
    
        #check if user is in group
        invited_user = None
        try:
            invited_user = User.objects.get(username=request.data['username'])
        except User.DoesNotExist:
            return response.Response({"username":["No such user exists"]},status=status.HTTP_400_BAD_REQUEST)
  
        #Serialize data for new Group User
        new_group_user_data = {
            "user": invited_user.id,
            "group": SSGroup.objects.get(id = request.data['group']).id,
            "is_admin": False
        }
        serializer = CreateSSGroupUsersSerializer(data = new_group_user_data)
        #check if group user is valid
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return response.Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


#Promote User to Admin
class PromoteUserAdminAPI(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def patch(self,request,*args,**kwargs):
        #check if user sending the request is an admin
        selfUser = None
        try:
            selfUser = SSGroupUsers.objects.filter(group_id = request.data["group"]).get(user = self.request.user)
        except SSGroupUsers.DoesNotExist:
            return response.Response({"details":"Must be a member of the group to promote another user to admin"})
        if not selfUser.is_admin:
            return response.Response({"details":"Must be an admin of the group to promote another user to admin"})
        #Get other user and check if they are a member of the group
        otherUser = None
        try:
            otherUser = SSGroupUsers.objects.filter(group_id = request.data["group"]).get(user_id = request.data["user"])
        except SSGroupUsers.DoesNotExist:
            return response.Response({"details":"User must be a member of the group to be promoted to admin"})
        
        updateData = {"is_admin":True}
        serializer= CreateSSGroupUsersSerializer(otherUser,data=updateData,partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return response.Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#helper function to test if user is the only admin to ensure a group is not orphaned with no admins

def is_last_admin(group_id,user_id):
    try:
        admin_users = SSGroupUsers.objects.filter(group_id=group_id).filter(is_admin=True)
        #cant be last admin if there is more than 1
        if len(admin_users)>1:
            return False
        else: 
            #check if user is an admin
            #if user is not admin go to except-> return False
            try:
                user_admin = admin_users.filter(user_id = user_id)
                return True
            except SSGroupUsers.DoesNotExist:
                return False
    except SSGroupUsers.DoesNotExist:
        return False


#Remove User From Group

class RemoveGroupUserAPI(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def delete(self,request,*args,**kwargs):
        group_id = kwargs['group']
        user_id = kwargs['user']
        self_user = SSGroupUsers.objects.filter(group_id=group_id).get(user=self.request.user)
        if self_user.is_admin or self_user.user.id==user_id:
            if not is_last_admin(group_id,user_id):
                delObj = SSGroupUsers.objects.filter(group_id = group_id).get(user_id=user_id)
                #set any giftee references to be null
                try:
                    gifter = SSGroupUsers.objects.filter(group_id = group_id).get(giftee_id=user_id)
                    updateInfo = {'giftee':None}
                    serializer = CreateSSGroupUsersSerializer(gifter,data=updateInfo,partial=True)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return response.Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
                except SSGroupUsers.DoesNotExist:
                    #if user doesnt have a secret santa there is nothing to do...
                    pass

                delObj.delete()
                return response.Response(ViewSSGroupUsersSerializer(delObj).data,status=status.HTTP_200_OK)
            else:
                return response.Response({"details":"Cannot Remove last admin from a group"}, status=status.HTTP_409_CONFLICT)
        else:
            return response.Response({"details":"Must be an admin or self to remove a user from the group"},status=status.HTTP_401_UNAUTHORIZED)
    