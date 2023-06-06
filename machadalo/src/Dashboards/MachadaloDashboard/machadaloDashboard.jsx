import React from 'react';
import MachadaloHeader from '../common/header/Header';
import DateFilter from '../common/date-range-filter/dateFilter';
import GraphChart from '../common/Graphs/Graph';
import LeadsTable from './Leads';
import PieChart from '../common/pie-chart/PieChart';
import { newLeadActions } from '../_actions/Machadalo/newLead.actions';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import CampaignList from './NewLeads/CampaignList';
import NewLeadsTab from './NewLeads/NewLeads';
export default function MachadaloDashboard(props) {
  const NewLeadAction = newLeadActions();
  NewLeadAction.getAllCampaigns();
  function getDates(date) {
    // console.log(date)
  }
  return (
    <>
      <div className="container">
        <div className="machadalo-deshboard">
          <MachadaloHeader />
          {/* tabs start */}
          <Tabs
            defaultActiveKey="NewLeads"
            id="uncontrolled-tab-example"
            className="mb-3 nav-lead-tab"
          >
            <Tab eventKey="NewLeads" title="New Leads">
              <NewLeadsTab />
            </Tab>
            <Tab eventKey="LeadDetail" title="Lead Detail">
              <DateFilter onDateChange={getDates} />
              <div className='row pt-5'>
                <div className='col-md-6'>
                <div className="graph-chart">
                  <GraphChart />
                </div>
                </div> 
                <div className='col-md-6'>
                <div className="piechart">
                    <PieChart />
                  </div>
                </div>
              </div>
              
              <div className="pb-5">
                <LeadsTable />
              </div>
            </Tab>
          </Tabs>
          {/* tabs start */}
        </div>
      </div>
    </>
  );
}
