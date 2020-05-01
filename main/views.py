from django.shortcuts import render, redirect
from main.models import ListItem
from main.forms import Item_input_form

# Create your views here.

def main(request):
    if request.method == "POST":
        form = Item_input_form(request.POST)
        checkbox_list = request.POST.getlist('ticker')
        
        for elem in checkbox_list:
            item_to_mod = ListItem.objects.get(item_name=elem)
            if item_to_mod.tick==False:
                item_to_mod.tick=True
                item_to_mod.save()
            elif item_to_mod.tick==True:
                pass

        if form.is_valid():
            form.save()
            return redirect(main)
        
    else:
        form = Item_input_form
        listed_items = ListItem.objects.all()
        return render(request, 'main/index.html', {'form':form, 'items':listed_items})