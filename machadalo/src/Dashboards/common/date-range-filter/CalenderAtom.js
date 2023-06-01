import { atom } from 'recoil';

const CalenderDatesAtom = atom({
  key: 'CalenderDatesAtom',
  default:[],
});

const CalenderVaidationAtom = atom({
    key: 'CalenderVaidationAtom',
    default:{
        showCurrentMonths:true,
        showCurrentDateDates:true,
        selectDateSlider:true,
        selectDatePicker:false,
    },
  });

  const SelectedDateAtom = atom({
    key: 'SelectedDateAtom',
    default:[]
  });
export { CalenderDatesAtom ,CalenderVaidationAtom,SelectedDateAtom};