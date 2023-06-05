import React from 'react';
import MachadaloHeader from '../common/header/Header';
import DateFilter from '../common/date-range-filter/dateFilter';
import GraphChart from '../common/Graphs/Graph';
import LeadsTable from './Leads';
import PieChart from '../common/pie-chart/PieChart';
import {newLeadActions} from '../_actions/Machadalo/newLead.actions';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

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
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3 nav-lead-tab"
          >
            <Tab eventKey="home" title="Lead">

              <Table striped bordered hover className='dash-table'>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Area</th>
                    <th>City</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>testing</td>
                    <td>testing</td>
                    <td>testing</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>testing</td>
                    <td>testing</td>
                    <td>testing</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>testing</td>
                    <td>testing</td>
                    <td>testing</td>
                  </tr>
                </tbody>
              </Table>

            </Tab>
            <Tab eventKey="profile" title="Lead Detail">
              Tab content for Profile
            </Tab>
          </Tabs>
          {/* tabs start */}
          <DateFilter onDateChange={getDates} />
          <div className="dx">
            <div className="graph-chart">
              <GraphChart />
            </div>
            <div className="pc">
              <div className="piechart">
                <PieChart />
              </div>
            </div>
          </div>
          <div className="pb-5">
            <LeadsTable />
          </div>
        </div>
      </div>
    </>
  );
}
