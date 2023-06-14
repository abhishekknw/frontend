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
import UserWiseList from './Tables/UserWiseList';
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
        <div className="machadalo-deshboard">
          <Tabs
            defaultActiveKey="NewLeads"
            id="uncontrolled-tab-example"
            className="mb-1 nav-lead-tab"
          >
            <Tab eventKey="Leads" title="LEADS">
              <DateFilter onDateChange={getDates} />
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
              INTERVENE
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
