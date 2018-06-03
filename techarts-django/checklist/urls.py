from django.urls import path
from . import views

urlpatterns = [
    path('api/checklist/', views.TeamListCreate.as_view() ),
]
