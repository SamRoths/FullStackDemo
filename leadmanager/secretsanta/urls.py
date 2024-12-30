from rest_framework import routers
from .api import SSGroupViewSet,ViewSSGroupUsersAPI,UpdateSSGroupUsersAPI,InviteUserAPI,AssignSecretSantasAPI,PromoteUserAdminAPI,RemoveGroupUserAPI
from django.urls import path

router = routers.DefaultRouter()
router.register('api/secretsanta/group',SSGroupViewSet,'group')


urlpatterns = router.urls

urlpatterns.append(path('api/secretsanta/groupuser/', ViewSSGroupUsersAPI.as_view()))
urlpatterns.append(path('api/secretsanta/groupuser/<uuid:group>', UpdateSSGroupUsersAPI.as_view()))
urlpatterns.append(path('api/secretsanta/groupuser/invite',InviteUserAPI.as_view()))
urlpatterns.append(path('api/secretsanta/group/<uuid:pk>/assign',AssignSecretSantasAPI.as_view()))
urlpatterns.append(path('api/secretsanta/groupuser/promote', PromoteUserAdminAPI.as_view()))
urlpatterns.append(path('api/secretsanta/groupuser/<uuid:group>/<int:user>', RemoveGroupUserAPI.as_view()))

