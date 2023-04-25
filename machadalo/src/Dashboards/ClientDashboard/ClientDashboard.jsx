import React, { useState } from 'react';
import ClientHeader from '../../Dashboards/headers/Header';
import './index.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const ClientDashboard = (props) => {
  return (<>
    <ClientHeader />
    <div className='pt-4'>
      <Container>
        <h4>WELCOME BACK, KATHERINE</h4>
      </Container>
    </div>
    <div>
      <Container>
        <Row className='pt-5'>
          <Col sm={3}>
            <div>
            <div>
              <span>image</span>
            </div>
            <div>
              <span className='count-num'>32,600</span><br />
              <span className='count-value'>total downloads</span>
            </div>
            </div>
          </Col>
          <Col sm={3}>
            <div>
              <div>
                <span>image</span>
              </div>
              <div>
                <span className='count-num'>32,600</span><br />
                <span className='count-value'>total downloads</span>
              </div>
            </div>
          </Col>
          <Col sm={3}>
            <div>  <div>
              <span>image</span>
            </div>
            <div>
              <span className='count-num'>32,600</span><br />
              <span className='count-value'>total downloads</span>
            </div>     </div>
          </Col>
          <Col sm={3}>
            <div>  <div>
              <span>image</span>
            </div>
            <div>
              <span className='count-num'>32,600</span><br />
              <span className='count-value'>total downloads</span>
            </div>     </div>
          </Col>
        </Row>
      </Container>
    </div>
  </>
  );
};

export default ClientDashboard;
