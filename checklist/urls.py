from django.urls import path
from . import views

app_name="checklist"
urlpatterns = [
    path('api/teams/', views.TeamList.as_view(), name="index" ),
    path('api/checklist/<str:name>/<int:team>/', views.ChecklistView.as_view(), name="checklist"),
]
