import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function isSatSun(date){
    if(date.format('dddd')=='Sunday' || date.format('dddd')=='Saturday'){
        return true;
    }
    return false;
}

function deliverydate(time){
    let now = dayjs();
    let daysafter=now.add(time,'days');
    return(daysafter.format('dddd,  MMMM D'));
}

export function deliverydatefororders(time,date){
    let daysafter=date.add(time,'days');
    return(daysafter.format('dddd,  MMMM D'));
}
export{deliverydate};
export{isSatSun};