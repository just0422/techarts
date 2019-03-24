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

class SubQuestionView(generics.RetrieveAPIView):
    serializer_class=SubQuestionSerializer
    queryset=SubQuestion.objects.all()

class ChecklistItemView(generics.RetrieveUpdateAPIView):
    serializer_class=ChecklistItemSerializer

    def get_queryset(self):
        try:
            checklist_id = self.kwargs.get('checklist')
            checklist = Checklist.objects.get(id=checklist_id)

            question_id = self.kwargs.get('question')
            question = Question.objects.get(id=question_id)

            return ChecklistItem.objects.filter(
                checklist = Checklist.objects.get(id=self.kwargs.get('checklist')),
                question = Question.objects.get(id=self.kwargs.get('question'))
                )[:1]
        except Checklist.DoesNotExist:
            raise exceptions.NotFound('Checklist not found')
        except Question.DoesNotExist:
            raise exceptions.NotFound('Question not found')


    def get_object(self):
        if len(self.get_queryset()) == 0:
            ChecklistItem.objects.create(
                checklist = Checklist.objects.get(id=self.kwargs.get('checklist')),
                question = Question.objects.get(id=self.kwargs.get('question'))
            )

        queryset = self.get_queryset()
        return get_object_or_404(queryset)
    
    def update(self, *args, **kwargs):
        if len(self.get_queryset()) == 0:
            raise exceptions.NotFound('Checklist Item not found')
        checklist_item = self.get_queryset()[0]
        checklist_item.checked = bool(self.request.data['checked'])
        checklist_item.save()

        serializer = ChecklistItemSerializer(checklist_item)

        return Response(serializer.data)

class FixtureListView(generics.ListAPIView):
    serializer_class=FixtureSerializer
    
    def get_queryset(self):
        campus = self.kwargs.get('campus')
        group = self.kwargs.get('group')
        queryset = Fixture.objects.filter(campus=campus, group=group).order_by('name', 'channel')

        if len(queryset) == 0:
            raise exceptions.NotFound('No Fixtures found')
        return queryset

class FixtureView(generics.RetrieveUpdateAPIView):
    serializer_class=FixtureSerializer
    queryset = Fixture.objects.all()
