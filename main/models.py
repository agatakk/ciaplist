from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ShoppingList(models.Model):
    list_name = models.CharField(max_length=50)
    list_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name="Lista zakupów"
        verbose_name_plural="Listy zakupów"

    def __str__(self):
        return self.list_name
class ListItem(models.Model):
    item_name = models.CharField(max_length=100, blank=True)
    quantity = models.CharField(max_length=50, blank=True)
    tick = models.BooleanField(default=False)
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE)

    class Meta:
        verbose_name="Pozycja z listy"
        verbose_name_plural="Pozycje z listy"

    def __str__(self):
        return self.item_name

    def item_li_id(self):
        item_li_id = 'item_id_'+str(self.id)
        return item_li_id
    
