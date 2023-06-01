import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { CalenderDatesAtom } from './CalenderAtom';
const CalenderActions = () => {
    const Today = dayjs();
    const [customCalenderDates,setCustomCalenderDates] = useRecoilState(CalenderDatesAtom)
    const GetPreviousDates =(number)=>{
        let DateArray = [];
        for (let i=0;i<=number;i++){
            DateArray.push(Today.subtract(i, 'day'))
        }
        // setCustomCalenderDates(DateArray)
        return DateArray;
    }
    
    const GetOneDayPreviousDate = (arr) =>{
        let dates = {fisrt:arr[0],last:arr[14]};
        let previous = dates.last.subtract(1, 'day');
        let filtereddate = arr.filter((item) => item.$d !== dates.fisrt.$d);
        filtereddate.push(previous);
        // setCustomCalenderDates(filtereddate)
        return filtereddate;
    }

    const GetOneDayNextDate = (arr) =>{
        let dates = {fisrt:arr[0],last:arr[14]};
        let next = dates.fisrt.add(1, 'day');
        let filtereddate = arr.filter((item) => item.$d !== dates.last.$d);
        filtereddate.splice(0, 0,next);
        return filtereddate;
    }
    return {
        GetPreviousDates,
        GetOneDayPreviousDate,
        GetOneDayNextDate
    }
}


export {CalenderActions};