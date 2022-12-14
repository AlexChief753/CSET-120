// Menu Page ------------------------------------------------------------------------------

// Shallow copy of an customer view menu item and menu row
let mngrItemTemplate = "";
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
    // let itemTemplateCopy = mngrItemTemplate.cloneNode(true);

    let itemTemplateCopy = document.createElement("div");
        itemTemplateCopy.innerHTML = JSON.parse(localStorage.getItem("mngrItemTemplate"));
        itemTemplateCopy.classList.add("menu_item");
        itemTemplateCopy.firstElementChild.classList.add("menu_item_fp");

    if (document.getElementById("mngrName").value.trim() !== ""){
        itemTemplateCopy.children[1].firstElementChild.innerHTML = document.getElementById("mngrName").value;
    }
    if (document.getElementById("mngrPrice").value.trim() !== ""){
        itemTemplateCopy.children[1].lastElementChild.innerHTML = document.getElementById("mngrPrice").value
    }
    if (document.getElementById("mngrURL").value.trim() !== ""){
        itemTemplateCopy.children[0].src = document.getElementById("mngrURL").value;
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

    // Deleting item from html is fine
    // Have the save and render functions do it all 
    // Iterate through all items, indiscriminate of row
    // Create objects from the item values

    // Purpose of this addition is to assign an index number to each menu item so the corresponding json item can be filtered
    // need way to match up position of element with corresponding index in saved menu items array
    // Iterate through all rows and row items, keep count (q) that increases until item contains (source)?
    // Access parent element, .contains()/.includes() ?
    // One "master" array? Rendering?
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
    alert("Changes saved.");
}
 
function reset() {
    if (confirm("Are you sure? All changes will be lost!") === true){
        localStorage.setItem("itemJSON", localStorage.getItem("defaultJSON"));
        location.reload();
        mngrItemTemplate = document.getElementById("legendaryChicken").innerHTML;
        localStorage.setItem("mngrItemTemplate", JSON.stringify(mngrItemTemplate));
    }
}

// Calling functions:



// Set default menu page to revert to before anything else runs

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
if(JSON.parse(localStorage.getItem("itemJSON")).length / 5 > menuIterative.childElementCount - 2){
    // if row count difference is greater than one, add appropriate amount of full rows
    if ((Math.floor(JSON.parse(localStorage.getItem("itemJSON")).length / 5) + 1) - 4 > 1){
        for (i=0; i < ((Math.floor(JSON.parse(localStorage.getItem("itemJSON")).length / 5) + 1) - 5); i++){
            let rowTemplate = document.body.getElementsByClassName("menu_row")[1].cloneNode(true);
            menuIterative.append(rowTemplate);
        }
    }
    // Add last row, which may or may not be full
    let rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode();
    let itemTemplateCopy = document.getElementById("legendaryChicken").cloneNode(true);
    for(i=0; i < JSON.parse(localStorage.getItem("itemJSON")).length % 5; i++){
        rowTemplate.appendChild(itemTemplateCopy.cloneNode(true));
    }
    menuIterative.append(rowTemplate);
}
else { // If saved menu item count is less than default item count
    while(JSON.parse(localStorage.getItem("itemJSON")).length / 5 < menuIterative.childElementCount - 2) {
        let menuIterative = document.getElementById("menu");
        menuIterative.lastElementChild.remove();
    }
    let rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode()
    // let itemTemplateCopy = document.getElementById("legendaryChicken").cloneNode(true);
    let itemTemplateCopy = JSON.parse(localStorage.getItem("mngrItemTemplate"));
    for(i=0; i < JSON.parse(localStorage.getItem("itemJSON")).length % 5; i++){
        let itemTemplateCopy = document.createElement("div");
        itemTemplateCopy.innerHTML = JSON.parse(localStorage.getItem("mngrItemTemplate"));
        itemTemplateCopy.classList.add("menu_item");
        itemTemplateCopy.firstElementChild.classList.add("menu_item_fp");
        console.log(itemTemplateCopy.innerHTML)
        // itemTemplateCopy.cl
        rowTemplate.appendChild(itemTemplateCopy.cloneNode(true));
    }
    menuIterative.append(rowTemplate);
        // delete then add empty row, use loop from above to add correct # of items
        // While save row count is less than default row count, delete rows until saved is equal or greater
        // Then delete one row and populate with appropriate amount of items
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
                // menuItem.firstElementChild.setAttribute("contenteditable", true);
                // menuItem.lastElementChild.setAttribute("contenteditable", true);

                // let textBox = document.createElement('strong');
                // textBox.innerHTML = "Click name or price to edit";
                // textBox.style.display = "inline";
                // menuItem.insertBefore(textBox, menuItem.children[0]);

                // let removeButton = document.createElement("button");
                // removeButton.innerHTML = "Delete Item"
                // removeButton.setAttribute("onclick", "removeItem(this);") 
                // menuItem.insertBefore(removeButton, menuItem.children[0]);
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
}



if (localStorage.getItem("mngrItemTemplate") == null){
    mngrItemTemplate = document.getElementById("legendaryChicken").innerHTML;
    localStorage.setItem("mngrItemTemplate", JSON.stringify(mngrItemTemplate));
}
// console.log((localStorage.getItem("mngrItemTemplate")));
// console.log(JSON.stringify(mngrItemTemplate))



function exit_mngr_mode(){
    sessionStorage.setItem("manager", false);
    window.location.href = "MenuPage.html";
    window.reload;
}
// CUSTOMER MENU PAGE ---------------------------------------------------------------------------------------


function add_cart(a)
{
    console.log(a.parentElement)
    let c = true;
    let elements = document.getElementsByClassName('cart_item');
    for(x = 0; x < elements.length; x++)
    {
        if(a.parentElement.children[1].firstElementChild.innerHTML == elements[x].children[0].innerHTML)
        {
            alert("This item is already in your cart.");
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
        new_item_name.innerHTML = a.parentElement.children[1].firstElementChild.innerHTML;
        //input
        let new_item_quantity = document.createElement("td");
        new_item_quantity.classList.add('input_box'); // add class name
        let selector = document.createElement("input");
        selector.type = "number"; selector.value = 1; selector.price = Number((a.parentElement.children[1].lastElementChild.innerHTML).slice(1)); // setting attribute values
        selector.onchange = function() {update_quantity(this)};
        new_item_quantity.appendChild(selector,0);
        //Price
        let new_item_cost = document.createElement("td");  new_item_cost.innerHTML = Number((a.parentElement.children[1].lastElementChild.innerHTML).slice(1));
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
        // console.log(item_cost2);
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
// function populate_receipt()
// {
//     let elements = document.getElementsByClassName('cart_item');
//     let receipt = document.getElementById("receipt");
//     for(x = 0; x < elements.length; x++)
//     {
//         let new_item = document.createElement("tr");
//         new_item.classList.add('cart_item'); // add class name
//         // create tds
//         //name
//         let new_item_name = document.createElement("td"); 
//         new_item_name.innerHTML = elements[x].children[0].innerHTML;
//         //input
//         let new_item_quantity = document.createElement("td");
//         new_item_quantity.innerHTML = elements[x].children[1].children[0].value;
//         //Price
//         let new_item_cost = document.createElement("td");  
//         new_item_cost.innerHTML = elements[x].children[2].innerHTML;
//         //append children to new_item
//         new_item.appendChild(new_item_name);
//         new_item.appendChild(new_item_quantity);
//         new_item.appendChild(new_item_cost);
//         //append new item to html
//         receipt.append(new_item);
//     }
//     let total_price = 0;
//     for(x = 0; x < elements.length; x++)
//     {
//         total_price += Number(elements[x].children[2].innerHTML);
//     }
//     total_price = Number(total_price.toFixed(2));
//     let sales_tax_total = Number((total_price * 0.0823).toFixed(2));
//     let final_cost = Number(total_price + sales_tax_total).toFixed(2); 
//     let sub_total_cost = document.getElementById("sub_total_cost");
//     sub_total_cost.innerHTML = total_price;
//     let sales_tax = document.getElementById("sales_tax");
//     sales_tax.innerHTML = sales_tax_total;
//     let total_cost = document.getElementById("total_cost");
//     total_cost.innerHTML = final_cost;
// }

// Order now button - disable manager edit mode -------------------------------
function order_now_nav_button() {
    sessionStorage.setItem("manager", false);
    window.location.href = "MenuPage.html";
}