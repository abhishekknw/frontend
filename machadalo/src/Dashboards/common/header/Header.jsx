import React from 'react';
import { Box } from '@mui/material';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BsFillBellFill, BsFillPersonFill, BsFillPersonPlusFill, BsPcDisplay, BsChatRightHeart, BsPhoneVibrate, BsPersonVideo3, BsFillHouseDoorFill, BsGearFill, BsSliders2 } from 'react-icons/bs';
import Logo from './logo.png';
import './header.css';
import SideNavBar from '../sidebar/sideBar';

export default function MachadaloHeader(props) {

  return (
    <>    <Box className='pt-5'>
      <Row>
        <Col sm={3}>
          <div className='d-flex align-items-center'>
            {/* <span>
              <div className="header__links">
                <ul>
                  <li>
                    <span >
                      <i className="fa fa-bars" />
                    </span>
                  </li>
                </ul>
              </div>
            </span> */}
            <SideNavBar />
            <span>
              <div className='header-content'>
                <img src={Logo} />
              </div>
            </span>
          </div>

        </Col>


        <Col sm={9} className='right-heder-content '>
          <div className='d-flex justify-content-end align-items-center'>
            <ul className='d-flex justify-content-end align-items-center'>
              <li> <span>  <BsFillHouseDoorFill /></span></li>
              <li><span><BsGearFill /></span></li>
              <li>   <span><BsFillBellFill /> </span></li>
            </ul>



            <div className='welcome-box' ><span><BsFillPersonFill /></span>Welcome back ,Kriti</div>          </div>

        </Col>
      </Row >


      <div className="second-header">
        {/* <Row>
            <Col sm={2} className='icon'><BsFillPersonPlusFill />    <span>    Leads</span></Col>
            <Col sm={2} className='icon'><BsPhoneVibrate /><span>  INTERVENE</span></Col>
            <Col sm={2} className='icon'><BsPcDisplay /><span>  Template dashboard</span></Col>
            <Col sm={2} className='icon'><BsChatRightHeart /><span>  Dynamic Bot</span></Col>
            <Col sm={2} className='icon'><BsPersonVideo3 /><span>License & Payment</span></Col>
          </Row> */}
      </div>

    </Box >
    </>
  );
}