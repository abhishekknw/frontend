import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';
export default function SingleDatePicker(props) {
    const { selectDate, onDateChange } = props;
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate, 'startdate');
    console.log(selectDate, '11111111111111111');
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <div className="example-custom-input btn btn-primary" onClick={onClick} ref={ref}>
        <span>{value}</span>
        <BsFillCalendarDateFill sx={{ marginLeft: '5px' }} />
      </div>
    ));
  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}
