// CHECKOUT PAGE ---------------------------------------------------------------------------------------
// function to push cart items to array and send to local storage

var cart = JSON.parse(localStorage.getItem("cart"));
const receiptItemsContainer = document.getElementById('receiptItemsContainer');

var customer_info = JSON.parse(localStorage.getItem("info"));
const receiptItemsContainer_2 = document.getElementById('receiptItemsContainer_2');

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
    localStorage.setItem("cart", JSON.stringify(cart));
}

function push_to_local_storage_2()
{
    let elements = document.getElementsByClassName('info_item');
    let customer_info = [];
    for(x = 0; x < elements.length; x++)
    {
            let item = elements[x].value;
            customer_info.push(item);
    }
    localStorage.setItem("info", JSON.stringify(customer_info));
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
                    <p> Have a good day ${info_item}</p>
                </div>
               
            </div>
        `;
        console.log(info_item);
    });
};





renderReceiptItems();