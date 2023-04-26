import React, { useState } from 'react';
import ClientHeader from '../../Dashboards/headers/Header';
import './index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFillCloudDownloadFill } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { colors } from '@mui/material';
const ClientDashboard = (props) => {
  return (<>
    <ClientHeader />

    <div className=''>
      <Container className='pt-4'>
        <Tabs
          defaultActiveKey="profile"
          id="main-tab"
          className="mb-3 top-main-tab"
          fill
        >
          <Tab eventKey="lead" title="Leads">
            <div className='pt-4'>

              <h4>WELCOME BACK, KATHERINE</h4>
              <div className='pt-2'>
              <Row className='pt-5'>
          <Col sm={3}>
          <div className="d-flex">
              <div class="me-3">
                <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
              </div>
              <div>
                <h4>250000</h4>
                <p>Total downloads</p>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div className="d-flex">
              <div class="me-3">
                <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
              </div>
              <div>
                <h4>250000</h4>
                <p>Total downloads</p>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div className="d-flex">
              <div class="me-3">
                <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
              </div>
              <div>
                <h4>250000</h4>
                <p>Total downloads</p>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div className="d-flex">
              <div class="me-3">
                <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
              </div>
              <div>
                <h4>250000</h4>
                <p>Total downloads</p>
              </div>
            </div>
          </Col>
        </Row>
              </div>
            </div>
          </Tab>
          <Tab eventKey="pay" title="Payment & Licsence">
            Tab content for Profile
          </Tab>
          <Tab eventKey="templete" title="templete">
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="bot" title="Dynamic Bot" >

          </Tab>
        </Tabs>
      
      </Container>
    </div>
  </>
  );
};

export default ClientDashboard;