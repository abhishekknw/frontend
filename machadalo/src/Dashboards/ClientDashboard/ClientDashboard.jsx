import React, { useState } from 'react';
import './index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsCloudDownload } from 'react-icons/bs';
import { BsPersonCheck } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import { BsPinMapFill } from 'react-icons/bs';
import { BsFillArrowDownLeftCircleFill } from 'react-icons/bs';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import LeadsTable from './Leads/Leads';
import PieChart from '../common/pie-chart/PieChart';
import GraphChart from '../common/Graphs/Graph';
import DateFilter from '../common/date-range-filter/dateFilter';
const ClientDashboard = (props) => {
  const [TabKey, setTabKey] = useState('lead');
  const [layers, setLayers] = useState({ firstLayer: true, secondLayer: false, thirdLayer: false });
  const [addActiveClass, setAddActiveClass] = useState({
    TotalLeads: false,
    B2bLeads: false,
    B2cLeads: false,
    LastCount: false,
    userWise: false,
    cityWise: false,
    customerType: false,
  });

  const handleClick = (card) => {
    setAddActiveClass({ ...addActiveClass, TotalLeads: true });
  };

  function getDates(date) {
    // console.log(date)
  }

  console.log(addActiveClass);
  return (
    <>
      <div className="container">
        <div className="machadalo-deshboard client-tabs">
          <Tabs
            defaultActiveKey="NewLeads"
            id="uncontrolled-tab-example"
            className="mb-1 nav-lead-tab"
          >
            <Tab eventKey="Leads" title="LEADS">
              {/* <DateFilter onDateChange={getDates} /> */}
              <div className="row pt-0 ">
                <div className="col-md-7">
                  <div className="graph-chart">
                    <GraphChart />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="piechart">
                    <PieChart />
                  </div>
                </div>
              </div>
              <div className="pb-5">
                <LeadsTable />
              </div>
            </Tab>
            <Tab eventKey="intervene" title="INTERVENE">
              <script
                src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
                integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
                crossOrigin="anonymous"
              ></script>

              <div className="container" id="no-more-tables">
                <p>&nbsp;</p>
                <table className="table table-hover">
                  <thead>
                    <tr className="active">
                      <th className="col-xs-2">
                        <strong>WO Ref</strong>
                      </th>
                      <th className="col-xs-2">
                        <strong>Reported</strong>
                      </th>
                      <th className="col-xs-6">
                        <strong>Type</strong>
                      </th>
                      <th className="col-xs-2">
                        <strong>Completed</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      role="button"
                      data-toggle="collapse"
                      href="#demo1"
                      aria-expanded="false"
                      aria-controls="demo1"
                    >
                      <td data-title="WO Ref">12345</td>
                      <td data-title="Reported">12/05/2015</td>
                      <td data-title="Type">A plumbing job</td>
                      <td data-title="Completed">01/06/2015</td>
                    </tr>
                    <tr>
                      <td colSpan="6" className="hiddenRow">
                        <div className="collapse" id="demo1">
                          <table className="table table-nested">
                            <tbody>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active">
                                  <strong>Description</strong>
                                </td>
                                <td>
                                  07777 123456 ferroli flashing fault 37 no htg or hot water gas
                                  boiler no alt form of hot water
                                </td>
                              </tr>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active">
                                  <strong>Action taken</strong>
                                </td>
                                <td>The work was completed by the contractor on 04-FEB-2013</td>
                              </tr>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active">
                                  <strong>Contractor name</strong>
                                </td>
                                <td>PMD North West</td>
                              </tr>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active" rowSpan="2">
                                  <strong>Job lines</strong>
                                </td>
                                <td>1. Gutter:Clean/Flush Out(Per Elev) Gutter</td>
                              </tr>
                              <tr>
                                <td>2. Inspection:Provide/Erect Ladder Inspection</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                    <tr
                      role="button"
                      data-toggle="collapse"
                      href="#demo2"
                      aria-expanded="false"
                      aria-controls="demo2"
                    >
                      <td data-title="WO Ref">67890</td>
                      <td data-title="Reported">20/04/2015</td>
                      <td data-title="Type">An electrical job</td>
                      <td data-title="Completed">01/05/2015</td>
                    </tr>
                    <tr>
                      <td colSpan="6" className="hiddenRow">
                        <div className="collapse" id="demo2">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active">
                                  <strong>Description</strong>
                                </td>
                                <td>
                                  07777 123456 ferroli flashing fault 37 no htg or hot water gas
                                  boiler no alt form of hot water
                                </td>
                              </tr>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active">
                                  <strong>Action taken</strong>
                                </td>
                                <td>The work was completed by the contractor on 04-FEB-2013</td>
                              </tr>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active">
                                  <strong>Contractor name</strong>
                                </td>
                                <td>PMD North West</td>
                              </tr>
                              <tr>
                                <td className="col-xs-4 col-sm-2 active" rowSpan="2">
                                  <strong>Job lines</strong>
                                </td>
                                <td>1. Gutter:Clean/Flush Out(Per Elev) Gutter</td>
                              </tr>
                              <tr>
                                <td>2. Inspection:Provide/Erect Ladder Inspection</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab eventKey="template_dashboard" title="TEMPLATE DASHBOARD">
              TEMPLATE
            </Tab>
            <Tab eventKey="dynamic_bots" title="DYNAMIC BOT">
              Dynamic
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
