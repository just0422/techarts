from django.db import models

# Create your models here.
class Team(models.Model):
    team_name = models.CharField(max_length = 32)
    campus = models.CharField(max_length = 16)

class Section(models.Model):
    section_name = models.CharField(max_length = 200)
    page_number = models.IntegerField(default = 0)
    next_section = models.ForeignKey('self', on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

class Checklist(models.Model):
    person = models.CharField(max_length = 200)
    date = models.DateField(auto_now_add = True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class ChecklistItem(models.Model):
    checked = models.BooleanField(default = False)
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

class Fixtures(models.Model):
    campus = models.CharField(max_length = 16)
    channel = models.IntegerField(default = -1)
    name = models.CharField(max_length = 200)
    group = models.CharField(max_length = 200)
    active = models.BooleanField(default = True)
    working = models.BooleanField(default = True)
    reason = models.TextField
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
