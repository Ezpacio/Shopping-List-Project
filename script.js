const form = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


function onSubmit(e){
    e.preventDefault();
    const inputValue = itemInput.value;
    createItems(inputValue);
};

function createItems(value){

    const li = document.createElement('li');
    const text = document.createTextNode(value);
    
    
    const button = document.createElement('button');
    button.className = 'remove-item btn-link text-red';


    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';


    // Appending all element
    button.appendChild(icon);
    li.append(text);
    li.append(button);

    if(value === ''){
        alert('Please input an any item!')
        return;
    }else{
        itemList.appendChild(li);
    };
    itemInput.value = '';
}

form.addEventListener('submit', onSubmit);
