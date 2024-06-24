import { incart,cart,consolidateItems,finalcart, updateIncart ,updateDelOpt,updateQuantity, updateFinalCart, savedata} from "../data/cart.js";
import{calcamount,calcshipping,updatecartfordelete} from "../data/cart.js";
import {updatecartforupdate} from "../data/cart.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { isSatSun,deliverydate } from '../data/date.js';
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import {savefunctionfororder,order} from "../data/OrderList.js"


let prodhtml = ''; 
console.log(cart);
finalcart.forEach((prod) => {
    let product = '';
    products.forEach((Element)=>{
        if (Element.id==prod.id){
            product=Element;
        }
    })
    const toaddhtml=`
    <div class='cart-item-container js-cart-item-container-${prod.id}'>
            <div class="delivery-date">
            
              Delivery date: ${deliverydate(deliveryOptions[prod.deliveryId-1].deliverydays)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name" data-productid="${prod.id}">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${(product.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${prod.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class ="save-quantity-link link-primary">Save</span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
              
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryfunction(prod)}
              </div>
            </div>
          </div>`
          prodhtml += toaddhtml;
});
document.querySelector(".order-summary").innerHTML = prodhtml;

function renderwholepage(){
  let prodhtml = ''; 


finalcart.forEach((prod) => {
    let product = '';
    products.forEach((Element)=>{
        if (Element.id==prod.id){
            product=Element;
        }
    })
    const toaddhtml=`
           <div class='cart-item-container js-cart-item-container-${prod.id}'>
            <div class="delivery-date">
              Delivery date: ${deliverydate(deliveryOptions[prod.deliveryId-1].deliverydays)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name" data-productid="${prod.id}">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${(product.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${prod.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class ="save-quantity-link link-primary">Save</span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
              
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryfunction(prod)}
              </div>
            </div>
          </div>`
          prodhtml += toaddhtml;
});
document.querySelector(".order-summary").innerHTML = prodhtml;
}

function deliveryfunction(prod){
  let toaddhtml ='';
  deliveryOptions.forEach((element)=>{
    let now = dayjs();
    let price = '';
    if (element.pricecents===0){
      price = 'FREE'
    }else{
      price = `$${(element.pricecents/100).toFixed(2)}`
    }
    let ischecked = prod.deliveryId == element.id;
    let html =`<div class="delivery-option">
                  <input type="radio" ${ischecked ? 'checked' : ''}
                    class="delivery-option-input delivery-option,${prod.id},${element.deliverydays} js-delivery-option"
                    name="delivery-option-${prod.id}">
                  <div>
                    <div class="delivery-option-date">
                    ${deliverydate(element.deliverydays)}
                    </div>
                    <div class="delivery-option-price">
                      ${price}- Shipping
                    </div>
                  </div>
                </div>`
                
                toaddhtml+=html;
  });
  return(toaddhtml);
}


let aftertax=0;
function renderorderSummery(){
  let shippingfinal=calcshipping(finalcart);
  let amountfinal=calcamount(finalcart);
  let beforetax=amountfinal+shippingfinal;
  let tax = (0.10*beforetax);
  aftertax = beforetax+tax;
  let html =`<div class="payment-summary-title">
                  Order Summary
                </div>

                <div class="payment-summary-row">
                  <div>Items (${incart}):</div>
                  <div class="payment-summary-money">$${(amountfinal/100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div class="payment-summary-money">$${(shippingfinal/100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money">$${(beforetax/100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">$${(tax/100).toFixed(2)}</div>
                </div>

                <div class="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div class="payment-summary-money">$${(aftertax/100).toFixed(2)}</div>
                  <a class="orders-link header-link" href="orders.html" >
                   <button class="place-order-button button-primary">
                  Place your order
                </button>
                </a>`
  document.querySelector('.payment-summary').innerHTML=html;
}



function updatecheckout(){
    document.querySelector('.checkout-header-middle-section').innerHTML = `
    Checkout (<a class="return-to-home-link" href="amazon.html">${incart}</a>)`;
}



function updateitems(newquantity,oldquantity){
    updateIncart(newquantity - oldquantity);
    renderorderSummery();
}



function removeItemById(id) {
 return finalcart.filter(item => item.id !== id);
  
}





function handleRadioClick(event) {
  const selectedOption = event.target;
  let prodid = selectedOption.classList[1].split(',')[1];
  let delid;

  if (selectedOption.classList[1].split(',')[2] == 7) {
    delid = 1;
  } else if (selectedOption.classList[1].split(',')[2] == 3) {
    delid = 2;
  } else {
    delid = 3;
  }

  let product = '';
  finalcart.forEach((Element) => {
    if (Element.id == prodid) {
      product = Element;
    }
  });

  updateDelOpt(product, delid);
  renderDateSummary(prodid, delid);
  console.log(finalcart);
  savedata();
  renderorderSummery();
}

function renderDateSummary(prodid, delid) {
  let deldate = deliverydate(deliveryOptions[delid - 1].deliverydays);
  const container = document.querySelector(`.js-cart-item-container-${prodid} .delivery-date`);
  if (container) {
    container.innerHTML = `Delivery Date: ${deldate}`;
  }
}



document.querySelector(".order-summary").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-quantity-link")) {
        const cartItemDetails = event.target.closest(".cart-item-details");
        const productName = cartItemDetails.querySelector(".product-name");
        const productid = productName.getAttribute("data-productid");
        const container = document.querySelector(
            `.js-cart-item-container-${productid}`
          );
          const quantity = parseInt(cartItemDetails.querySelector('.quantity-label').textContent);
          container.remove();
          updateitems(0,quantity);
          updatecheckout();
         updatecartfordelete(productid);
         let newfincart= removeItemById(productid);
         updateFinalCart(newfincart);
         renderorderSummery();
         savedata(); 
    }
    
});



document.querySelector(".order-summary").addEventListener("click", function (event) {
    if (event.target.classList.contains("update-quantity-link")) {
        const cartItemDetails = event.target.closest(".cart-item-details");
        const productName = cartItemDetails.querySelector(".product-name");
        const productid = productName.getAttribute("data-productid");
        cartItemDetails.classList.add('is-editing-quantity');
        savedata();
    }
    
});



document.querySelector(".order-summary").addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        const cartItemDetails = event.target.closest(".cart-item-details");
        if (cartItemDetails && cartItemDetails.querySelector('.quantity-input').style.display !== 'none') {
            const productName = cartItemDetails.querySelector(".product-name");
            const productid = productName.getAttribute("data-productid");
            cartItemDetails.classList.remove('is-editing-quantity');
            const newquantity = parseInt(cartItemDetails.querySelector('.quantity-input').value);
            const oldquantity = parseInt(cartItemDetails.querySelector('.quantity-label').textContent);
            updateQuantity(productid, newquantity);
            updateitems(newquantity , oldquantity);
            updatecheckout();
            renderorderSummery();
            updatecartforupdate(productid,newquantity);
            cartItemDetails.querySelector('.quantity-label').textContent = `${newquantity}`;
            savedata();
        }
    }
});




document.addEventListener('DOMContentLoaded', function() {
  
  const radioInputs = document.querySelectorAll('.js-delivery-option');
  radioInputs.forEach(radio => {
    radio.addEventListener('click', handleRadioClick);
  });
});


function generateUUID() {
  // Helper function to generate a segment of the UUID
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  // Combine segments to form the UUID
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function pushallfinalcart(){
  let list=[];
  
  finalcart.forEach((item)=>{
    let product = '';
   products.forEach((Element) => {
      if (Element.id == item.id) {
        product = Element;
      }
    });
     console.log(item)
    list.push({
      Id:item.id,
      name:product.name,
      del_option:item.deliveryId,
      quantity:item.quantity
    })
  })
  return list;
}

document.addEventListener('DOMContentLoaded', function() {
  const placeOrderButton = document.querySelector('.place-order-button');
  
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', () => {
      // Check if all necessary variables and functions are available
      if (typeof generateUUID === 'function' &&
          typeof aftertax !== 'undefined' &&
          typeof dayjs === 'function' &&
          typeof pushallfinalcart === 'function' &&
          typeof savefunctionfororder === 'function' &&
          typeof updateFinalCart === 'function' &&
          typeof updateIncart === 'function' &&
          typeof updatecartfordelete === 'function' &&
          typeof order !== 'undefined' &&
          typeof cart !== 'undefined' &&
          typeof incart !== 'undefined' &&
          typeof finalcart !== 'undefined') {
        
        // Push order to the order array
        order.push({
          Id: generateUUID(),
          TotalCents: aftertax,
          OrderDate: dayjs(),
          items: pushallfinalcart(),
        });
        
        // Save order to localStorage
        savefunctionfororder();
        
        // Update cart and order details
        updateFinalCart([]);
        updateIncart(-1 * incart);
        
        // Clear the cart
        cart.forEach((element) => {
          updatecartfordelete(element.id);
        });
        savedata();
        renderorderSummery();
        updatecheckout();
        updateitems(0,0);
        renderwholepage();
        
        
      } else {
        console.error('One or more necessary functions or variables are not defined.');
      }
    });
  } else {
    console.error("Element with class 'place-order-button' not found.");
  }
});


updatecheckout();
updateitems(0,0);