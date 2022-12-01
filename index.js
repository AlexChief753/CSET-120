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
        console.log(userEmail);
        console.log(infoArray);   
        localStorage.setItem(userEmail, infoArray);
        window.location.href = "MenuPage.html";
    }
}

function logIn(){
    if(logInDiv.children[1].value === "gustavo" && logInDiv.children[3].value === "fring"){
        sessionStorage.setItem("manager", "true");
        console.log(sessionStorage.getItem("manager"));
        alert("Manager login successful. Entering menu edit mode.");
        window.location.href ="MenuPage.html";
    }
    else if (localStorage.getItem(logInDiv.children[1].value) !==null && localStorage.getItem(logInDiv.children[1].value) !== logInDiv.children[3].value){
        alert("Incorrect Password.");
    }
    else if (localStorage.getItem(logInDiv.children[1].value) === logInDiv.children[3].value){
        sessionStorage.setItem("manager", "false");
        console.log(sessionStorage.getItem("manager"));
        alert("Successful Login.");
        window.location.href = "MenuPage.html";
    }
    else if (localStorage.getItem(logInDiv.children[1].value) === null){
        alert("Account does not exist.");
    }
}


// Menu Page ----------------------------------------------------------


// Shallow copy of an uneditable menu item and menu row
const itemTemplate = document.body.getElementsByClassName("menu_item")[0].cloneNode(true);
const rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode();
// console.log(itemTemplate);


// This conditional toggles manager edit mode
if (sessionStorage.getItem("manager") !== "true"){
    console.log(sessionStorage.getItem("manager"));
    console.log("Customer mode");
    document.getElementById("managerDiv").remove();
}
else{
    console.log(sessionStorage.getItem("manager"));
    console.log("manager mode");
    document.body.getElementsByClassName("checkout_btn")[0].remove();
    
    let menuIterative = document.getElementById("menu");
    for (i=1; i<menuIterative.childElementCount; i++){
        let menuRow = menuIterative.children[i];
        for(n=0; n<menuRow.childElementCount; n++){
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
        }
    }
}


// This function toggles display of image link input
function imgReplace(parameter){
    if(sessionStorage.getItem("manager") === "true"){
        let parameterIndex = Array.from(parameter.parentElement.children).indexOf(parameter);
        let textArea = parameter.parentElement.children[Number(parameterIndex) + 1];
        if (textArea.style.display === "none"){
            textArea.style.display = "block";
        }
        else if (textArea.style.display === "block" && textArea.value === ""){
            textArea.style.display = "none";
        }
    }
}


function addItem(){
    const rowTemplate = document.body.getElementsByClassName("menu_row")[0].cloneNode();
    const itemTemplate = document.body.getElementsByClassName("menu_item")[0].cloneNode(true);
    if (document.getElementById("mngrName").value.trim() !== ""){
        itemTemplate.children[3].firstElementChild.innerHTML = document.getElementById("mngrName").value;
    }
    if (document.getElementById("mngrPrice").value.trim() !== ""){
        itemTemplate.children[3].lastElementChild.innerHTML = document.getElementById("mngrPrice").value
    }
    if (document.getElementById("mngrURL").value.trim() !== ""){
        itemTemplate.children[1].src = document.getElementById("mngrURL").value;
        itemTemplate.children[1].alt = document.getElementById("mngrURL").value;
    }
    if (document.getElementById("menu").lastElementChild.childElementCount === 5) {
        document.getElementById("menu").append(rowTemplate);
    }
    console.log(document.getElementById("menu").lastElementChild);
    document.getElementById("menu").lastElementChild.append(itemTemplate);
}


// Remove item button


// Image stays until button press. Link input is appended beneath image and disappears on click away
// Local storage key and array to remember changes from base file 
// Function that runs on menu load to reflect manager changes.
// Key for images, for names, and for prices
// Reassign local storage keys on button press (call a function)
// Only reassign image if input box has text in it
// Use local storage to remember item changes
// Button that saves changes by iterating through, reading values, and updating 
// innerhtml attribute(s)


// Give warning about unsaved changes if user attempts to leave the page



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
}

function remove_item(a)
{
    let item = a.parentNode.parentNode;
    item.remove();
    update_cost();
}





// CHECKOUT PAGE ---------------------------------------------------------------------------------------
