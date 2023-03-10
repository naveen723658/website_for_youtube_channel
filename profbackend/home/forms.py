from django import forms
from .models import *

class CommentForm(forms.ModelForm):
    # name = forms.CharField(label='Name', max_length=100, widget=forms.TextInput(attrs={'class': 'form-control'}))
    # email = forms.EmailField(label='Email', max_length=100, widget=forms.TextInput(attrs={'class': 'form-control'}))
    # message = forms.CharField(label='Message', max_length=500, widget=forms.Textarea(attrs={'class': 'form-control', 'rows': '5'}))
    class Meta:
        model = Comment
        fields = ('name', 'email', 'message')
        


