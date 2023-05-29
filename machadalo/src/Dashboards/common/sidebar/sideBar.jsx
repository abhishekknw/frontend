import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { BsChevronRight } from 'react-icons/bs';

import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

import "./Navbar.css";

export default function SideNavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const SidebarData = [
    {
      title: "Dashboard",
      path: "/",
      cName: "nav-text",
      icon: <BsChevronRight />
    },
    {
      title: "Campaign Planning",
      path: "/reports",
      icon: <BsChevronRight />,
      cName: "nav-text"
    },
    {
      title: "Campaign Execution",
      path: "/products",
      icon: <BsChevronRight />,
      cName: "nav-text"
    },
    {
      icon: <BsChevronRight />,
      title: "Static Form",
      path: "/team",
      cName: "nav-text"
    },
    {
      title: "Management",
      path: "/",
      cName: "nav-text"
    },
    {
      title: "Leads Data",
      path: "/support",
      cName: "nav-text"
    },
    {
      title: "Intervene MCA",
      path: "/",
      cName: "nav-text"
    },
    {
      title: "Dashboard",
      path: "/",
      cName: "nav-text"
    }
  ];


  return (
    <>
      <IconContext.Provider value={{}} className="navbar-icon">
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <span> <FaIcons.FaBars onClick={showSidebar} /></span>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars" >
                <AiIcons.AiOutlineClose className="main-icon" onClick={showSidebar}/>
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
