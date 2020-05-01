from django.forms import ModelForm, TextInput
from main import models

class Item_input_form(ModelForm):
    class Meta:
        model = models.ListItem
        fields = ['item_name', 'quantity']
        labels = {
            'item_name':"Co?",
            'quantity':"Ile?"
        }
        widgets = {
            'item_name': TextInput(attrs={'class': 'form__item-input'}),
            'quantity': TextInput(attrs={'class': 'form__item-quantity'})
        }