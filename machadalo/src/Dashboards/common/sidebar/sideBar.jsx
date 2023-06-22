import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// ICONS
import * as FaIcons from 'react-icons/fa'; //Now i get access to all the icons
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { BsFillCaretRightFill } from 'react-icons/bs';

import { IconContext } from 'react-icons';

// ROUTING

import { Link } from 'react-router-dom';

import './Navbar.css';

export default function SideNavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [SidebarData, setSidebarData] = useState([
    {
      title: 'Dashboard',
      path: '/',
      cName: 'nav-text',
      icon: <BsFillCaretRightFill />,
    },
    {
      title: 'Campaign Planning',
      path: '/',
      icon: <BsFillCaretRightFill />,
      cName: 'nav-text',
    },
    {
      title: 'Campaign Execution',
      path: '/',
      icon: <BsFillCaretRightFill />,
      cName: 'nav-text',
    },
    {
      icon: <BsFillCaretRightFill />,
      title: 'Static Form',
      path: '/',
      cName: 'nav-text',
    },
    {
      title: 'Management',
      path: '/',
      cName: 'nav-text',
    },
    {
      title: 'Leads Data',
      path: '/',
      cName: 'nav-text',
    },
    {
      title: 'Intervene MCA',
      path: '/',
      cName: 'nav-text',
    },
    {
      title: 'Dashboard',
      path: '/',
      cName: 'nav-text',
    },
  ]);

  function addRemoveClass(data) {
    let updatedData = SidebarData.map((x) =>
      x.title === data.title ? { ...x, cName: 'nav-text nav-text-active' } : x
    );
    setSidebarData(updatedData);
  }

  return (
    <>
      <IconContext.Provider value={{}} className="navbar-icon">
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <span>
              {' '}
              <FaIcons.FaBars onClick={showSidebar} />
            </span>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="main-icon" onClick={showSidebar} />
              </Link>
            </li>
            {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={(e) => { addRemoveClass(item) }}  >

                  <Link to="#">

                    <span>{item.title}</span>
                    <i>{item.icon}</i>
                  </Link>
                  <div className="first-class">
                    <ul className="first-class-ul">
                      <li className="first-class-li">Campaign Planning</li>
                      <li className="first-class-li">Campaign Execution</li>
                    </ul>
                  </div>
                </li>
              );
            })} */}

            <li
              className="nav-text"
              onClick={(e) => {
                addRemoveClass(item);
              }}
            >
              <Link to="#">
                <span>Dashboard</span>
                <i>
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                  <li className="first-class-li">
                    <Link to="/#/dashboard">
                      <span>Business</span>
                    </Link>
                  </li>
                  <li className="first-class-li">
                    <Link to="/#/dashboard_Business">
                      <span>Business MCA</span>
                    </Link>
                  </li>
                  <li className="first-class-li">
                    <Link to="/#/b2b/dashboard">
                      <span>B2B Client Dashboard</span>
                    </Link>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Operational</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li"><Link to="/r/operations-dashboard">Campaign Report</Link></li>
                      <li className="first-class-li"><Link to="/r/operations-dashboard/entity">Entity Report</Link></li>
                      <li className="first-class-li"><Link to="/r/operations-dashboard/user">User Performance</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-text">
              <Link to="#">
                <span>Campaign Planning</span>
                <i>
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Static</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li"><Link to="/#/campaignDecisionBoard">Campaign Decision Board</Link></li>
                      <li className="first-class-li"><Link to="/r/operations-dashboard/entity">Entity Report</Link></li>
                      <li className="first-class-li"><Link to="/r/operations-dashboard/user">User Performance</Link></li>
                    </ul>
                  </li>
                  <li className="first-class-li"></li>
                  <li className="first-class-li">Dynamic</li>
                </ul>
              </div>
            </li>
            <li className="nav-text">
              <Link to="#">
                Campaign Execution
                <i>
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                  <li className="first-class-li">
                    <Link to="/r/checklist/campaigns">Campaign Checklist</Link>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Leads</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li"><Link to="/#/campaignLeads">Static</Link></li>
                      <li className="first-class-li"><Link to="/r/leads/settings">Dynamic</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-text">
              <Link to="#">
                <span>Static Form</span>
                <i>
                  {' '}
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                  <li className="first-class-li">Manage Supplier</li>
                </ul>
              </div>
            </li>

            <li className="nav-text">
              <Link to="#">
                <span>Management</span>
                <i>
                  {' '}
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                  <li className="first-class-li">My Profile</li>
                  <li className="first-class-li">Organisations</li>
                  <li className="first-class-li">Manage Profile</li>
                  <li className="first-class-li">Roles</li>
                  <li className="first-class-li">Users</li>
                </ul>
              </div>
            </li>
            <li className="nav-text">
              <Link to="#">
                <span>Leads Data</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="#">
                <span>Intervene MCA</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="#">
                <span>Intervene MEA</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="#">
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
