import { Container } from '@mui/material';
import React from 'react';
import { BsFillCalendarDateFill, BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './date-range.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';

export default function DateFilter(props) {
  const [selectedDate, setSelectedDate] = React.useState([
    'Tue May 09 2023 00:00:00 GMT+0530 (India Standard Time)',
    'Tue May 09 2023 00:00:00 GMT+0530 (India Standard Time)',
  ]);

  function handleDateChange(date) {
    console.log(date);
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

                  <div className='calander-date ms-4 '>
                    11/12/2023 - 20/12/2023
                  </div>

                </div>
              </Col>

              <Col sm={6}>
                <div>
                  <Row className="timing pb-2">
                    <Col sm={3} className="time-btn active-btn">
                      Days
                    </Col>
                    <Col sm={3} className="time-btn">
                      Week
                    </Col>
                    <Col sm={3} className="time-btn">
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
        <div className="multi-date-calender d-flex">
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content ">sat <div className='pt-2'>01</div></div>
          <div className="date-content-btn m-3 "><button><BsChevronLeft /></button><div className='pt-2'><button><BsChevronRight /></button></div></div>

        </div>
      </Container>
    </>
  );
}
