import { Container } from '@mui/material';
import React from 'react';
import { BsFillCalendarDateFill, BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './date-range.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import { CalenderActions } from './CalenderData';
import { CalenderDatesAtom } from '../../Recoil/States/Machadalo';
import { useRecoilValue } from 'recoil';

export default function DateFilter(props) {
  const CalederAction = CalenderActions();
  const customCalenderDates = useRecoilValue(CalenderDatesAtom);
  const [selectedDate, setSelectedDate] = React.useState([
    dayjs(new Date()).$d,
    dayjs(new Date()).$d,
  ]);
  const [timeBtns, setTimeBtns] = React.useState([
    { name: 'Days', class: 'time-btn active-btn', count: 0 },
    { name: 'Week', class: 'time-btn', count: 7 },
    { name: 'Month', class: 'time-btn', count: 30 },
  ]);
  const [DateArrayList, setDateArrayList] = React.useState(customCalenderDates);
  let dateArr = [];
  function handleDateChange(date) {
    dateArr[0] = date[0]?.$d;
    dateArr[1] = date[1]?.$d;
    setSelectedDate(dateArr);
  }

  const getPreviousDate = (time) => {
    let now = dayjs();
    dateArr[0] = now.subtract(time.count, 'day').toDate();
    dateArr[1] = dayjs(new Date()).$d;
    setSelectedDate(dateArr);
    let updateTime = timeBtns.map((x) =>
      x.name === time.name ? { ...x, class: 'time-btn active-btn' } : { ...x, class: 'time-btn' }
    );
    setTimeBtns(updateTime);
  };

  function oneDayPreviousDate(arr) {
    let temp = CalederAction.GetOneDayPreviousDate(arr);
    setDateArrayList(temp);
  }

  function oneDayNextDate(arr){
    let temp = CalederAction.GetOneDayNextDate(arr);
    setDateArrayList(temp);
  }

  React.useEffect(() => {
    let temp = CalederAction.GetPreviousDates(14);
    setDateArrayList(temp);
  }, []);

  props.onDateChange(selectedDate);
  return (
    <>
      <Container>
        <div className="dateFilter pt-5">
          <h4>
            <b>Date Filter</b>
          </h4>
          <div>
            <Row className="main-content ">
              <Col sm={6}>
                <div className="calander pt-3 ps-3 d-flex ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateRangePicker
                      label="Advanced keyboard"
                      value={selectedDate}
                      onChange={(newValue) => handleDateChange(newValue)}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <BsFillCalendarDateFill
                            ref={startProps.inputRef}
                            {...startProps.inputProps}
                          />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>

                  <div className="calander-date ms-4">
                    {dayjs(selectedDate[0]).format('DD/MM/YYYY')} -{' '}
                    {dayjs(selectedDate[1]).format('DD/MM/YYYY')}
                  </div>
                </div>
              </Col>

              <Col sm={6}>
                <div>
                  <Row className="timing">
                    {timeBtns.map((item, index) => {
                      return (
                        <Col
                          key={index}
                          sm={4}
                          className={item.class}
                          onClick={(e) => {
                            getPreviousDate(item);
                          }}
                        >
                          {item.name}
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="multi-date-calender d-flex">
          <div className="innner-calender d-flex">
            {DateArrayList.map((item, index) => {
              return (
                <div className="date-content ">
                  {dayjs(DateArrayList[index].$d).format('ddd')}
                  <div className="pt-2">{DateArrayList[index].$D}</div>
                </div>
              );
            })}
          </div>
          <div className="date-content-btn mt-3 ">
            <button 
            onClick={(e) => {
              oneDayNextDate(DateArrayList);
            }}
            >
              <BsChevronLeft />
            </button>
            <div className="pt-2">
              <button
                onClick={(e) => {
                  oneDayPreviousDate(DateArrayList);
                }}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
