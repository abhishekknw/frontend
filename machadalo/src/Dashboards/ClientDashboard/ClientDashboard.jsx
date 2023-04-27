import React, { useState } from 'react';
import ClientHeader from '../../Dashboards/headers/Header';
import './index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsCloudDownload } from "react-icons/bs";  
import { BsPeople } from "react-icons/bs";import { BsPinMapFill } from "react-icons/bs";import { BsPersonCheck } from "react-icons/bs"; 
import { BsFillArrowDownLeftCircleFill } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Graph from '../ClientDashboard/Graph.png';
import B2bicon from '../ClientDashboard/clientimage/b2b.png'; 
import B2cicon from '../ClientDashboard/clientimage/b2c.png'; 
import lastmicon from '../ClientDashboard/clientimage/lastmonth.png'; 
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import GraphChart from './Graph';
import UserWiseList from './Tables/UserWiseList';
const ClientDashboard = (props) => {
  const [TabKey, setTabKey] = useState('lead');
  const [layers, setLayers] = useState({ firstLayer: true, secondLayer: false ,thirdLayer: false});

  return (<>
    <ClientHeader />

    <div className='bg-color '>
      <Container fluid className=' lead-first-container p-0'>
        <Tabs
          defaultActiveKey="profile"
          id="main-tab"
          className="mb-3 top-main-tab main-ul-tab bg-white"
          fill
        >
          <Tab eventKey="lead" title="Leads" className='p-4 '>
            <div className='pt-2'>
              <div className="text-dropdwn d-flex justify-content-between">
                <h4 className='lead-h4'>WELCOME BACK, KATHERINE</h4>
                <div className="dropdown-btn">

                  <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      Select
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
              { layers.firstLayer &&
                <Row className='pt-3 '>
                  <Col sm={3} onClick={(e)=>{setLayers({...layers, secondLayer: true})}}>
                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"><BsCloudDownload /></span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>Total Leads</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"> <img src={B2bicon} alt="b2b" /> </span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>B2B Leads</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"><img src={B2cicon} alt="b2c" /></span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>B2C Leads</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"><img src={lastmicon} alt="lastmicon" /></span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>Last Month</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                }
                 { layers.secondLayer &&
                <Row className='p-3 text-center city-row ms-1 me-1 justify-content-center'>

                  <Col sm={3} onClick={(e)=>{setLayers({...layers,thirdLayer:true})}}>

                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"><BsPeople /></span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>User wise</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"><BsPinMapFill /></span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>City wise</p>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="d-flex lead-box-first">
                      <div class="icon-box">
                        <span class="db-image-icon"><BsPersonCheck /></span>
                      </div>
                      <div>
                        <h2 className='h2-heading'>25,000</h2>
                        <p className='span-heading-text'>Customer type wise</p>
                      </div>
                    </div>
                  </Col>

                </Row>
                }
              { layers.thirdLayer &&
                <div className="graph-img text-center">
                  {/* <img src={Graph} alt="graph" /> */}
                  <GraphChart />
                </div>
                }
               { layers.thirdLayer &&  
               <UserWiseList />
                // <Table responsive striped bordered hover className='dashboard-table'  >
                //   <thead>
                //     <tr className='text-center'>
                //       <th>S.No.</th>
                //       <th>City Name</th>
                //       <th>Total Leads count</th>
                //       <th>Current week count</th>
                //       <th>Last week count</th>
                //       <th>Current month count</th>
                //       <th>This quarter count</th>
                //       <th> Total comment updated count</th>
                //       <th>Total status updated count</th>
                //     </tr>
                //   </thead>
                //   <tbody>
                //     <tr>
                //       <td>1</td>
                //       <td>Mark</td>
                //       <td>Otto</td>
                //       <td>@mdo</td>
                //       <td>Otto</td>
                //       <td>@mdo</td>
                //       <td><button className='btn btn-theme'>View detail</button></td>
                //       <td><button className='btn btn-theme'> Email</button></td>
                //       <td><button className='btn btn-theme'>Download</button></td>
                //     </tr>
                //     <tr>
                //       <td>2</td>
                //       <td>Jacob</td>
                //       <td>Thornton</td>
                //       <td>@fat</td>
                //       <td>Otto</td>
                //       <td>@mdo</td>
                //       <td><button className='btn btn-theme'>View detail</button></td>
                //       <td><button className='btn btn-theme'> Email</button></td>
                //       <td><button className='btn btn-theme'>Download</button></td>
                //     </tr>
                //     <tr>
                //       <td>3</td>
                //       <td >Larry the Bird</td>
                //       <td>@twitter</td>
                //       <td>Larry the Bird</td>
                //       <td>Otto</td>
                //       <td>@mdo</td>
                //       <td><button className='btn btn-theme'>View detail</button></td>
                //       <td><button className='btn btn-theme'> Email</button></td>
                //       <td><button className='btn btn-theme'>Download</button></td>
                //     </tr>
                //   </tbody>
                // </Table>
              }
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