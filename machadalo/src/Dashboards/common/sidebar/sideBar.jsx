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
            <li className="nav-text">
              <Link to="#">
                <span>Dashboard</span>
                <i>
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                  <li className="first-class-li">
                    <a href="/#/dashboard">
                      <span>Business</span>
                    </a>
                  </li>
                  <li className="first-class-li">
                    <a href="/#/dashboard_Business">
                      <span>Business MCA</span>
                    </a>
                  </li>
                  <li className="first-class-li">
                    <a href="/#/b2b/dashboard">
                      <span>B2B Client Dashboard</span>
                    </a>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a href="">
                      <span>Operational</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li">
                        <Link to="/r/operations-dashboard">Campaign Report</Link>
                      </li>
                      <li className="first-class-li">
                        <Link to="/r/operations-dashboard/entity">Entity Report</Link>
                      </li>
                      <li className="first-class-li">
                        <Link to="/r/operations-dashboard/user">User Performance</Link>
                      </li>
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
                    <a href="">
                      <span>Static</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li">
                        <abbr href="/#/campaignDecisionBoard">Campaign Decision Board</abbr>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/CampaignList">List Of Campaign</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/HDFHDF0789/releasePlan">Booking Plan</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/SuspenseLeadSheet">Suspense Lead Sheet</a>
                      </li>
                    </ul>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a href="">
                      <span>Dynamic</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li nav-text second-class-child-li">
                        <a href="">
                          <span>Supplier</span>
                          <i>
                            <BsFillCaretRightFill />
                          </i>
                        </a>
                        <ul className="first-class-ul second-class-child">
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/supplier/base-type/list">Standard Templates</Link>
                            {/* </a> */}
                          </li>
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/supplier/type/list">Manage Supplier Type</Link>
                            {/* </a> */}
                          </li>
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/supplier/list">Manage Supplier</Link>
                            {/* </a> */}
                          </li>
                        </ul>
                      </li>
                      <li className="first-class-li nav-text second-class-child-li">
                        <a>
                          <span>Inventory</span>
                          <i>
                            <BsFillCaretRightFill />
                          </i>
                        </a>
                        <ul className="first-class-ul second-class-child">
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/inventory/base/list">Standard Template</Link>
                            {/* </a> */}
                          </li>
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/inventory/list">Manage Inventory</Link>
                            {/* </a> */}
                          </li>
                        </ul>
                      </li>
                      <li className="first-class-li nav-text second-class-child-li">
                        <a>
                          <span>Booking Engine</span>
                          <i>
                            <BsFillCaretRightFill />
                          </i>
                        </a>
                        <ul className="first-class-ul second-class-child">
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/booking/base/list">Standard Templates</Link>
                            {/* </a> */}
                          </li>
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/booking/template/list">Booking Templates</Link>
                            {/* </a> */}
                          </li>
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <Link to="/r/booking/campaigns">Manage Bookings</Link>
                            {/* </a> */}
                          </li>
                        </ul>
                      </li>
                      <li className="first-class-li nav-text second-class-child-li">
                        <a>
                          <span>Campaign Release</span>
                          <i>
                            <BsFillCaretRightFill />
                          </i>
                        </a>
                        <ul className="first-class-ul second-class-child">
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <a href="/#/HDFHDF0789/auditReleasePlan">Release and Audit Plan </a>
                            {/* </a> */}
                          </li>
                          <li className="first-class-li nav-text first-class-child-main">
                            {/* <a> */}
                            <a href="/#">Manage Phases</a>
                            {/* </a> */}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-text">
              <Link to="">
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
                  <li className="first-class-li">
                    <Link to="/r/checklist/settings/permissions/list">Settings</Link>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Leads</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li">
                        <a href="/#/campaignLeads">Capture Leads</a>
                      </li>
                      <li className="first-class-li">
                        <Link to="/r/leads/settings">Assign Permission</Link>
                      </li>
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
                  <li className="first-class-li">
                    <a href="/#/login">Manage Supplier</a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-text">
              <Link to="#">
                <span>Management</span>
                <i>
                  <BsFillCaretRightFill />
                </i>
              </Link>
              <div className="first-class">
                <ul className="first-class-ul">
                  <li className="first-class-li">
                    <a href="/#/manageMent/aboutYou">My Profile</a>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Organization</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li">
                        <a href="/#/manageMent/organisationView">View</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/manageMent/organisationOnBoard">On Boarding</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/manageMent/mapOrganisations">Organizations Mapping</a>
                      </li>
                    </ul>
                  </li>
                  <li className="first-class-li">Manage Profile</li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Roles</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li">
                        <a href="#/manageMent/createRoles">Create</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/manageMent/assignRole">Assign</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/manageMent/viewRole">View</a>
                      </li>
                    </ul>
                  </li>
                  <li className="first-class-li nav-text first-class-child-main">
                    <a>
                      <span>Users</span>
                      <i>
                        <BsFillCaretRightFill />
                      </i>
                    </a>
                    <ul className="first-class-child first-class-ul">
                      <li className="first-class-li">
                        <a href="/#/manageMent/createUser">Create User</a>
                      </li>
                      <li className="first-class-li">
                        <a href="/#/manageMent/viewUsers">Update</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-text">
              <a href="/#/lead-data">
                <span>Leads Data</span>
              </a>
            </li>
            <li className="nav-text">
              <a href="/#/intervene">
                <span>Intervene MCA</span>
              </a>
            </li>
            <li className="nav-text">
              <a href="/#/intervene/mea">
                <span>Intervene MEA</span>
              </a>
            </li>
            {/* <li className="nav-text">
              <Link to="/r/pages/interveneChat">
                <span>Intervene Chat</span>
              </Link>
            </li> */}
            <li className="nav-text">
              <Link to="/r/pages/campaign-list">
                <span>Campaign List</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/r/pages/opsdashboard">
                <span>Ops Dashboard</span>
              </Link>
            </li>
            <li className="nav-text">
              <a href="/#/templateDashboard">
                <span>Template Dashboard MCA</span>
              </a>
            </li>
            <li className="nav-text">
              <a href="/#/templateDashboardMea">
                <span>Template Dashboard MEA</span>
              </a>
            </li>
            <li className="nav-text">
              <Link to="/r/dashboard/machadalo">
                <span>Machadalo Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
