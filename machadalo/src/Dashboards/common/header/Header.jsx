import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillBellFill, BsFillPersonFill, BsFillHouseDoorFill, BsGearFill } from 'react-icons/bs';
import Logo from './logo.png';
import './header.css';
import SideNavBar from '../sidebar/sideBar';
import { userInformationAtom } from '../../_states';
import { useRecoilValue } from 'recoil';

export default function MachadaloHeader(props) {
  const userInfo = useRecoilValue(userInformationAtom);
  const settingDrop = [
    { lable: 'View Logs', value: '/#/loginLogs' },
    { lable: 'Change Password', value: '/#/changePassword' },
    { lable: 'Logout', value: '/#/logout' },
  ];
  function redirect(page) {
    window.location.href = `${page}`;
  }
  return (
    <>
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

        <Col sm={9} className="right-heder-content">
          <div className="d-flex justify-content-end align-items-center mobile-con-between">
            <ul className="d-flex justify-content-end align-items-center mb-0 mobile-start">
              <li>
                <a href="/#/manageCampaign/create">
                  <span>
                    <BsFillHouseDoorFill />
                  </span>
                </a>
              </li>
              <li>
                <Dropdown className="setting-icon">
                  <Dropdown.Toggle variant="success" id="setting-dropdown">
                    <BsGearFill />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {settingDrop.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          eventKey={item?.value}
                          onClick={(e) => {
                            redirect(item?.value);
                          }}
                        >
                          {item?.lable}
                        </Dropdown.Item>
                      );
                    })}
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
              {userInfo?.first_name?.toUpperCase() + ' ' + userInfo?.last_name?.toUpperCase()}
            </div>{' '}
          </div>
        </Col>
      </Row>
    </>
  );
}
