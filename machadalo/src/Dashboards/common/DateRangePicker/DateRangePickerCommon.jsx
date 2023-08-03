import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateRangePickerCommon() {
  const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  return (
    <>
      <DatePicker
        showIcon={true}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          handleDateChange(update);
        }}
        isClearable={false}
      />
    </>
  );
}
