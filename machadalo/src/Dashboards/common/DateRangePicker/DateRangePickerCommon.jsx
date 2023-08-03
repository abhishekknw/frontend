import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsFillCalendarDateFill } from 'react-icons/bs';

export default function DateRangePickerCommon(props) {
  // const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);
  // const [startDate, endDate] = dateRange;
  const { handleDateChange, startDate, endDate } = props;
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <span className="example-custom-input" onClick={onClick} ref={ref}>
      <BsFillCalendarDateFill />
    </span>
  ));
  return (
    <>
      <DatePicker
        showIcon
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
        customInput={<ExampleCustomInput />}
      />
    </>
  );
}
