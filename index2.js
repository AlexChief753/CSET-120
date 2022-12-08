// CHECKOUT PAGE ---------------------------------------------------------------------------------------
// function to push cart items to array and send to local storage
var cart = JSON.parse(localStorage.getItem("cart"));
const receiptItemsContainer = document.getElementById('receiptItemsContainer');

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

function renderReceiptItems() {
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
};
renderReceiptItems();
 