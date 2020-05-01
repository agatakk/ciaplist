// ELELENTS FROM DOM
const input = document.querySelector('.form__item-input');
const quantity = document.querySelector('.form__item-quantity')
const addBtn = document.querySelector('.form__submit-btn');
const list = document.querySelector('.form__list-items');
const formContainer = document.querySelector('.form__alert-messages-container');
let alertItem;

// FUNCTIONS
function removeAlertItems(){
    if(alertItem){
        let alertAll = document.querySelectorAll('.alert');
        alertAll.forEach((alert, index)=>{
            alert.remove(index);
        });
    }  
}
function addItems(e) {
    e.preventDefault() 
    if(input.value!=""&&quantity.value!=""){
        // deleting alerts on input
        input.classList.remove('input-alert');
        quantity.classList.remove('input-alert');
        //creating the <li> elements
        let listItem = input.value;
        let itemQuantity = quantity.value;
        const li = document.createElement('li');
        li.className = 'form__list-item';
        li.draggable = 'true';
        //creating input type=checkbox
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = listItem;
        //creating label for input type=checkbox
        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.htmlFor = 'id';
        checkBoxLabel.textContent = `${listItem} [${itemQuantity}]`;
        //appending elements to list
        list.appendChild(li);
        li.appendChild(checkBox);
        li.appendChild(checkBoxLabel);
        input.value='';
        quantity.value = '';
        //styling of <li> :checked
        checkBox.addEventListener('change', (e)=>{
            if(e.target.checked){
                console.log('działa');
                li.classList.add('li-checked');
            }else{
                li.classList.remove('li-checked');
            }
        })
        removeAlertItems()
    }else{
        alertItem = document.createElement('p');
        alertItem.className = 'alert';
        //NO ITEM
        if(input.value=="" && quantity.value!=""){
            alertItem.textContent = 'Wpisz proszę CO chcesz kupić.';
            input.classList.add('input-alert');
            quantity.classList.remove('input-alert');
            removeAlertItems()
        }else if(input.value!="" && quantity.value==""){
            //NO QUANTITY
            alertItem.textContent = 'Wpisz proszę ILE chcesz kupić.';
            quantity.classList.add('input-alert');
            input.classList.remove('input-alert');
            removeAlertItems()
        }else{
            //NO INPUT AT ALL
            alertItem.textContent = 'No heloł, nic nie wpisałeś. WTF?';
            quantity.classList.add('input-alert');
            input.classList.add('input-alert');
            removeAlertItems()
        }      
        formContainer.appendChild(alertItem);
    }
   
}
// LISTENERS
 addBtn.addEventListener('click', addItems);