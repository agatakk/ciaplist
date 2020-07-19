from django.shortcuts import render
from main.models import ShoppingList
# Create your views here.

def user_profile_show(request):
    target_list = ShoppingList.objects.get(list_owner = request.user)
    return render(request, 'userprofiles/view_profile.html', {'target_list':target_list})
