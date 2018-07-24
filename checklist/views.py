from django.shortcuts import get_object_or_404
from rest_framework import generics, exceptions
from rest_framework.response import Response

from .models import *
from .serializers import *

import datetime

# Gather all teams
class TeamListView(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

# Get or create a checklist for today
class ChecklistView(generics.RetrieveAPIView):
    serializer_class = ChecklistSerializer

    def get_queryset(self):
        return Checklist.objects.filter(
            person = self.kwargs.get('name'),
            team = Team.objects.get(id=self.kwargs.get('team')),
            date = datetime.datetime.today()
            )[:1]

    def get_object(self):
        if len(self.get_queryset()) == 0:
            Checklist.objects.create(
                person = self.kwargs.get('name'),
                team = Team.objects.get(id=self.kwargs.get('team'))
            )

        queryset = self.get_queryset()
        return get_object_or_404(queryset)

# Get all sections for this team
class SectionView(generics.ListAPIView):
    serializer_class=SectionSerializer

    def get_queryset(self):
        try:
            team_id = self.kwargs.get('team')
            team = Team.objects.get(id=team_id)
            return Section.objects.filter(team=team).order_by('page_number')
        except Section.DoesNotExist:
            raise exceptions.NotFound('Section not found')
        except Team.DoesNotExist:
            raise exceptions.NotFound('Team not found')

class QuestionView(generics.ListAPIView):
    serializer_class=QuestionSerializer
    
    def get_queryset(self):
        try:
            team_id = self.kwargs.get('team')
            team = Team.objects.get(id=team_id)
            return Question.objects.filter(team=team).order_by('section', 'question_number')
        except Question.DoesNotExist:
            raise exceptions.NotFound('Question not found')
        except Team.DoesNotExist:
            raise exceptions.NotFound('Team not found')

class ChecklistItemView(generics.RetrieveUpdateAPIView):
    serializer_class=ChecklistItemSerializer

    def get_queryset(self):
        return ChecklistItem.objects.filter(
            checklist = Checklist.objects.get(id=self.kwargs.get('checklist')),
            question = Question.objects.get(id=self.kwargs.get('question'))
            )[:1]

    def get_object(self):
        if len(self.get_queryset()) == 0:
            ChecklistItem.objects.create(
                checklist = Checklist.objects.get(id=self.kwargs.get('checklist')),
                question = Question.objects.get(id=self.kwargs.get('question'))
            )

        queryset = self.get_queryset()
        return get_object_or_404(queryset)
    
    def update(self, *args, **kwargs):
        checklist_item = self.get_queryset()[0]
        checklist_item.checked = bool(self.request.data['checked'])
        checklist_item.save()

        serializer = ChecklistItemSerializer(checklist_item)

        return Response(serializer.data)

