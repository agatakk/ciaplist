from django.db import models

# Create your models here.

class ListItem(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.CharField(max_length=50)
    tick = models.BooleanField(default=False)

    def __str__(self):
        return self.item_name
    