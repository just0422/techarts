from django.test import TestCase
from django.urls import reverse
from rest_framework import status

from ..views import *
from ..models import *

import json

class TeamListViewTests(TestCase):
    """
    Setup Team
    """
    @classmethod
    def setUpTestData(cls):
        Team.objects.create(team_name="A", campus="B")
        Team.objects.create(team_name="C", campus="D")
    
    """
    Check that all teams are returned"
    """
    def test_team_list(self):
        response = self.client.get(reverse("checklist:index"))

        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data, response.data)


class ChecklistViewTests(TestCase):
    """
    Setup Checklist
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="B")
        cls.checklist = Checklist.objects.create(person="ABC", team=cls.team)
    
    """
    Check that a new entry gets entered if the person is new
    """
    def test_get_new_checklist(self):
        checklists_old = Checklist.objects.all()
        
        response = self.client.get(reverse("checklist:checklist", kwargs={'team':"1", 'name':"XYZ"}))
        checklists_new = Checklist.objects.all()

        serializer = ChecklistSerializer(Checklist.objects.get(person="XYZ"))
        
        self.assertNotEqual(checklists_old, checklists_new)
        self.assertEqual(serializer.data, response.data)
    
    def test_get_existing_checklist(self):
        response = self.client.get(reverse("checklist:checklist", kwargs={'team':str(self.team.id), 'name': 'ABC'}))

        serializer = ChecklistSerializer(self.checklist)

        self.assertEqual(serializer.data, response.data)
