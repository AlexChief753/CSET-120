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

// Before the below conditional changes the page, a shallow copy of a menu item must be created
// This is so that the manager panel can create items

// This conditional toggles manager edit mode
if (sessionStorage.getItem("manager") !== "true"){
    console.log(sessionStorage.getItem("manager"));
    console.log("Customer mode");
    document.getElementById("managerDiv").remove();
}
else{
    console.log(sessionStorage.getItem("manager"));
    console.log("manager mode");
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
            linkInput.placeholder = "Paste new image link here";
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
// Image stays until button press. Link input is appended beneath image and disappears on click away
// Local storage key and array to remember changes from base file 
// Function that runs on menu load to reflect manager changes.
// Key for images, for names, and for prices
// Reassign local storage keys on button press (call a function)
// Only reassign image if input box has text in it

function testButton(){}
// Button that saves changes by iterating through, reading values, and updating 
// innerhtml attribute(s)



// CUSTOMER MENU PAGE -----------


function add_cart(a)
{
    let c = true;
    for(x=0;x<cart.length;x++)
    {
        if(a.name == cart[x])
        {
            alert("already in cart");
            c = false;
            break
        }
    }
    if (c == true)
    {
        let new_item = document.createElement("tr");
        new_item.classList.add('test');

        let new_item_name = document.createElement("td");
        let new_item_quantity = document.createElement("td");
        let new_item_cost = document.createElement("td");
    
        let selector = document.createElement("input");
        selector.type = "number";
        selector.value = 1;
        selector.price = a.value;
        selector.location = b;
        new_item_quantity.appendChild(selector,0);

        selector.onchange = function() {update_quantity(this)};

        console.log(selector.onchange);
    
        cart.push(a.name);
        cart_price.push(0);
        new_item_name.innerHTML = a.name;
        new_item_cost.innerHTML = a.value;
    
        new_item.appendChild(new_item_name);
        new_item.appendChild(new_item_quantity);
        new_item.appendChild(new_item_cost);
    
        let location = document.getElementById("cart_table");
    
        location.append(new_item);
        b+=1;
    }
   
}


function update_quantity(a)
{
    let item_cost = document.getElementsByClassName('test')[a.location];
    let item_cost2 = item_cost.children[2];
    item_cost2.innerHTML = (a.value * a.price);
    cart_price[a.location] = ((a.value * a.price));
    let total_cost = document.getElementById("total_cost");

    let total_price = 0;
    for(x = 0; x< cart.length; x++)
    {
        total_price += cart_price[x];
    }
    total_cost.innerHTML = total_price;
}




// base code
var cart = [];
var cart_price = [];
var total_cost = 0;
var b = 0;
var total_price = 0;