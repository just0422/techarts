from django.urls import path
from . import views

app_name="checklist"
urlpatterns = [
    path('api/teams/', views.TeamList.as_view(), name="index" ),
    path('api/checklist/<int:team>/<str:name>/', views.ChecklistView.as_view(), name="checklist"),
]
