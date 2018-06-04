from django.urls import path
from . import views

urlpatterns = [
    path('api/teams/', views.TeamListCreate.as_view() ),
]
