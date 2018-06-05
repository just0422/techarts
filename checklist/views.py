from django.shortcuts import render

from .models import *
from .serializers import *
from rest_framework import generics

# Create your views here.
class TeamListCreate(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
