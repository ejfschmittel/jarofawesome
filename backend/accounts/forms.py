from django import forms
from .models import CustomUser

class SignUpForm(forms.ModelForm):
    username = forms.CharField(max_length=30, required=True)
    email = forms.CharField(max_length=30, required=True)
    password = forms.CharField(max_length=30, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password')

