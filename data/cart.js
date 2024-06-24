import { deliveryOptions } from "./deliveryOptions.js";
import { products } from "./products.js";

export function savedata(){
    localStorage.setItem('incart',incart);
    localStorage.setItem('cart',JSON.stringify(cart));
}


export let incart=parseInt(localStorage.getItem('incart'));
if(!incart){
    incart=0;
}

export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart=[];
}


export let finalcart = consolidateItems(cart);
function updateIncart(newItems) {
    incart += newItems;
}
export function updatecartfordelete(item) {
    let list=[];
    cart.forEach((element)=>{
        if (element.id!=item){
            list.push(element);
        }
    })
    cart=list;
}

export function updatecartforupdate(item,updatedquantity) {
    let i=0;
    while(i<cart.length){
        if (cart[i].id==item){
            cart[i].quantity=updatedquantity;
            break;
        }
        i++;
    }
}

function updateFinalCart(newItems) {
    finalcart= newItems;
}

export function consolidateItems(items) {
    const itemMap = new Map();

    for (let item of items) {
        if (itemMap.has(item.id)) {
            let existingItem = itemMap.get(item.id);
            existingItem.quantity += item.quantity;
        } else {
            itemMap.set(item.id, { 
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                deliveryId: item.deliveryId
            });
        }
    }

    return Array.from(itemMap.values());
}
export function calcshipping(cart){
    let shipping=0;
    cart.forEach((item)=>{
        shipping+=deliveryOptions[item.deliveryId-1].pricecents;
    })
    return shipping;
}
function updateQuantity(productid,quantity){
    finalcart.forEach((element)=>{
        if (element.id == productid){
            element.quantity=quantity;
        }
    })
}
function updateDelOpt(prod,del){
    let product = '';
    finalcart.forEach((Element)=>{
        if (Element.id==prod.id){
            product=Element;
        }
    })
    product.deliveryId=parseInt(del);
}
function updateShipping(productid,quantity){
    finalcart.forEach((element)=>{
        if (element.id == productid){
            element.quantity=quantity;
        }
    })
}
export function calcamount(cart){
    let product = '';
    let amount=0;
    cart.forEach((item)=>{
        products.forEach((Element)=>{
            if (Element.id==item.id){
                product=Element;
            }
        })
        amount+=item.quantity*product.priceCents;
    })
    return amount;
}

export{updateDelOpt};
export{updateQuantity};
export{updateFinalCart}; 
export{updateIncart}; 