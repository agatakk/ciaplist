from django.contrib import admin
from main.models import ListItem
# Register your models here.


class ListItemAdmin(admin.ModelAdmin):
    list_display = ('item_name', 'quantity', 'tick')
    list_filter = ('tick',)
admin.site.register(ListItem, ListItemAdmin)
