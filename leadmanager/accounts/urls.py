from django.urls import path,include, re_path
from .api import RegisterAPI,LoginAPI,UserAPI,UsersInGroup,UpdateUserAPI,GetUserSettingsAPI,UpdateUserSettingsAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/signin', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout',knox_views.LogoutView.as_view(),name='knox_logout'),
    path('api/auth/user/update', UpdateUserAPI.as_view()),
    path('api/auth/user/settings/update', UpdateUserSettingsAPI.as_view()),
    path('api/auth/user/settings',GetUserSettingsAPI.as_view()),
    re_path('^api/secretsanta/group/users/(?P<groupid>.+)/$', UsersInGroup.as_view()),
]
