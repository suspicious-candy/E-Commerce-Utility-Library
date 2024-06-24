
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {savefunctionfororder,order} from "../data/OrderList.js"
import { deliverydatefororders } from "../data/date.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { incart, updateFinalCart, updateIncart,cart,finalcart,savedata,consolidateItems } from "../data/cart.js";

let prodhtml = ''; 
console.log(order);
order.forEach((Element)=>{
  console.log(Element);
    let html = `<div class="order-container">
            <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(Element.OrderDate).format('YYYY, MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(Element.TotalCents/100).toFixed(2)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${Element.Id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderitems(Element.items,Element)}
          </div>
        </div>`
        prodhtml+=html;
})

const ordersGrid = document.querySelector('.orders-grid');
ordersGrid.innerHTML = prodhtml;




function renderitems(items,elements){
  let toaddhtml=''
  let product = '';
  items.forEach((Element)=>{
    products.forEach((item)=>{
      if (Element.Id==item.id){
          product=item;
      }
  })
  let html=`<div class="product-image-container">
              <img src= "${product.image}">
            </div>
   <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-quantity">
                Quantity: ${Element.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
               
              </a>
            </div>
  `
  toaddhtml+=html;
  })
  return toaddhtml;
}

document.querySelector('.cart-quantity').innerHTML=`${incart}
`;


document.querySelector(".orders-grid").addEventListener("click", function (event) {
   if (event.target.classList.contains("buy-again-message")) {
       const productDetails = event.target.closest(".product-details");
       const productName=productDetails.querySelector(".product-name").textContent.trim();
       const productQuantity=productDetails.querySelector(".product-quantity").textContent.trim();
       const productId = getProductID(productName); // You need to implement a function to get product ID based on name
       const prodquan = getProductQuantity(productQuantity);
       updateIncart(parseInt(prodquan));
       console.log(incart);
       let cart_temp = {
        id: productId,
        quantity: parseInt(prodquan),
        deliveryId:1
       }
       cart.push(cart_temp);
       console.log(cart);
       console.log(finalcart);
    savedata();
    updatecartrender();
     }
  });
  function updatecartrender(){
    document.querySelector('.cart-quantity').innerHTML=incart;
  }

  function getProductID(productName) {
       const product = products.find(p => p.name === productName);  
       return product ? product.id : null;
  }
  function getProductQuantity(productQuantity) {
    const product = productQuantity.split(" ")[1]; 
    return product ;
}

