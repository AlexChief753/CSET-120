let form = document.getElementById("form");
let logInDiv = document.getElementById("logInDiv");

function signUp() {
    let length = form.childElementCount;
    let userEmail = "";
    let infoArray =[];
    let status = true;
    for(let i=0; i<length; i++){
        if(i%2===1){
            if (i<10 && form.children[i].value.length <= 3){
                alert(`${form.children[i-1].innerHTML.replace(":", "")} is too short. Please use a minimum of 4 characters.`);
                status = false;
            }
            if (i===1){
                if (localStorage.getItem(form.children[i].value) !== null){
                    alert("This email is associated existing account. Please use a different email or try logging in.");
                    status = false;
                }
                else{
                    userEmail = form.children[i].value;
                }
            }
            if (i!==1){
                infoArray.push(form.children[i].value);
            }
        }
    }
    if(status === true) {
        localStorage.setItem(userEmail, infoArray);
        window.location.href = "MenuPage.html";
    }
}

function logIn(){
    if(logInDiv.children[1].value === "gustavo" && logInDiv.children[3].value === "fring"){
        sessionStorage.setItem("manager", "true");
        alert("Manager login successful. Entering menu edit mode.");
        window.location.href ="MenuPage.html";
    }
    else if (localStorage.getItem(logInDiv.children[1].value) !==null && localStorage.getItem(logInDiv.children[1].value) !== logInDiv.children[3].value){
        alert("Incorrect Password.");
    }
    else if (localStorage.getItem(logInDiv.children[1].value) === logInDiv.children[3].value){
        sessionStorage.setItem("manager", "false");
        window.location.href = "MenuPage.html";
    }
    else if (localStorage.getItem(logInDiv.children[1].value) === null){
        alert("Account does not exist.");
    }
}




// Menu Page ------------------------------------------------------------------------------

// Shallow copy of an customer view menu item and menu row
const itemTemplate = document.body.getElementsByClassName("menu_item")[0].cloneNode(true);
const rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode();
class MenuItem {
    constructor(link, name, price) {
        this.link = link;
        this.name = name;
        this.price = price;
    }
}

function addItem(){
    let itemTemplateCopy = mngrItemTemplate.cloneNode(true);
    if (document.getElementById("mngrName").value.trim() !== ""){
        itemTemplateCopy.children[5].firstElementChild.innerHTML = document.getElementById("mngrName").value;
    }
    if (document.getElementById("mngrPrice").value.trim() !== ""){
        itemTemplateCopy.children[5].lastElementChild.innerHTML = document.getElementById("mngrPrice").value
    }
    if (document.getElementById("mngrURL").value.trim() !== ""){
        console.log(itemTemplateCopy.children[2]);
        itemTemplateCopy.children[2].src = document.getElementById("mngrURL").value;
    }
    if (document.getElementById("menu").lastElementChild.childElementCount >= 5) {
        let rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode();
        document.getElementById("menu").append(rowTemplate);
    }
    itemTemplateCopy.setAttribute("draggable", "true");
    document.getElementById("menu").lastElementChild.append(itemTemplateCopy);
}

function removeItem(source){
    source.parentElement.remove();
}

// This function toggles display of image link input
function imgReplace(parameter){
    if(sessionStorage.getItem("manager") === "true"){
        let parameterIndex = Array.from(parameter.parentElement.children).indexOf(parameter);
        let textArea = parameter.parentElement.children[Number(parameterIndex) + 1];
        let imgBtn = parameter.parentElement.children[Number(parameterIndex) + 2];
        if (textArea.style.display === "none" && imgBtn.style.display === "none"){
            textArea.style.display = "block";
            imgBtn.style.display = "block";

        }
        else if (textArea.style.display === "block" && textArea.value === "" && imgBtn.style.display === "block"){
            textArea.style.display = "none";
            imgBtn.style.display = "none";
        }
    }
}

function changeButton(param){
    let imageOriginal = param.parentElement.children[Array.from(param.parentElement.children).indexOf(param)-2].src;
    let textAreaInput = param.parentElement.children[Array.from(param.parentElement.children).indexOf(param)-1].value;
    let menuIterative = document.getElementById("menu");
    for (i=1; i<menuIterative.childElementCount; i++){
        let menuRow = menuIterative.children[i];
        for(n=0; n<menuRow.childElementCount; n++){
            let menuItem = menuRow.children[n];
            if(menuItem.contains(param) == true){
                sessionStorage.setItem(i + `${n+1}`, imageOriginal);
            }
        }
    }
    if(textAreaInput.trim() !== ""){
        param.innerHTML = "Undo";
        param.setAttribute("onclick", "undoButton(this);");
        param.parentElement.children[Array.from(param.parentElement.children).indexOf(param)-2].src = textAreaInput;
    }
}

function undoButton(param){
    let image = param.parentElement.children[Array.from(param.parentElement.children).indexOf(param)-2];
    let menuIterative = document.getElementById("menu");
    for (i=1; i<menuIterative.childElementCount; i++){
        let menuRow = menuIterative.children[i];
        for(n=0; n<menuRow.childElementCount; n++){
            let menuItem = menuRow.children[n];
            if(menuItem.contains(param) == true){
                image.src = sessionStorage.getItem(i+`${n+1}`);
            }
        }
    }
    param.innerHTML = "Set Image";
    param.setAttribute("onclick", "changeButton(this);");
}

function saveButton(){
    let menuObjArr = [];
    let menuIterative = document.getElementById("menu");
    for (i=2; i<menuIterative.childElementCount; i++){
        let menuRow = menuIterative.children[i];
        for(n=0; n<menuRow.childElementCount; n++){
            let menuItem = menuRow.children[n];
            let src = menuItem.children[2].src;
            let name = menuItem.lastElementChild.firstElementChild.innerHTML;
            let price = menuItem.lastElementChild.lastElementChild.innerHTML;
            let itemObj = new MenuItem(src, name, price);
            menuObjArr.push(itemObj);
        }
    }
    localStorage.setItem("itemJSON", JSON.stringify(menuObjArr));
}
 
function reset() {
    if (confirm("Are you sure? All changes will be lost!") === true){
        localStorage.setItem("itemJSON", localStorage.getItem("defaultJSON"));
        location.reload();
    }
}

function draggableItems(){
    for (i of document.getElementsByClassName("menu_item")){
        i.setAttribute("draggable", "true");
     }
}

function test() {
    console.log("test button clicked");
}

// Calling functions:

// Time to rip it all up
// Instead of sending all objects together in one array, make the one array contain an array for each row, 
// and each of the contained arrays will contain item objects
// If a row has no items, delete it
// Default page code will need to change, render code needs to change, reset button needs to change

// Set a default menu page to revert to
let menuObjDefaultArr = [];
let menuIterative = document.getElementById("menu");
for (i=2; i<menuIterative.childElementCount; i++){
    let menuRow = menuIterative.children[i];
    for(n=0; n<menuRow.childElementCount; n++){
        let menuItem = menuRow.children[n];
        let src = menuItem.children[0].src;
        let name = menuItem.children[1].firstElementChild.innerHTML;
        let price = menuItem.children[1].lastElementChild.innerHTML;
        let itemObj = new MenuItem(src, name, price);
        menuObjDefaultArr.push(itemObj);
    }
}
localStorage.setItem("defaultJSON", JSON.stringify(menuObjDefaultArr));

// Edit item quantity from original to match saved changes
if(JSON.parse(localStorage.getItem("itemJSON")).length / 5 > menuIterative.childElementCount - 2 === true){
    // Activates if the saved menu has more rows than the default menu
    if ((Math.floor(JSON.parse(localStorage.getItem("itemJSON")).length / 5) + 1) - 4 > 1){
        // Activates if the difference between the saved menu row quantity 
        // and the default row quantity is greater than 1
        for (i=0; i < ((Math.floor(JSON.parse(localStorage.getItem("itemJSON")).length / 5) + 1) - 5); i++){
            // This loop will iterate as many times as the difference between the 
            // Saved menu row count and the default menu row count, minus one
            let rowTemplate = document.body.getElementsByClassName("menu_row")[1].cloneNode(true);
            menuIterative.append(rowTemplate);
        }
    }
    while(JSON.parse(localStorage.getItem("itemJSON")).length / 5 > menuIterative.childElementCount - 2) {
        let rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode();
        menuIterative.append(rowTemplate);
        let itemTemplateCopy = document.getElementById("legendaryChicken").cloneNode(true);
        for(i=0; i < JSON.parse(localStorage.getItem("itemJSON")).length % 5; i++){
            rowTemplate.appendChild(itemTemplateCopy.cloneNode(true));
        }
        // iterate through all rows added beyond default and append five children
        // Use this loop for only the last row
        // Use for loop so that you have an i value to work with - when i === value
    }
}
else {
    while(JSON.parse(localStorage.getItem("itemJSON")).length / 5 < menuIterative.childElementCount - 2) {
        let menuIterative = document.getElementById("menu");
        menuIterative.lastElementChild.remove();
    }
}

// Redefines item properties
let q = 0;
for (i=2; i<menuIterative.childElementCount; i++){
let menuRow = menuIterative.children[i];
    for(n=0; n<menuRow.childElementCount; n++){
        let menuItem = menuRow.children[n];
        menuItem.children[0].src = JSON.parse(localStorage.getItem("itemJSON"))[q].link;
        menuItem.children[1].firstElementChild.innerHTML = JSON.parse(localStorage.getItem("itemJSON"))[q].name;
        menuItem.children[1].lastElementChild.innerHTML= JSON.parse(localStorage.getItem("itemJSON"))[q].price;
        if (q<JSON.parse(localStorage.getItem("itemJSON")).length-1){q++;}
    }
}

// -Manager mode conditional
if (sessionStorage.getItem("manager") !== "true"){
    console.log("Customer mode");
    document.getElementById("managerDiv").remove();
}
else{
    console.log("Manager mode");

    document.body.getElementsByClassName("checkout_btn")[0].remove();
    document.getElementsByClassName("menu_buttons")[0].remove();

    let menuIterative = document.getElementById("menu");
    for (i=1; i<menuIterative.childElementCount; i++){
        let menuRow = menuIterative.children[i];
        for(n=0; n<menuRow.childElementCount; n++){
            if(i===1){
                let menuItem = menuRow.children[n];
                menuItem.firstElementChild.setAttribute("contenteditable", true);
                menuItem.lastElementChild.setAttribute("contenteditable", true);

                let textBox = document.createElement('strong');
                textBox.innerHTML = "Click name or price to edit";
                textBox.style.display = "inline";
                menuItem.insertBefore(textBox, menuItem.children[0]);

                let removeButton = document.createElement("button");
                removeButton.innerHTML = "Delete Item"
                removeButton.setAttribute("onclick", "removeItem(this);") 
                menuItem.insertBefore(removeButton, menuItem.children[0]);
                menuItem.lastElementChild.remove();
            }

            else{
                let menuItem = menuRow.children[n];
                menuItem.children[1].firstElementChild.setAttribute("contenteditable", true);
                menuItem.children[1].lastElementChild.setAttribute("contenteditable", true);
                menuItem.firstElementChild.setAttribute("onclick", "imgReplace(this);");

                let textBox = document.createElement('strong');
                textBox.innerHTML = "Click image, name, or price to edit";
                textBox.style.display = "inline";
                menuItem.insertBefore(textBox, menuItem.children[0]);

                let linkInput = document.createElement("textarea");
                linkInput.placeholder = "Paste image link here";
                linkInput.style.width = "90%"; linkInput.style.height = "10%";
                linkInput.style.resize = "none"; linkInput.style.display = "none";
                menuItem.insertBefore(linkInput, menuItem.children[2]);

                let removeButton = document.createElement("button");
                removeButton.innerHTML = "Delete Item"
                removeButton.setAttribute("onclick", "removeItem(this);") 
                menuItem.insertBefore(removeButton, menuItem.children[0]);
                menuItem.lastElementChild.remove();

                let changeButton = document.createElement("button");
                changeButton.innerHTML = "Set image";
                changeButton.style.display = "none";
                changeButton.setAttribute("onclick", "changeButton(this);");
                menuItem.insertBefore(changeButton, menuItem.children[4]);
            }
        }
    }
    draggableItems();
}

const mngrItemTemplate = document.getElementById("legendaryChicken").cloneNode(true);


// Give warning about unsaved changes if user attempts to leave the page
// Preview image button is replaced by undo button on click, vice versa
// Save Button
// focusout event?

// Local/Session storage key and array to remember changes from base file 
// Function that runs on menu load to reflect manager changes.
// Key for images, for names, and for prices
// Reassign local storage keys on button press (call a function)
// Only reassign image if input box has text in it
// Use local storage to remember item changes
// Button that saves changes by iterating through, reading values, and updating 
// innerhtml attribute(s)


// Option to add item to end or to beginning (the end is way easier) + add row to beginning
// Drag and drop item reorganization



// CUSTOMER MENU PAGE ---------------------------------------------------------------------------------------


function add_cart(a)
{
    let c = true;
    let elements = document.getElementsByClassName('cart_item');
    for(x = 0; x < elements.length; x++)
    {
        if(a.name == elements[x].children[0].innerHTML)
        {
            alert("already in cart");
            c = false;
            break
        }
    }
    if (c == true)
    {
        //Creating new item
        let new_item = document.createElement("tr");
        new_item.classList.add('cart_item'); // add class name
        // create tds
        //name
        let new_item_name = document.createElement("td"); 
        new_item_name.innerHTML = a.name;
        //input
        let new_item_quantity = document.createElement("td");
        new_item_quantity.classList.add('input_box'); // add class name
        let selector = document.createElement("input");
        selector.type = "number"; selector.value = 1; selector.price = a.value; // setting attribute values
        selector.onchange = function() {update_quantity(this)};
        new_item_quantity.appendChild(selector,0);
        //Price
        let new_item_cost = document.createElement("td");  new_item_cost.innerHTML = a.value;
        //Remove item button
        let trash = document.createElement("td");
        let trash_button = document.createElement("button");
        trash_button.innerHTML = "X";
        trash_button.onclick = function() {remove_item(this)};
        trash.appendChild(trash_button); 
        //append children to new_item
        new_item.appendChild(new_item_name);
        new_item.appendChild(new_item_quantity);
        new_item.appendChild(new_item_cost);
        new_item.appendChild(trash);
        //append new item to html
        let location = document.getElementById("cart_table");
        location.append(new_item);
    }
    update_cost();

}

function update_cost()
{
    let total_price = 0;
    let elements = document.getElementsByClassName('cart_item');
    for(x = 0; x < elements.length; x++)
    {
        total_price += Number(elements[x].children[2].innerHTML);
    }
    total_price = Number(total_price.toFixed(2));
    let sales_tax_total = Number((total_price * 0.0823).toFixed(2));
    let final_cost = Number(total_price + sales_tax_total).toFixed(2); 
    let sub_total_cost = document.getElementById("sub_total_cost");
    sub_total_cost.innerHTML = total_price;
    let sales_tax = document.getElementById("sales_tax");
    sales_tax.innerHTML = sales_tax_total;
    let total_cost = document.getElementById("total_cost");
    total_cost.innerHTML = final_cost;

}

function update_quantity(a)
{
    if(a.value <= 0)
    {
        remove_item(a);
    }
    else if(a.value > 99)
    {
        alert("Max Quantity is 99");
    }
    else
    {
        let item_cost2 = a.parentNode.parentNode.children[2];
        console.log(item_cost2);
        item_cost2.innerHTML = (a.value * a.price).toFixed(2);
        update_cost();
    }
}

function clear_cart()
{
    let elements = document.getElementsByClassName('cart_item');
    while(elements.length > 0)
    {
        elements[0].parentNode.removeChild(elements[0]);
    }
    update_cost();
    document.getElementById("add_promo").disabled = false;
    let delete_promo_box = document.getElementById("promo_code");
    let delete_green_text = document.getElementById("promo_text");
    delete_green_text.removeChild(delete_green_text.childNodes[0]);
    while(delete_promo_box.hasChildNodes)
    {
        delete_promo_box.removeChild(delete_promo_box.childNodes[0]);
    }
}

function remove_item(a)
{
    let item = a.parentNode.parentNode;
    item.remove();
    update_cost();
}


// Promo code
function add_promo_code_input()
{
    // create input and button
    let promo = document.createElement("input");
    let promo_button = document.createElement("button");

    promo_button.onclick = function() {promo_code()};
    promo_button.classList.add('promo_btn'); // add class name
    promo_button.innerHTML = "<b>Submit</b>";

    promo.innerHTML = "Enter your code";
    promo.classList.add('promo_box'); // add class name
    let location = document.getElementById("promo_code")
    location.append(promo);
    location.append(promo_button);
    document.getElementById("add_promo").disabled = true;
}
function promo_code()
{
    let code = document.getElementsByClassName("promo_box");
    let total = document.getElementById("total_cost");
    if(code[0].value === "NEWCUSTOMER")
    {
        total.innerHTML = (Number(total.innerHTML) * 0.9).toFixed(2);
        document.getElementsByClassName("promo_btn")[0].disabled = true;
        //creating text
        let green_text = document.createElement("p"); 
        green_text.classList.add("green_text");
        green_text.innerHTML = "You saved 10%!";
        //appending under total
        let location = document.getElementById("promo_text");
        location.append(green_text);

    }
    else if(code[0].value === "test")
    {
        total.innerHTML = (Number(total.innerHTML) * 0.95).toFixed(2);
        document.getElementsByClassName("promo_btn")[0].disabled = true;
        //creating text
        let green_text = document.createElement("p"); 
        green_text.classList.add("green_text");
        green_text.innerHTML = "You saved 5%!";
        //appending under total
        let location = document.getElementById("promo_text");
        location.append(green_text);
    }
    else{
        alert("That code is no longer valid");
    }
}


// CHECKOUT PAGE ---------------------------------------------------------------------------------------
// function to populate receipt with cart items, and total price
function populate_receipt()
{
    let elements = document.getElementsByClassName('cart_item');
    let receipt = document.getElementById("receipt");
    for(x = 0; x < elements.length; x++)
    {
        let new_item = document.createElement("tr");
        new_item.classList.add('cart_item'); // add class name
        // create tds
        //name
        let new_item_name = document.createElement("td"); 
        new_item_name.innerHTML = elements[x].children[0].innerHTML;
        //input
        let new_item_quantity = document.createElement("td");
        new_item_quantity.innerHTML = elements[x].children[1].children[0].value;
        //Price
        let new_item_cost = document.createElement("td");  
        new_item_cost.innerHTML = elements[x].children[2].innerHTML;
        //append children to new_item
        new_item.appendChild(new_item_name);
        new_item.appendChild(new_item_quantity);
        new_item.appendChild(new_item_cost);
        //append new item to html
        receipt.append(new_item);
    }
    let total_price = 0;
    for(x = 0; x < elements.length; x++)
    {
        total_price += Number(elements[x].children[2].innerHTML);
    }
    total_price = Number(total_price.toFixed(2));
    let sales_tax_total = Number((total_price * 0.0823).toFixed(2));
    let final_cost = Number(total_price + sales_tax_total).toFixed(2); 
    let sub_total_cost = document.getElementById("sub_total_cost");
    sub_total_cost.innerHTML = total_price;
    let sales_tax = document.getElementById("sales_tax");
    sales_tax.innerHTML = sales_tax_total;
    let total_cost = document.getElementById("total_cost");
    total_cost.innerHTML = final_cost;
}

//function to pull all items from cart and add them to the receipt
// define class and constructor function (optional)
// define empty array
// iterate through cart items
// create object for each item with attributes for data (price, quantity, etc)
// Push each object to empty array
// Stringify the array into JSON
// Push JSON array to local storage

