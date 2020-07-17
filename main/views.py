from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.forms import formset_factory

from .models import ListItem, ShoppingList
from .forms import Item_input_form


# Create your views here.
@login_required
def main(request):
    if request.method == "POST":
        form = Item_input_form(request.POST)
        target_list = ShoppingList.objects.get(list_owner = request.user)
        if form.is_valid():
            list_in_process = form.save(commit=False)
            list_in_process.shopping_list = target_list
            list_in_process.save()
            return redirect(main)
        
    else:
        target_list = ShoppingList.objects.get(list_owner = request.user)
        listed_items = ListItem.objects.filter(shopping_list=target_list).order_by('tick', '-id')
        return render(request, 'main/index.html', {'items':listed_items, 'current_list':target_list})


def remove_item(request, item_id):
    target_list = ShoppingList.objects.get(list_owner = request.user)
    target = ListItem.objects.get(shopping_list=target_list, id=item_id)
    target.delete()
    return redirect(main)

def sync_list(request):
    target_list = ShoppingList.objects.get(list_owner = request.user)
    checkbox_list = request.POST.getlist('ticker')
    print(checkbox_list)

    stored_checked_items = ListItem.objects.filter(shopping_list=target_list, tick=True)
    stored_checklist = []
    for stored_item in stored_checked_items:
        stored_checklist.append(str(stored_item.id))
    print(stored_checklist)
    for elem in checkbox_list:
            if elem in stored_checklist:
                pass
            else:
                item_to_mod = ListItem.objects.get(shopping_list=target_list, id=elem)
                item_to_mod.tick=True
                item_to_mod.save()
    for elem in stored_checklist:
        if elem in checkbox_list:
            pass
        else:
            item_to_mod = ListItem.objects.get(shopping_list=target_list, id=elem)
            item_to_mod.tick=False
            item_to_mod.save()

    return redirect(main)