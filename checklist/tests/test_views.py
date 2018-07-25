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
        view = TeamListView.as_view()
        
        # Get all teams through view
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
        
        # Compare to section created in setup
        serializer = SectionSerializer(self.section)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(serializer.data, section)

    """
    Check that a section cannot be retrieved if it doesn't exist
    """
    def test_get_section_with_a_team_that_does_not_exist(self):
        view = SectionView.as_view()
        arguments = {
            'team': str(self.team.id + 100)
        }
        
        # Get section
        request = factory.get(reverse("checklist:sections", kwargs=arguments))
        response = view(request, **arguments)
        
        # Verify error response
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class QuestionsViewTests(TestCase):
    """
    Setup Question
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="C")
        cls.section = Section.objects.create(section_name="1", page_number=1, team=cls.team)
        cls.question = Question.objects.create(question_text="ABC", section=cls.section, team=cls.team)
        cls.subquestion = SubQuestion.objects.create(title="DEF", category="GHI", question=cls.question)

    """
    Check that a question can be retrieved if it exists
    """
    def test_get_question(self):
        view = QuestionView.as_view()
        arguments = {
            'team': str(self.team.id)
        }
        
        # Get question
        request = factory.get(reverse("checklist:questions", kwargs=arguments))
        response = view(request, **arguments)
        question = response.data[0]
        
        # Compare to question created in setup
        serializer = QuestionSerializer(self.question)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(serializer.data, question)

    """
    Check that a question cannot be retrieved if it doesn't exist
    """
    def test_get_question_with_a_team_that_does_not_exist(self):
        view = QuestionView.as_view()
        arguments = {
            'team': str(self.team.id + 100)
        }
        
        # Get question
        request = factory.get(reverse("checklist:questions", kwargs=arguments))
        response = view(request, **arguments)
        
        # Verify error response
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

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
    
    """
    Check that a checklist item can be created if it doesn't exist
    """
    def test_get_new_checklist_item(self):
        view = ChecklistItemView.as_view()
        arguments = {
            'checklist': str(self.checklist.id),
            'question': str(self.question2.id)
        }

        # Gather checklists items before request
        checklist_items_old = ChecklistItem.objects.all()
        
        # Request new checklist item
        request = factory.get(reverse("checklist:checklist_item", kwargs=arguments))
        response = view(request, **arguments)
        
        # Gather newly created checklist item again
        checklist = self.checklist
        question = self.question2
        checklist_item = ChecklistItem.objects.get(checklist=checklist, question=question)
        serializer = ChecklistItemSerializer(checklist_item)

        # Verify that there was a change and that the change was correct
        checklist_items_new = ChecklistItem.objects.all()
        self.assertNotEqual(checklist_items_old, checklist_items_new)
        self.assertEqual(serializer.data, response.data)
    
    """
    Check that a checklist item can be retrieved if it doesn't exist
    """
    def test_get_existing_checklist_item(self):
        view = ChecklistItemView.as_view()
        arguments = {
            'checklist': str(self.checklist.id),
            'question': str(self.question1.id)
        }
        
        # Request existing checklist item
        request = factory.get(reverse("checklist:checklist_item", kwargs=arguments))
        response = view(request, **arguments)
        
        # Verify that the checklist item is correct
        serializer = ChecklistItemSerializer(self.checklistitem)
        self.assertEqual(serializer.data, response.data)

    """
    Check that a checklist item can be updated
    """
    def test_update_checklist_item(self):
        view = ChecklistItemView.as_view()
        arguments = {
            'checklist': str(self.checklist.id),
            'question': str(self.question1.id)
        }
        params = {
            'checked': 'true'
        }
        
        # Attempt to update checklist item
        request = factory.put(reverse("checklist:checklist_item", kwargs=arguments), data=params)
        response = view(request, **arguments)

        # Verify that the checklist item was changed and correct response returned
        checklistitem = ChecklistItem.objects.get(id=self.checklistitem.id)
        update_checklistitem = ChecklistItemSerializer(checklistitem)
        test_checklistitem = ChecklistItemSerializer(self.checklistitem)
        self.assertNotEqual(test_checklistitem.data, update_checklistitem.data)
        self.assertNotEqual(test_checklistitem.data, response.data)
        self.assertEqual(update_checklistitem.data, response.data)
    
    """
    Check that a checklist item that doesn't exist can't be updated
    """
    def test_update_checklist_item_that_doesnt_exist(self):
        view = ChecklistItemView.as_view()
        arguments = {
            'checklist': str(self.checklist.id),
            'question': str(self.question2.id)
        }
        params = {
            'checked': 'true'
        }
        
        # Attempt to update checklist item
        request = factory.put(reverse("checklist:checklist_item", kwargs=arguments), data=params)
        response = view(request, **arguments)

        # Verify error response
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class SubQuestionViewTests(TestCase):
    """
    Setup Subquestion Item
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team.objects.create(team_name="A", campus="C")
        cls.section = Section.objects.create(section_name="1", page_number=1, team=cls.team)
        cls.question = Question.objects.create(question_text="ABC", section=cls.section, team=cls.team)
        cls.subquestion = SubQuestion.objects.create(title="DEF", category="GHI", question=cls.question)

    """
    Check that a subquestion can be retrieved if it exists
    """
    def test_get_subquestion(self):
        view = SubQuestionView.as_view()
        subquestion_id = self.subquestion.id
        arguments={
            'pk': subquestion_id
        }
        
        # Query for subquestion
        request = factory.get(reverse("checklist:subquestion", kwargs=arguments))
        response = view(request, **arguments)

        # Verify that the subquestion exists
        serializer = SubQuestionSerializer(self.subquestion)
        self.assertEqual(serializer.data, response.data)

    """
    Check that a subquestion that doesn't exist can't be retrieved
    """
    def test_get_subquestion_that_doesnt_exist(self):
        view = SubQuestionView.as_view()
        subquestion_id = self.subquestion.id
        arguments={
            'pk': subquestion_id + 100
        }
        
        # Query for subquestion
        request = factory.get(reverse("checklist:subquestion", kwargs=arguments))
        response = view(request, **arguments)
        
        # Verify error response
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class FixtureViewTests(TestCase):
    """
    Setup Fixture
    """
    @classmethod
    def setUpTestData(cls):
        cls.fixture = Fixture.objects.create(campus="A", channel=1, name="A", group="A")

    """
    Check that a fixture can be retrieved if it exists
    """
    def test_get_fixture(self):
        view = FixtureView.as_view()
        arguments = {
            'campus': self.fixture.campus,
            'group' : self.fixture.group
        }
        
        # Query for fixture
        request = factory.get(reverse("checklist:fixtures", kwargs=arguments))
        response = view(request, **arguments)
        fixture = response.data[0]

        # Verify response
        serializer = FixtureSerializer(self.fixture)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(serializer.data, fixture)

    """
    Check that a fixture cannot be retrieved if it doesn't exist
    """
    def test_get_fixture_that_doesnt_exist(self):
        view = FixtureView.as_view()
        arguments = {
            'campus': self.fixture.campus,
            'group' : "B"
        }

        # Query for fixture
        request = factory.get(reverse("checklist:fixtures", kwargs=arguments))
        response = view(request, **arguments)
        
        # Verify error response
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
