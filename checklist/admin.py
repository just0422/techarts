from django import forms
from django.contrib import admin

from .models import *

TEAMS = (
    ('audio', 'Audio'),
    ('lighting', 'Lighting'),
    ('media', 'Media'),
    ('stage crew', 'Stage Crew'),
    ('video', 'Video')
)
CAMPUSES = (
    ('CTG', 'CTG'),
    ('CTB', 'CTB')
)

class TeamAdminForm(forms.ModelForm):
    campus=forms.ChoiceField(widget=forms.Select, choices=CAMPUSES)
    team_name=forms.ChoiceField(widget=forms.Select, choices=TEAMS)
 
class TeamAdmin(admin.ModelAdmin):
    fields = ['team_name', 'campus']
    list_display = ['campus', 'team_name']
    list_filter = ['campus', 'team_name']
    ordering = ['campus', 'team_name']
    form=TeamAdminForm

class SectionAdmin(admin.ModelAdmin):
    fields = ['section_name', 'page_number', 'team']
    list_display = ['section_name', 'page_number', 'team']
    list_filter = ['team']
    ordering = ['team', 'page_number']

class QuestionAdmin(admin.ModelAdmin):
    fields = ['question_text', 'question_number', 'section', 'team']
    list_display = ['question_text', 'section', 'question_number', 'team']
    list_filter = ['section', 'team']
    ordering = ['team', 'section', 'question_number']
    
class SubQuestionAdmin(admin.ModelAdmin):
    fields = ['title', 'category', 'categoryId', 'question']
    list_display = ['title', 'category', 'categoryId', 'question']
    list_filter = ['category', 'question']
    ordering = ['question', 'category']

class FixtureAdmin(admin.ModelAdmin):
    fields = ['name', 'channel', 'group', 'campus', 'active', 'working', 'reason']
    list_display = ['name', 'channel', 'group', 'campus', 'active', 'working', 'reason']
    list_filter = ['group', 'campus', 'active', 'working']
    ordering = ['campus', 'channel']
    


admin.site.register(Team, TeamAdmin)
admin.site.register(Section, SectionAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(SubQuestion, SubQuestionAdmin)
admin.site.register(Fixture, FixtureAdmin)
