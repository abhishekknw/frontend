import { Container } from '@mui/material';
import React from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './date-range.css';
export default function DateFilter(props) {

  return (
    <>
      <div className='dateFilter p-5'>
        <Container>
          <h4><b>DateFilter</b></h4>
          <div >
            <Row className="main-content">
              <Col sm={6}>
                <div className='calander'>
                  <BsFillCalendarDateFill />
                  <span>      April</span>
                </div>
              </Col>
              <Col sm={6}>
                <div>
                  <Row className='timing'>
                    <Col sm={3} className='time-btn'>Days</Col>
                    <Col sm={3} className='time-btn'>Week</Col>
                    <Col sm={3} className='time-btn'>Month</Col>
                    <Col sm={3} className='time-btn'>Year</Col>
                  </Row>
                </div>
              </Col>
            </Row>

          </div>
        </Container >
      </div >

    </>

  );
}
