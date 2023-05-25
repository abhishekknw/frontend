import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BsFillBellFill, BsFillPersonFill, BsFillPersonPlusFill, BsPcDisplay, BsChatRightHeart, BsPhoneVibrate, BsPersonVideo3, BsFillHouseDoorFill, BsGearFill, BsSliders2 } from 'react-icons/bs';
import Logo from '../MachadaloDashboard/logo.png';


export default function MachadaloHeader(props) {

  return (
    <>    <Container>
      <Row>
        <Col sm={6}>

          <span>
            <div className="header__links">
              <ul>
                <li>
                  <span >
                    <i className="fa fa-bars" />
                  </span>
                </li>
              </ul>
            </div>
          </span>
          <span>
            <div className='header-content'>
              <img src={Logo} />
            </div>
          </span>
        </Col>

        <Col sm={3}
          className='right-heder-content'> <span><BsFillBellFill /> </span> <span>  <BsFillHouseDoorFill /></span> <span><BsGearFill /></span></Col>
        <Col sm={3}>
          <div className='welcome-box' ><BsFillPersonFill /><span>Welcome back ,Kriti</span></div>
        </Col>
      </Row>


      <div className="second-header">
        {/* <Row>
            <Col sm={2} className='icon'><BsFillPersonPlusFill />    <span>    Leads</span></Col>
            <Col sm={2} className='icon'><BsPhoneVibrate /><span>  INTERVENE</span></Col>
            <Col sm={2} className='icon'><BsPcDisplay /><span>  Template dashboard</span></Col>
            <Col sm={2} className='icon'><BsChatRightHeart /><span>  Dynamic Bot</span></Col>
            <Col sm={2} className='icon'><BsPersonVideo3 /><span>License & Payment</span></Col>
          </Row> */}
      </div>

    </Container >
    </>
  );
}
