from django.shortcuts import render, redirect
from main.models import ListItem
from main.forms import Item_input_form

# Create your views here.

def main(request):
    if request.method == "POST":
        form = Item_input_form(request.POST)

        if form.is_valid():
            form.save()
            return redirect(main)
        
    else:
        form = Item_input_form
        listed_items = ListItem.objects.all()
        return render(request, 'main/index.html', {'form':form, 'items':listed_items})


def remove_item(request, item_id):
    target = ListItem.objects.get(id=item_id)
    target.delete()
    return redirect(main)

def sync_list(request):
    checkbox_list = request.POST.getlist('ticker')
    print(checkbox_list)
    # incoming_checklist = []
    # for incoming_item in checkbox_list:
    #     incoming_checklist.append(incoming_item.id)
    
    # print(incoming_checklist)


    stored_checked_items = ListItem.objects.filter(tick=True)
    stored_checklist = []
    for stored_item in stored_checked_items:
        stored_checklist.append(str(stored_item.id))
    print(stored_checklist)
    for elem in checkbox_list:
            if elem in stored_checklist:
                pass
            else:
                item_to_mod = ListItem.objects.get(id=elem)
                item_to_mod.tick=True
                item_to_mod.save()
    for elem in stored_checklist:
        if elem in checkbox_list:
            pass
        else:
            item_to_mod = ListItem.objects.get(id=elem)
            item_to_mod.tick=False
            item_to_mod.save()
            
            # if item_to_mod.tick==False:
            #     item_to_mod.tick=True
            #     item_to_mod.save()
            # elif item_to_mod.tick==True:
            #     pass
    return redirect(main)