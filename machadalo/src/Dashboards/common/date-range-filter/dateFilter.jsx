import { Container } from '@mui/material';
import React from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './date-range.css';
export default function DateFilter(props) {

  return (
    <>
      <Container>
        <div className='dateFilter pt-5'>
          <h4><b>Date Filter</b></h4>
          <div >
            <Row className="main-content ">
              <Col sm={6}>
                <div className='calander pt-2 ps-3'>
                  <BsFillCalendarDateFill />
                  <span>      April</span>
                </div>
              </Col>
              <Col sm={6}>
                <div>
                  <Row className='timing pb-2'>
                    <Col sm={3} className='time-btn'>Days</Col>
                    <Col sm={3} className='time-btn'>Week</Col>
                    <Col sm={3} className='time-btn'>Month</Col>
                    <Col sm={3} className='time-btn'>Year</Col>
                  </Row>
                </div>
              </Col>
            </Row>

          </div>
        </div >
      </Container >

    </>

  );
}
