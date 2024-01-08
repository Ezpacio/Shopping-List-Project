const form = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.querySelector('.filter');
const formBtn = document.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item))
    checkUI();
};
function onSubmit(e) {
    e.preventDefault();
    const inputValue = itemInput.value;
    if (inputValue.trim() === '') {
        alert('Please input an any item!')
        return;
    };

    if(isEditMode){
        const itemToEdit = itemList.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }else{
        if(checkIfItemExists(inputValue)){
            alert('That item already exists.')
            return;
        };
    };
    addItemToDOM(inputValue);
    addItemToStorage(inputValue);
    checkUI();
    itemInput.value = '';
};
function addItemToDOM(value) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(value))

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
};
// Create Button 
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
};
// Create Icon 
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
};
// Add to Local Storage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add  new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
};
function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem
            ('items'));
    };
    return itemsFromStorage;
};
// Remove & Clear items
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        remove(e.target.parentElement.parentElement);
        return
    }else if(e.target.tagName === 'LI'){
        setItemToEdit(e.target);
        return;
    };
};
function checkIfItemExists(item){
    let itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}
function setItemToEdit(item) {
    isEditMode = true;
    itemList
        .querySelectorAll('li')
        .forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = `<i class ="fa-solid fa-pen"></i> 
    Update Item`;
    formBtn.style.backgroundColor = '#228b22';
    itemInput.value = item.textContent;
}
function remove(item) {
    if (confirm('Are you sure?')) {
        // remove from ui
        item.remove();
        // remove item from storage
        removeItemFromStorage(item.textContent);
        checkUI();
    };
};
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};
function clearItems() {
    confirm('All your items will be deleted, are you sure?') ? (itemList.innerHTML = '') : null;
    // Solution 1
    // localStorage.clear();
    // Solution 2 ==>
    localStorage.removeItem('items');
    checkUI();
};
function checkUI() {
    itemInput.value = '';
    const items = itemList.querySelectorAll('li');
    if (items.length > 0) {
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    } else {
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    };

    formBtn.innerHTML = '<i class"fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333'
    isEditMode = false;
};
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        };
    });
};
// Initialize app
function init() {
    form.addEventListener('submit', onSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
};
init()

// Local Storage ==>
// localStorage.setItem('name', 'samet');
// console.log(localStorage.getItem('name'));
// // localStorage.removeItem('name')
// localStorage.clear();

// localStorage Methods 

// localStorage.setItem('name', 'Brad'); // Set a value with a key
// localStorage.getItem('name'); // Get a value using the key
// localStorage.removeItem('name'); // Remove item using the key
// localStorage.clear(); // Clear all values
