import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LeadDecisionPending from './Basic/LeadDecisionPending';
import LeadDetail from './Detail/LeadDetail';
import Container from '@mui/material/Container';
import './index.css';
import NewLeadsBasic from './Basic/NewLeadTab/newLeadsBasic';

const B2bDashboard = (props) => {
  const [key, setKey] = useState('Basic');
  const [basicKey, setBasicKey] = useState('Pending');
  return (
    <>
      <div className="tab-wrapper-main">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 main-b2b-tab"
        >
          <Tab eventKey="Basic" title="Basic">
            <Tabs
              id="controlled-tab-example"
              activeKey={basicKey}
              onSelect={(k) => setBasicKey(k)}
              className="mb-3 inner-b2b-tab"
            >
              <Tab eventKey="Pending" title="Lead-(Decision Pending)">
                {basicKey == 'Pending' && <LeadDecisionPending />}
              </Tab>
              <Tab eventKey="NewLeads" title="New Leads">
                {basicKey == 'NewLeads' && <NewLeadsBasic />}
              </Tab>
            </Tabs>
          </Tab>
          <Tab eventKey="Detail" title="Detail">
            {key == 'Detail' && <LeadDetail />}
          </Tab>
          <Tab eventKey="Payment" title="Licenses & Payment">
            <div>Licenses & Payment</div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default B2bDashboard;
