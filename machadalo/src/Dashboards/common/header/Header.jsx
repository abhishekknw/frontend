import React from 'react';
import { Box, Link } from '@mui/material';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillBellFill, BsFillPersonFill, BsFillHouseDoorFill, BsGearFill } from 'react-icons/bs';
import Logo from './logo.png';
import './header.css';
import SideNavBar from '../sidebar/sideBar';

export default function MachadaloHeader(props) {
  return (
    <>
      <Box className="pt-1">
        <Row>
          <Col sm={3}>
            <div className="d-flex align-items-center mobile-con-between">
              <SideNavBar />
              <span>
                <div className="header-content">
                  <img src={Logo} />
                </div>
              </span>
            </div>
          </Col>

          <Col sm={9} className="right-heder-content ">
            <div className="d-flex justify-content-end align-items-center mobile-con-between">
              <ul className="d-flex justify-content-end align-items-center mb-0 mobile-start">
                <li>
                  <Link to="/#/manageCampaign/create">
                    <span>
                      <BsFillHouseDoorFill />
                    </span>
                  </Link>
                </li>
                <li>
                  <Dropdown className="setting-icon">
                    <Dropdown.Toggle variant="success" id="setting-dropdown">
                      <BsGearFill />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item><Link to="#">Change Password</Link></Dropdown.Item>
                      <Dropdown.Item><Link to="/#/logout/">Logout</Link></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  {' '}
                  <span>
                    <BsFillBellFill />{' '}
                  </span>
                </li>
              </ul>
              <div className="welcome-box">
                <span>
                  <BsFillPersonFill />
                </span>
                Welcome back ,Kriti
              </div>{' '}
            </div>
          </Col>
        </Row>
      </Box>
    </>
  );
}
