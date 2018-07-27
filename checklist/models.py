from django.db import models

import datetime

# Create your models here.
class Team(models.Model):
    team_name = models.CharField(max_length = 32)
    campus = models.CharField(max_length = 16)

    def __str__(self):
        return "%s - %s" % (self.campus, self.team_name)

class Section(models.Model):
    section_name = models.CharField(max_length = 200)
    page_number = models.IntegerField(default = -1)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def team_name(self):
        return self.team.team_name

    def campus(self):
        return self.team.campus

    def __str__(self):
        return "Section %d - %s" % (self.page_number, self.section_name)

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    question_number = models.IntegerField(default=-1)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def team_name(self):
        return self.team.team_name

    def campus(self):
        return self.section.campus()

    def __str__(self):
        return "%s" % (self.question_text)

class SubQuestion(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    categoryId = models.CharField(max_length=200) # Column to query against in 'category' table
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name='subquestion')

    def __str__(self):
        return "%s" % (self.title)

    def team_name(self):
        return self.question.team_name()

    def campus(self):
        return self.question.campus()

class Checklist(models.Model):
    person = models.CharField(max_length = 200)
    date = models.DateField(auto_now_add = True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def team_name(self):
        return self.team.team_name

    def campus(self):
        return self.team.campus

    def __str__(self):
        return "Checklist (%s)" % (str(self.date))

class ChecklistItem(models.Model):
    checked = models.BooleanField(default = False)
    checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return "%s - %s" % (str(self.checklist), str(self.question))

class Fixture(models.Model):
    campus = models.CharField(max_length = 16)
    channel = models.IntegerField(default = -1)
    name = models.CharField(max_length = 200)
    group = models.CharField(max_length = 200) # Category ID for Subquestion
    active = models.BooleanField(default = True)
    working = models.BooleanField(default = True)
    reason = models.TextField(blank=True)

    def __str__(self):
        return "%s - %s" % (str(self.channel), str(self.name))

    def save(self, *args, **kwargs):
        if self.working:
            self.reason = ''
        super(Fixture, self).save(*args, **kwargs)
