import React, { useState } from 'react';
import ClientHeader from '../../Dashboards/headers/Header';
import './index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { BsFillArrowDownLeftCircleFill } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Graph from '../ClientDashboard/Graph.png';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { colors } from '@mui/material';
const ClientDashboard = (props) => {
  return (<>
    <ClientHeader />

    <div className='bg-color'>
      <Container className='pt-4 lead-first-container'>
        <Tabs
          defaultActiveKey="profile"
          id="main-tab"
          className="mb-3 top-main-tab"
          fill
        >
          <Tab eventKey="lead" title="Leads">
            <div className='pt-4'>
              <div className="text-dropdwn d-flex justify-content-between">
                <h4 className='lead-h4'>WELCOME BACK, KATHERINE</h4>
                <div className="dropdown-btn">

                  <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Last day</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Last Month</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Last Year</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div className='pt-2'>
                <Row className='pt-5 '>
                  <Col sm={3} >
                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>Total Leads</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>B2B Leads</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>B2C Leads</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>Last Month</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className='p-5 text-center city-row ms-1 me-1'>

                  <Col sm={4}>

                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillArrowDownLeftCircleFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>User wise</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>City wise</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="d-flex lead-box-first">
                      <div class="me-3">
                        <span class="db-image-icon"><BsFillCloudDownloadFill /></span>
                      </div>
                      <div>
                        <h1>250000</h1>
                        <p>Customer type wise</p>
                      </div>
                    </div>
                  </Col>

                </Row>

                <div className="graph-img text-center">
                  <img src={Graph} alt="graph" />
                </div>
                <Table responsive striped bordered hover className='dashboard-table'  >
                  <thead>
                    <tr className='text-center'>
                      <th>S.No.</th>
                      <th>City Name</th>
                      <th>Total Leads count</th>
                      <th>Current week count</th>
                      <th>Last week count</th>
                      <th>Current month count</th>
                      <th>This quarter count</th>
                      <th> Total comment updated count</th>
                      <th>Total status updated count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td><button className='btn btn-info'>View detail</button></td>
                      <td><button className='btn btn-info'> Email</button></td>
                      <td><button className='btn btn-info'>Download</button></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td><button className='btn btn-info'>View detail</button></td>
                      <td><button className='btn btn-info'> Email</button></td>
                      <td><button className='btn btn-info'>Download</button></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td >Larry the Bird</td>
                      <td>@twitter</td>
                      <td>Larry the Bird</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td><button className='btn btn-info'>View detail</button></td>
                      <td><button className='btn btn-info'> Email</button></td>
                      <td><button className='btn btn-info'>Download</button></td>
                    </tr>
                  </tbody>
                </Table>
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