import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillCalendarDateFill } from 'react-icons/bs';

export default function DateRangePickerCommon(props) {
  const { handleDateChange, startDate, endDate } = props;
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <span className="example-custom-input btn btn-primary" onClick={onClick} ref={ref}>
      <span>{value}</span>
      <BsFillCalendarDateFill sx={{ marginLeft: '5px' }} />
    </span>
  ));
  return (
    <>
      <DatePicker
        // showIcon
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          handleDateChange(update);
        }}
        isClearable={false}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        maxDate={new Date()}
        customInput={<ExampleCustomInput />}
      />
    </>
  );
}
