from django.urls import path
from .views import *

app_name="checklist"
urlpatterns = [
    path('api/teams/', TeamListView.as_view(), name="index" ),
    path('api/checklist/<str:name>/<int:team>/', ChecklistView.as_view(), name="checklist"),
    path('api/sections/<int:team>/', SectionView.as_view(), name="sections"),
    path('api/questions/<int:team>/', QuestionView.as_view(), name="questions"),
    path('api/checklist_item/<int:checklist>/<int:question>/', ChecklistItemView.as_view(), name="checklist_item"),
    path('api/subquestion/<int:pk>/', SubQuestionView.as_view(), name="subquestion"),
    path('api/fixture/<int:pk>/', FixtureView.as_view(), name="fixture"),
    path('api/fixtures/<str:campus>/<str:group>/', FixtureListView.as_view(), name="fixtures"),
]
