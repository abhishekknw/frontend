import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
// import { DateArray } from '../../Recoil/States/Machadalo';

const today = dayjs();
console.log(today)
// const from = today.subtract(15, 'day');
const DateArray = [];
const GetPreviousDates =(number)=>{
    for (let i=0;i<=number;i++){
        DateArray.push(today.subtract(i, 'day'))
    }
    console.log(DateArray)
}

export {GetPreviousDates};