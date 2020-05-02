from django.db import models

# Create your models here.

class ListItem(models.Model):
    item_name = models.CharField(max_length=100, blank=True)
    quantity = models.CharField(max_length=50, blank=True)
    tick = models.BooleanField(default=False)

    def __str__(self):
        return self.item_name
    