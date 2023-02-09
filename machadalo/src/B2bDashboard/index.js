import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Header from './common/b2bHeader';
import LeadDecisionPending from './Basic/LeadDecisionPending';
import LeadDetail from './Detail/LeadDetail';
import './index.css';

const B2bDashboard = (props) => {
  console.log(props)
  const [key, setKey] = useState('Basic');
  const [basicKey, setBasicKey] = useState('Pending');
  return (
    <>
      <Header />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Basic" title="Basic">
          <Tabs
            id="controlled-tab-example"
            activeKey={basicKey}
            onSelect={(k) => setBasicKey(k)}
            className="mb-3"
          >
            <Tab eventKey="Pending" title="Lead-(Decision Pending)">
              <LeadDecisionPending />
            </Tab>
            <Tab eventKey="NewLeads" title="New Leads">
              <div> New Leads</div>
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="Detail" title="Detail">
          <LeadDetail />
        </Tab>
        <Tab eventKey="Payment" title="Licenses & Payment">
          <div>Licenses & Payment</div>
        </Tab>
      </Tabs>
    </>
  );
};

export default B2bDashboard;
