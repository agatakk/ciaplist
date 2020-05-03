const label = document.querySelectorAll('li>label');
function Click (){
    console.log('click');
    
}
label.forEach((item)=>{
    // console.log(item, item.htmlFor)
    const listItem = document.querySelector(`li[data-key="${item.htmlFor}"]`);
    listItem.addEventListener('click', Click);
    // console.log(listItem);
});
    //     
// const labelFor = label.htmlFor;
// console.log(label.htmlFor);

// document.addEventListener('click', ()=>{
//     console.log(listItem);
// })
// console.log(listItem);