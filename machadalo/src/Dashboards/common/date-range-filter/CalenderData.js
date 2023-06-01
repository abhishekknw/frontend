import dayjs from 'dayjs';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CalenderDatesAtom ,SelectedDateAtom} from './CalenderAtom';
const CalenderActions = () => {
    const Today = dayjs();
    const setCustomCalenderDates = useSetRecoilState(CalenderDatesAtom);
    const setSelectedDateAtom = useSetRecoilState(SelectedDateAtom);
    const GetPreviousDates =(number)=>{
        let DateArray = [];
        for (let i=0;i<=number;i++){
            DateArray.push(Today.subtract(i, 'day'))
        }
        // array1.reverse()
        setCustomCalenderDates(DateArray)
        return DateArray;
    }
    
    const GetOneDayPreviousDate = (arr) =>{
        let dates = {fisrt:arr[0],last:arr[14]};
        let previous = dates.last.subtract(1, 'day');
        let filtereddate = arr.filter((item) => item.$d !== dates.fisrt.$d);
        filtereddate.push(previous);
        setCustomCalenderDates(filtereddate);
        return filtereddate;
    }

    const GetOneDayNextDate = (arr) =>{
        let dates = {fisrt:arr[0],last:arr[14]};
        let next = dates.fisrt.add(1, 'day');
        let filtereddate = arr.filter((item) => item.$d !== dates.last.$d);
        filtereddate.splice(0, 0,next);
        setCustomCalenderDates(filtereddate);
        return filtereddate;
    }

    const getSelectedDateArray = (start,end)=>{
        let selected = [];
        if(!end){
            selected.push(dayjs(start).format('DD/MM/YYYY'));
            console.log(selected);
            setSelectedDateAtom(selected)
        }
        else{
            let date1 = dayjs(dayjs(end).format('YYYY-MM-DD'));
            let date2 = dayjs(start).format('YYYY-MM-DD');
            let numDays = date1.diff(date2, 'day');
            for (let i=0;i<numDays;i++){
                let d = dayjs(start).add(i,'day');
                selected.push(dayjs(d).format('DD/MM/YYYY'))
            }
            setSelectedDateAtom(selected);
        }
    }
    return {
        GetPreviousDates,
        GetOneDayPreviousDate,
        GetOneDayNextDate,
        getSelectedDateArray,
    }
}


export {CalenderActions};