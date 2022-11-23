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
    
    let total_cost = document.getElementById("total_cost");

    total_cost.innerHTML = 100000000000000000;
}




// base code
var total_cost = 0;
var b = 0;