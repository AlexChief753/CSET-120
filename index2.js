// CHECKOUT PAGE ---------------------------------------------------------------------------------------
// function to push cart items to array and send to local storage

var cart = JSON.parse(localStorage.getItem("cart"));
const receiptItemsContainer = document.getElementById('receiptItemsContainer');

var customer_info = JSON.parse(localStorage.getItem("info"));
const receiptItemsContainer_2 = document.getElementById('receiptItemsContainer_2');

var total = JSON.parse(localStorage.getItem("total_price"));

function push_to_local_storage()
{
    let elements = document.getElementsByClassName('cart_item');
    let cart = [];
    for(x = 0; x < elements.length; x++)
    {
        let item = {
            name: elements[x].children[0].innerHTML,
            quantity: elements[x].children[1].children[0].value,
            price: elements[x].children[2].innerHTML
        }
        cart.push(item);
    }
    if(cart == ""){
        alert("Please add something to the cart before checking out")
    }
    else{
        localStorage.setItem("cart", JSON.stringify(cart));
        location.href='orderform.html'
        let t = document.getElementById("total_cost").innerHTML;
        localStorage.setItem("total_price",t);
    }
}

function push_to_local_storage_2()
{
    let empty = document.getElementsByClassName("check_empty");
    let cont = true;

    for(x = 0; x< empty.length ;x++)
    {
        if(empty[x].value == "")
        {
            cont = false;
            break;
        }
    }

    if(cont === true)
    {
        let elements = document.getElementsByClassName('info_item');
        let customer_info = [];
        for(x = 0; x < elements.length; x++)
        {
                let item = elements[x].value;
                customer_info.push(item);
        }
        localStorage.setItem("info", JSON.stringify(customer_info));
        location.href='receipt.html';
    }
    else{
        alert("Please fill out the data")
    }
}    


function renderReceiptItems() 
{
    receiptItemsContainer.innerHTML = "";
    cart.forEach((receiptItem) => {
        let receiptItemSubTotal = receiptItem.price * receiptItem.quantity;
        receiptItemsContainer.innerHTML += `
            <div class="receiptItem">
                <div class="receiptItemInfo">
                    <h3>${receiptItem.name}</h3>
                    <p>Qty: ${receiptItem.quantity}</p>
                    <p class="receiptItemCost">$${receiptItemSubTotal}</p>
                </div>
               
            </div>
        `;
        // receiptItemstotal += receiptItemSubTotal;
    });

    receiptItemsContainer_2.innerHTML = "";
    customer_info.forEach((info_item) => {
        receiptItemsContainer.innerHTML += `
            <div class="receiptItem">
                <div class="receiptItemInfo">
                    <h3> Have a good day ${info_item}</h3>
                </div>             
            </div>
        `;
    });

    receiptItemsContainer.innerHTML += `
        <div class="receiptItem">
            <div class="receiptItemInfo">
                <h3>Your Total is: $${total}</h3>
            </div>
            
        </div>
    `;
};




renderReceiptItems();