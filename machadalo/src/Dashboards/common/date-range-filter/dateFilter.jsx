import { Container } from '@mui/material';
import React from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './date-range.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

export default function DateFilter(props) {
  const [selectedDate, setSelectedDate] = React.useState([
    dayjs(new Date()).$d,
    dayjs(new Date()).$d,
  ]);
  let dateArr = []
  function handleDateChange(date) {
    dateArr[0] = date[0]?.$d;
    dateArr[1] = date[1]?.$d;
    setSelectedDate(dateArr);
  }

  const getPreviousDate = (prevDays) => {
    let now = dayjs();
    // console.log( now.subtract(prevDays, 'day').toDate());
    dateArr[0] = now.subtract(prevDays, 'day').toDate();
    dateArr[1] = dayjs(new Date()).$d;
    setSelectedDate(dateArr);
    // return now.subtract(prevDays, 'day').toDate();
  }

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
                          {/* <input ref={startProps.inputRef} {...startProps.inputProps} />
                        <Box sx={{ mx: 1 }}> to </Box>
                        <input ref={endProps.inputRef} {...endProps.inputProps} /> */}
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>

                  <div className='calander-date ms-4'>
                  {dayjs(selectedDate[0]).format('DD/MM/YYYY')} - {dayjs(selectedDate[1]).format('DD/MM/YYYY')}
                  </div>

                </div>
              </Col>

              <Col sm={6}>
                <div>
                  <Row className="timing pb-2">
                    <Col sm={3} className="time-btn active-btn">
                      Days
                    </Col>
                    <Col sm={3} className="time-btn" onClick={(e)=>{getPreviousDate(7)}}>
                      Week
                    </Col>
                    <Col sm={3} className="time-btn" onClick={(e)=>{getPreviousDate(30)}}>
                      Month
                    </Col>
                    <Col sm={3} className="time-btn">
                      Year
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}
