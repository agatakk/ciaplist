// ELELENTS FROM DOM
const input = document.querySelector('.form__item-input');
const quantity = document.querySelector('.form__item-quantity')
const addBtn = document.querySelector('.form__submit-btn');
const list = document.querySelector('.form__list-items');
const formContainer = document.querySelector('.form__alert-messages-container');
const form = document.querySelector('.form');
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
    e.preventDefault();
    
    if(input.value.trim()!=""&&quantity.value.trim()!=""){
        // deleting alerts on input
        input.classList.remove('input-alert');
        quantity.classList.remove('input-alert');
        //creating the <li> elements
        let listItem = input.value;
        let itemQuantity = quantity.value;
        const li = document.createElement('li');
        li.id = listItem;
        li.draggable = 'true';
        li.className = 'form__list-item';
        // creating input type=checkbox
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.id = listItem;
        //creating label for input type=checkbox
        const checkBoxLabel = document.createElement('label');
        checkBoxLabel.htmlFor = listItem;
        li.dataset.key = checkBoxLabel.htmlFor;
        checkBoxLabel.textContent = `${listItem} [${itemQuantity}]`;
        //appending elements to list
        list.appendChild(li);
        li.appendChild(checkBox);
        li.appendChild(checkBoxLabel);
        
        //dragdrop
        let del;
        function dragStart (e) {
            if(e.target && e.target.nodeName == "LI"){
                console.log('start');
                del = document.createElement('div');
                del.textContent = 'Usuń';
                del.classList.add('del');
                document.body.appendChild(del);
                e.dataTransfer.setData('Text', e.target.id);
            }
            
        }
        function dragEnd(e){
            console.log('koniec')
            if(e.target && e.target.nodeName == "LI"){
                del.remove();
                console.log('end');
            }
        }
        function dragEnter (e) {
            if(e.target&&e.target.className==='del'){
                console.log('enter');
                e.target.classList.add('del-enter');
            }
        }
        function dragOver (e) {
            if(e.target&&e.target.matches('div.del')){
                e.preventDefault();
                console.log('over')
            }
        }
        function dropElement (e) {
            if(e.target&&e.target.matches('div.del')){
                e.preventDefault();
                console.log('drop');
                const data = e.dataTransfer.getData("Text");
                const element = document.getElementById(data);
                console.log(element);
                //  element.parentNode.removeChild(element);
                element.remove();
            }
        };
        // const label = document.querySelectorAll('li>label');
        // console.log(label);
        // label.forEach((item)=>{
        //     const listItems = document.querySelector(`li[data-key="${item.htmlFor}"]`);
        //     console.log(listItems);    
        //     
        // });
        list.addEventListener('dragstart', dragStart);
        document.addEventListener('dragend', dragEnd);
        document.addEventListener('dragenter', dragEnter);
        document.addEventListener('dragover', dragOver);
        window.addEventListener('drop', dropElement);
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

        //removing alert items
        removeAlertItems()
    }else{
        alertItem = document.createElement('p');
        alertItem.className = 'alert';
        //NO ITEM
        if(input.value.trim()==""&&quantity.value.trim()!=""){
            alertItem.textContent = 'Wpisz proszę CO chcesz kupić.';
            input.classList.add('input-alert');
            quantity.classList.remove('input-alert');
            removeAlertItems()
        }else if(input.value.trim()!=""&&quantity.value.trim()==""){
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
 form.addEventListener('submit', addItems);