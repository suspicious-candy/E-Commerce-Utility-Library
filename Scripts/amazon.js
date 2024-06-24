import { incart, cart, updateIncart,updateFinalCart,savedata} from "../data/cart.js";
import{consolidateItems} from "../data/cart.js"
import { products } from "../data/products.js";

 // Initialize as a mutable variable
let listtoprint=products;
function searchbutton(){
    if(document.querySelector('.search-bar').value==''){
        listtoprint=products;
    }else{
        let list=[];
        products.forEach((item)=>{
            if (item.keywords.includes(document.querySelector('.search-bar').value)){
                list.push(item);
            }
        })
        listtoprint=list;
    }
}
function print(){
    let prodhtml = '';
    listtoprint.forEach((prod) => {
    const toaddhtml = `<div class="product-container">
        <div class="product-image-container">
            <img class="product-image" src="${prod.image}">
        </div>
        <div class="product-name limit-text-to-2-lines">
            ${prod.name}
        </div>
        <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${prod.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${prod.rating.count}
            </div>
        </div>
        <div class="product-price">
            $${(prod.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity-container">
            <select class="js-quantity-selector-${prod.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="product-spacer"></div>
        <div class="added-to-cart" data-productid="${prod.id}">
            <img src="images/icons/checkmark.png">
            Added
        </div>
        <button class="add-to-cart-button button-primary" data-productid="${prod.id}">
            Add to Cart
        </button>
    </div>`;
    prodhtml += toaddhtml;
});

document.querySelector(".js-products-grid").innerHTML = prodhtml;
}
let incart_temp = 0;
let latest = '';

function toggleOpacity(input) {
    var element = document.querySelector('.added-to-cart[data-productid="' + input + '"]');
    element.style.opacity = '1';
    setTimeout(function () {
        element.style.opacity = '0';
    }, 2000);
}

function carttoadd(product) {
    updateIncart(incart_temp);
    cart.push({
        id: latest,
        quantity: incart_temp,
        deliveryId:1
    });
    document.querySelector(".amazon-header-right-section").innerHTML = `
        <a class="orders-link header-link" href="orders.html">
            <span class="returns-text">Returns</span>
            <span class="orders-text">& Orders</span>
        </a>
        <a class="cart-link header-link" href="checkout.html">
            <img class="cart-icon" src="images/icons/cart-icon.png">
            <div class="cart-quantity">${incart}</div>
            <div class="cart-text">Cart</div>
        </a>
    `;
    savedata();
}

// Event delegation for dynamic elements
document.querySelector(".js-products-grid").addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart-button")) {
        const productid = event.target.getAttribute("data-productid");
        incart_temp = parseInt(document.querySelector(`.js-quantity-selector-${productid}`).value);
        toggleOpacity(productid);
        latest = productid;
        let product = '';
        products.forEach((Element)=>{
            if (Element.id==productid){
                product=Element;
            }
         })
        carttoadd(product);
        updateFinalCart(consolidateItems(cart));
    }
});

document.querySelector(".search-button").addEventListener("click",function(event){
    searchbutton();
    print();
})

document.querySelector(".amazon-header-right-section").innerHTML = `
        <a class="orders-link header-link" href="orders.html">
            <span class="returns-text">Returns</span>
            <span class="orders-text">& Orders</span>
        </a>
        <a class="cart-link header-link" href="checkout.html">
            <img class="cart-icon" src="images/icons/cart-icon.png">
            <div class="cart-quantity">${incart}</div>
            <div class="cart-text">Cart</div>
        </a>
    `;
print();


