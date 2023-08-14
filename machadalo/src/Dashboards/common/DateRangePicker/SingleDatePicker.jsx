import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.css';
export default function SingleDatePicker(props) {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" onClick={onClick} ref={ref}>
      <span>{value}</span>
      <BsFillCalendarDateFill />
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
