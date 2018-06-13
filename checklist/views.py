from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response

from .models import *
from .serializers import *

import datetime

# Gather all teams
class TeamList(generics.ListAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

# Get or create a checklist for today
class ChecklistView(generics.RetrieveAPIView):
    serializer_class = ChecklistSerializer

    def get_queryset(self):
        return Checklist.objects.filter(
            person = self.kwargs.get('name'),
            team = Team.objects.get(id=self.kwargs.get('team'))
        )

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
        return Section.objects.filter(team = Team.objects.get(id=self.kwargs.get('team')))

# Return all questions (with team)

# View
# Create all checklist items
