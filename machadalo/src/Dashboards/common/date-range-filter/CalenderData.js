import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
// import { DateArray } from '../../Recoil/States/Machadalo';

const today = dayjs();
// const from = today.subtract(15, 'day');
const GetPreviousDates =(number)=>{
    let DateArray = [];
    for (let i=0;i<=number;i++){
        DateArray.push(today.subtract(i, 'day'))
    }
    return DateArray;
}

export {GetPreviousDates};