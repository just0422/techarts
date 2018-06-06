from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from ..views import *
from ..models import *

class TeamListViewTests(TestCase):
    """
    Setup Team
    """
    @classmethod
    def setUpTestData(cls):
        cls.abteam = Team.objects.create(team_name="A", campus="B")
        cls.cdteam = Team.objects.create(team_name="C", campus="D")

    def test_team_list(self):
        response = self.client.get(reverse("checklist:index"))

        teams = Team.objects.all
        serializer = TeamSerializer(teams, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)

