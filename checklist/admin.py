from django import forms
from django.contrib import admin

from .models import *


TEAMS = (
    ('audio', 'Audio'),
    ('lighting', 'Lighting'),
    ('media', 'Media'),
    ('lyrics', 'Lyrics'),
    ('stage crew', 'Stage Crew'),
    ('video', 'Video')
)
CAMPUSES = (
    ('CTG', 'CTG'),
    ('CTB', 'CTB'),
    ('CTBE', 'CTB En Espanol'),
    ('Misfit', 'Misfit'),
)
GROUPS = (
    ('movers', 'Movers'),
    ('leds', "LEDs"),
    ('conventionals', 'Conventionals'),
    ('extras', 'Extras')
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
    list_filter = ['team__campus', 'team__team_name', 'section_name']
    ordering = ['team', 'page_number']

class QuestionAdmin(admin.ModelAdmin):
    fields = ['question_text', 'question_number', 'section', 'team']
    list_display = ['id', 'question_text', 'section', 'question_number', 'team']
    list_filter = ['team__campus', 'team__team_name', 'section__section_name']
    ordering = ['team__campus', 'team__team_name', 'section__page_number', 'question_number']

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name== "section":
            return SectionChoiceField(queryset=Section.objects.all())
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class SectionChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return "(" + obj.team.campus + ") " + obj.team.team_name + " - " + obj.section_name
    
class SubQuestionAdminForm(forms.ModelForm):
    categoryId=forms.ChoiceField(widget=forms.Select, choices=GROUPS)
    category=forms.ChoiceField(widget=forms.Select, choices=TEAMS)

class SubQuestionAdmin(admin.ModelAdmin):
    fields = ['title', 'category', 'categoryId', 'question']
    list_display = ['title', 'question', 'section', 'campus']
    list_filter = ['category', 'question']
    ordering = ['question__team__campus', 'question__section__page_number', 'question', 'category']
    form=SubQuestionAdminForm

    def section(self, obj):
        return obj.question.section

    def campus(self, obj):
        return obj.question.team.campus

class FixtureAdminForm(forms.ModelForm):
    group=forms.ChoiceField(widget=forms.Select, choices=GROUPS)
    campus=forms.ChoiceField(widget=forms.Select, choices=CAMPUSES)

class FixtureAdmin(admin.ModelAdmin):
    fields = ['name', 'channel', 'group', 'campus', 'active', 'working', 'reason']
    list_display = ['name', 'channel', 'group', 'campus', 'active', 'working', 'reason']
    list_filter = ['group', 'campus', 'active', 'working']
    ordering = ['campus', 'channel']
    form=FixtureAdminForm
    


admin.site.register(Team, TeamAdmin)
admin.site.register(Section, SectionAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(SubQuestion, SubQuestionAdmin)
admin.site.register(Fixture, FixtureAdmin)

admin.site.site_url = 'http://techapp.justin-maldonado.com'
admin.site.site_header = "Tech Arts Administration"
admin.site.title = "Tech Arts Admin"
