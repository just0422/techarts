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
    list_display = ('campus', 'team_name')
    list_filter = ['campus', 'team_name']
    form=TeamAdminForm

admin.site.register(Team, TeamAdmin)
admin.site.register(Section)
admin.site.register(Question)
admin.site.register(SubQuestion)
admin.site.register(Fixture)
