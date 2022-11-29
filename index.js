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

let managerStatus = false;
function logIn(){
    if(logInDiv.children[1].value === "gustavo" && logInDiv.children[3].value === "fring"){
        alert("Manager login successful. Entering menu edit mode.");
        managerStatus = true;
        window.location.href ="MenuPage.html";
    }
    else if (localStorage.getItem(logInDiv.children[1].value) !==null && localStorage.getItem(logInDiv.children[1].value) !== logInDiv.children[3].value){
        alert("Incorrect Password.");
    }
    else if (localStorage.getItem(logInDiv.children[1].value) === logInDiv.children[3].value){
        alert("Successful Login.");
        window.location.href = "MenuPage.html";
    }
    else if (localStorage.getItem(logInDiv.children[1].value) === null){
        alert("Account does not exist.");
    }
}




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