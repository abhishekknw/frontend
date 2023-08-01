// import { Box } from '@mui/material';
import React from 'react';
import { BsFillCalendarDateFill, BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './date-range.css';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import { CalenderActions } from './CalenderData';
import { CalenderDatesAtom, CalenderVaidationAtom, SelectedDateAtom } from './CalenderAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateFilter(props) {
  const CalederAction = CalenderActions();
  const customCalenderDates = useRecoilValue(CalenderDatesAtom);
  const selectedDateArray = useRecoilValue(SelectedDateAtom);
  const [CalenderVaidations, setCalenderVaidations] = useRecoilState(CalenderVaidationAtom);
  const [selectedDate, setSelectedDate] = React.useState([
    dayjs(new Date()).$d,
    dayjs(new Date()).$d,
  ]);

  const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const [timeBtns, setTimeBtns] = React.useState([
    { name: 'Days', class: 'time-btn active-btn', count: 0 },
    { name: 'Week', class: 'time-btn', count: 7 },
    { name: 'Month', class: 'time-btn', count: 30 },
  ]);
  const [DateArrayList, setDateArrayList] = React.useState(customCalenderDates);
  let dateArr = [];
  function handleDateChange(date) {
    console.log(date, '2222222222222');
    setDateRange(date);
    dateArr[0] = date[0];
    dateArr[1] = date[1];
    setSelectedDate(dateArr);
    setCalenderVaidations({
      ...CalenderVaidations,
      selectDatePicker: true,
      selectDateSlider: false,
    });
    CalederAction.getSelectedDateArray(dateArr[0], dateArr[1]);
    let temp = CalederAction.createFromStartDate(date[0]);
    setDateArrayList(temp);
  }

  const getPreviousDate = (time) => {
    let now = dayjs();
    dateArr[0] = now.subtract(time.count, 'day').toDate();
    dateArr[1] = time.count === 0 ? undefined : dayjs(new Date()).$d;
    setSelectedDate(dateArr);
    let updateTime = timeBtns.map((x) =>
      x.name === time.name ? { ...x, class: 'time-btn active-btn' } : { ...x, class: 'time-btn' }
    );
    setTimeBtns(updateTime);
    setCalenderVaidations({
      ...CalenderVaidations,
      selectDatePicker: true,
      selectDateSlider: false,
    });
    let temp = CalederAction.GetPreviousDates(24);
    setDateArrayList(temp);
    CalederAction.getSelectedDateArray(dateArr[0], dateArr[1]);
  };

  function oneDayPreviousDate(arr) {
    let temp = CalederAction.GetOneDayPreviousDate(arr);
    setDateArrayList(temp);
  }

  function oneDayNextDate(arr) {
    if (dayjs(arr[0].$d).format('DD/MM/YYYY') === dayjs(new Date().$d).format('DD/MM/YYYY')) {
      return 0;
    }
    let temp = CalederAction.GetOneDayNextDate(arr);
    setDateArrayList(temp);
  }

  function getClassName(date) {
    return !selectedDateArray.includes(dayjs(date).format('DD/MM/YYYY'));
  }

  React.useEffect(() => {
    let temp = CalederAction.GetPreviousDates(24);
    setDateArrayList(temp);
    CalederAction.getSelectedDateArray(dayjs(new Date()).$d);
  }, []);
  props.onDateChange(selectedDate);

  console.log(DateArrayList, 'DateArrayList');
  return (
    <>
      {/* <Box> */}
      <div className="dateFilter pt-2">
        <h4>
          <b>Date Filter</b>
        </h4>
        <div>
          <Row className="main-content align-items-center d-flex flex-row ">
            <Col sm={6} className="w-40">
              <div className="calander d-flex ">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    handleDateChange(update);
                  }}
                  isClearable={false}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                      label="Advanced keyboard"
                      value={selectedDate}
                      onChange={(newValue) => handleDateChange(newValue)}
                      disableFuture
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <BsFillCalendarDateFill
                            ref={startProps.inputRef}
                            {...startProps.inputProps}
                          />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider> */}
                {CalenderVaidations.selectDatePicker && (
                  <div className="calander-date ms-3">
                    {dayjs(selectedDate[0]).format('DD/MM/YYYY')} -{' '}
                    {dayjs(selectedDate[1]).format('DD/MM/YYYY')}
                  </div>
                )}
                {CalenderVaidations.selectDateSlider && (
                  <div className="calander-date ms-3">{selectedDateArray[0]}</div>
                )}
              </div>
            </Col>

            <Col sm={6} className="w-60">
              <div className="date-btn-right">
                {timeBtns.map((item, index) => {
                  return (
                    <span
                      key={index}
                      sm={3}
                      className={item.class}
                      onClick={(e) => {
                        getPreviousDate(item);
                      }}
                    >
                      <p>{item.name}</p>
                    </span>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="multi-date-calender d-flex justify-content-between">
        <div className="innner-calender d-flex ">
          {DateArrayList.map((item, index) => {
            return (
              <div
                className={
                  getClassName(DateArrayList[index]) ? 'date-content' : 'date-content active-border'
                }
                key={index}
                onClick={(e) => {
                  CalederAction.getSelectedDateArray(DateArrayList[index].$d);
                  setCalenderVaidations({
                    ...CalenderVaidations,
                    selectDatePicker: false,
                    selectDateSlider: true,
                  });
                }}
              >
                {dayjs(DateArrayList[index]).format('ddd')}
                <div className="pt-2">{dayjs(DateArrayList[index]).format('D')}</div>
              </div>
            );
          })}
        </div>
        <div className="date-content-btn ">
          <button
            onClick={(e) => {
              oneDayPreviousDate(DateArrayList);
            }}
          >
            <BsChevronLeft />
          </button>
          <div className="pt-2">
            <button
              onClick={(e) => {
                oneDayNextDate(DateArrayList);
              }}
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
      {/* </Box> */}
    </>
  );
}
