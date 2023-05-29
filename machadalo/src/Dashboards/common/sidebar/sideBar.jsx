import React, { useState } from "react";

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
              <Link to="#" className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose className="main-icon" />

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

            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                </div>
              </div>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
