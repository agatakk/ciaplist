from django.urls import path, include
from userprofiles import views
urlpatterns = [
    path('', views.user_profile_show, name='show_profile'),
]