from django.test import TestCase

import datetime

from ..models import *

class TeamTests(TestCase):
    """
    Setup Team
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")

    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        team = self.team
        team_name = team.team_name
        campus = team.campus
        self.assertEquals(str(team), "%s - %s" % (campus, team_name))

class SectionTests(TestCase):
    """
    Setup 2 consecutive sections and 1 team
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")
        cls.section = Section(section_name="1", page_number=1, team=cls.team)

    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        section = self.section
        section_name = section.section_name
        page_number = section.page_number
        self.assertEquals(str(section), "Section %d - %s" % (page_number, section_name))
    """
    Check that team foreign key is properly inserted
    """
    def test_team_name_and_campus(self):
        team = self.team
        section = self.section
        self.assertEquals(section.team_name(), team.team_name)
        self.assertEquals(section.campus(), team.campus)
    
class QuestionTest(TestCase):
    """
    Setup 2 question, 1 sections and 1 team
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")
        cls.section = Section(section_name="1", page_number=1, team=cls.team)
        cls.question = Question(question_text="ABC", section=cls.section, team=cls.team)

    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        self.assertEquals(str(self.question), self.question.question_text)

    """
    Check that team foreign key is properly inserted
    """
    def test_team_name_and_campus(self):
        team = self.team
        question = self.question
        self.assertEquals(question.team_name(), team.team_name)
        self.assertEquals(question.campus(), team.campus)

class SubQuestionTest(TestCase):
    """
    Setup 1 subquestion, 1 question, 1 section and 1 team
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")
        cls.section = Section(section_name="1", page_number=1, team=cls.team)
        cls.question = Question(question_text="ABC", section=cls.section, team=cls.team)
        cls.subquestion = SubQuestion(title="DEF", question=cls.question)

    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        self.assertEquals(str(self.subquestion), self.subquestion.title)

    """
    Check that team foreign key is properly inserted
    """
    def test_team_name_and_campus(self):
        team = self.team
        subquestion = self.subquestion
        self.assertEquals(subquestion.team_name(), team.team_name)
        self.assertEquals(subquestion.campus(), team.campus)

class ChecklistTest(TestCase):
    """
    Setup 1 Checklist and 1 team
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")
        cls.checklist = Checklist(person="P", date=datetime.date.today(), team=cls.team)
    
    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        self.assertEquals(str(self.checklist), "Checklist (%s)" % (str(self.checklist.date)))

    """
    Check that team foreign key is properly inserted
    """
    def test_team_name_and_campus(self):
        team = self.team
        checklist = self.checklist
        self.assertEquals(checklist.team_name(), team.team_name)
        self.assertEquals(checklist.campus(), team.campus)

class ChecklistItemTest(TestCase):
    """
    Setup 1 Checklist Item, 1 Checklist, and 1 Question
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")
        cls.section = Section(section_name="1", page_number=1, team=cls.team)
        cls.question = Question(question_text="ABC", section=cls.section)
        cls.checklist = Checklist(person="P", date=datetime.date.today(), team=cls.team)
        cls.checklistitem = ChecklistItem(checked=True, checklist=cls.checklist, question=cls.question)

    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        checklist = self.checklistitem.checklist
        question = self.checklistitem.question
        self.assertEquals(str(self.checklistitem), "%s - %s" % (str(checklist), str(question)))

class FixturesTest(TestCase):
    """
    Setup 1 Fixture
    """
    @classmethod
    def setUpTestData(cls):
        cls.team = Team(team_name="A", campus="B")
        cls.section = Section(section_name="1", page_number=1, team=cls.team)
        cls.question = Question(question_text="ABC", section=cls.section)
        cls.subquestion = SubQuestion(title="DEF", category="GHI", question=cls.question)
        cls.fixture = Fixture(campus="A", channel=1, name="B", group="C", active=True, working=True, reason="D", subquestion=cls.subquestion)

    """
    Check that the __str__() function is valid
    """
    def test_string(self):
        name = self.fixture.name
        channel = self.fixture.channel
        self.assertEquals(str(self.fixture), "%s - %s" % (str(channel), str(name)))
