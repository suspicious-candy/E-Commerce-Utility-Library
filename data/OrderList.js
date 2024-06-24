import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export function savefunctionfororder(){
    localStorage.setItem('order',JSON.stringify(order));
    console.log(order);
}



export let order = JSON.parse(localStorage.getItem('order'));
if (!order) {
      order = [];
}
  