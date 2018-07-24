from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory

from ..views import *
from ..models import *

import json

factory = APIRequestFactory()
class TeamListViewTest(TestCase):
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
        #response = self.client.get(reverse("checklist:index"))
        view = TeamListView.as_view()

        request = factory.get(reverse("checklist:index"))
        response = view(request)
        
        # Get all teams
        teams = Team.objects.all()
        serializer = TeamSerializer(teams, many=True)
        
        # Check response status code and data
        self.assertEqual(serializer.data, response.data)


class ChecklistViewTests(TestCase):
    """
    Setup Checklist and associated team
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="B")
        cls.checklist = Checklist.objects.create(person="ABC", team=cls.team)
    
    """
    Check that a new checklist gets entered if the person is new
    """
    def test_create_new_checklist_when_requested_checklist_does_not_exist(self):
        view = ChecklistView.as_view()
        arguments = {
            'team': str(self.team.id),
            'name': "XYZ"
        }
        
        # Gather checklists before request
        checklists_old = Checklist.objects.all()
        
        # Request new checklist
        request = factory.get(reverse("checklist:checklist", kwargs=arguments))
        response = view(request, **arguments)

        # Gather all checklists
        checklist_new = Checklist.objects.get(person="XYZ")
        serializer = ChecklistSerializer(checklist_new)
        
        # Verify that there was a change and that the change was correct
        checklists_new = Checklist.objects.all()
        self.assertNotEqual(checklists_old, checklists_new)
        self.assertEqual(serializer.data, response.data)
    
    """
    Check that an checklist can be retrieved if it exists
    """
    def test_get_existing_checklist(self):
        view = ChecklistView.as_view()
        arguments = {
            'team': str(self.team.id),
            'name': "ABC"
        }
        
        # Request current checklist
        request = factory.get(reverse("checklist:checklist", kwargs=arguments))
        response = view(request, **arguments)
        
        # Verify that the checklist created during setup exists
        serializer = ChecklistSerializer(self.checklist)
        self.assertEqual(serializer.data, response.data)

class SectionViewTests(TestCase):
    """
    Setup Section
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="C")
        cls.section = Section.objects.create(section_name="1", page_number=1, team=cls.team)

    """
    Check that a section can be retrieved if it exists
    """
    def test_get_section(self):
        view = SectionView.as_view()
        arguments = {
            'team': str(self.team.id)
        }
        
        # Get section
        request = factory.get(reverse("checklist:sections", kwargs=arguments))
        response = view(request, **arguments)
        section = response.data[0]
        
        # Comepare to section created in setup
        serializer = SectionSerializer(self.section)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(serializer.data, section)

class QuestionsViewTests(TestCase):
    """
    Setup Question
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="C")
        cls.section = Section.objects.create(section_name="1", page_number=1, team=cls.team)
        cls.question = Question.objects.create(question_text="ABC", section=cls.section, team=cls.team)

    """
    Check that a question can be retrieved if it exists
    """
    def test_get_question(self):
        response = self.client.get(reverse("checklist:questions", kwargs={'team':str(self.team.id)}))

        serializer = QuestionSerializer(self.question)
        question = response.data[0]

        self.assertEqual(len(response.data), 1)
        self.assertEqual(serializer.data, question)

class ChecklistItemViewTests(TestCase):
    """
    Setup Checklist Item
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="C")
        cls.section = Section.objects.create(section_name="1", page_number=1, team=cls.team)
        cls.question1 = Question.objects.create(question_text="ABC", section=cls.section, team=cls.team)
        cls.question2 = Question.objects.create(question_text="DEF", section=cls.section, team=cls.team)
        cls.checklist = Checklist.objects.create(person="GHI", team=cls.team)
        cls.checklistitem = ChecklistItem.objects.create(checklist=cls.checklist, question=cls.question1)
        cls.factory = APIRequestFactory()
    
    """
    Check that a checklist item can be created if it doesn't exist
    """
    def test_get_new_checklist_item(self):
        checklist_items_old = ChecklistItem.objects.all()

        response = self.client.get(reverse("checklist:checklist_item", kwargs={'checklist':str(self.checklist.id), 'question':str(self.question2.id)}))

        checklist_items_new = ChecklistItem.objects.all()
        
        serializer = ChecklistItemSerializer(ChecklistItem.objects.get(checklist=self.checklist, question=self.question2))

        self.assertNotEqual(checklist_items_old, checklist_items_new)
        self.assertEqual(serializer.data, response.data)
    
    """
    Check that a checklist item can be retrieved if it doesn't exist
    """
    def test_get_existing_checklist_item(self):
        view = ChecklistItemView.as_view()
        request = factory.get(reverse("checklist:checklist_item", kwargs={'checklist':str(self.checklist.id), 'question':str(self.question1.id)}))
        
        kwargs={'checklist':str(self.checklist.id), 'question':str(self.question1.id)}
        response = view(request, **kwargs)
        
        serializer = ChecklistItemSerializer(self.checklistitem)

        self.assertEqual(serializer.data, response.data)

    """
    Check that a checklist item can be updated
    ""
    def test_update_checklist_item(self):
        print (self.checklistitem.checked)
        view = ChecklistItemView.as_view()
        request = factory.put(reverse("checklist:checklist_item", kwargs={'checklist':str(self.checklist.id), 'question':str(self.question1.id)}), data={"checked":"true"})

        response = view(request)
        
        print (self.checklistitem.checked)
        print (ChecklistItem.objects.get(id=self.checklistitem.id).checked)

    #def test_update_checklist_item_that_doesnt_exist(self):
    """
