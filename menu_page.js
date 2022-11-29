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
        let trash = document.createElement("td");
    
        let selector = document.createElement("input");
        selector.type = "number";
        selector.value = 1;
        selector.price = a.value;
        cart_price[b] = Number(a.value);
        selector.location = b;
        new_item_quantity.appendChild(selector,0);
        selector.onchange = function() {update_quantity(this)};
    
        cart.push(a.name);
        cart_price.push(0);
        new_item_name.innerHTML = a.name;
        new_item_cost.innerHTML = a.value;

        let trash_button = document.createElement("button");
        // let trash_button_icon = document.createElement(<ion-icon name="trash-outline"></ion-icon>);
        trash_button.innerHTML = "X";

        trash_button.onclick = function() {remove_item(this)};
        trash.appendChild(trash_button);
    
        new_item.appendChild(new_item_name);
        new_item.appendChild(new_item_quantity);
        new_item.appendChild(new_item_cost);
        new_item.appendChild(trash);
    
        let location = document.getElementById("cart_table");
    
        location.append(new_item);
        b+=1;

    }
    
    let total_price = 0;
    for(x = 0; x< cart.length; x++)
    {
        total_price += cart_price[x];
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
    let item_cost = document.getElementsByClassName('test')[a.location];
    let item_cost2 = item_cost.children[2];
    item_cost2.innerHTML = (a.value * a.price).toFixed(2);
    cart_price[a.location] = ((a.value * a.price));
    let total_price = 0;
    for(x = 0; x< cart.length; x++)
    {
        total_price += cart_price[x];
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

function clear_cart()
{
    cart = [];
    cart_price = [];
    b = 0;
    let sub_total_cost = document.getElementById("sub_total_cost");
    sub_total_cost.innerHTML = 0;
    let sales_tax = document.getElementById("sales_tax");
    sales_tax.innerHTML = 0;
    let total_cost = document.getElementById("total_cost");
    total_cost.innerHTML = 0;
    let elements = document.getElementsByClassName('test');
    while(elements.length > 0)
    {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function remove_item(a)
{
    let test = a.parentNode.parentNode;

   b = test.parentNode;

    a = a.parentNode.parentNode;
    a = a.children[1].children[0];
    console.log(test);

    for(x = a.location; x < cart.length; x++)
    {
        b.children[x].children[1].children[0].location -= 1;
    }


    cart_price[a.location] = 0;
    cart.splice(a.location,1);
    test.remove();
}

// base code
var cart = [];
var cart_price = [];
var total_cost = 0;
var b = 0;
var total_price = 0;