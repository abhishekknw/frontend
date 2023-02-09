import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ViewComment from '../modals/ViewComment';
import dropdown from '../common/Common';

const BasicTable = (props) => {
  const data = [
    {
      _id: '63ac281db3cf3b4',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 1,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac23b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 3,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac28ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac283b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63a3b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac28e7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac284ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 3,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac28b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac2814ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 4,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac2b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 4,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac3cf3b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 550,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac281db3cf3b4ce7cdb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac281d4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63a3b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 467,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac2b4ce7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 560,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
    {
      _id: '63ac7cd37eb',
      requirement_id: 9924,
      supplier_id: 'CVLOKFVSXAYWG',
      entity_name: 'Akash Apartments',
      entity_type: 'RS',
      primary_count: 67,
      area: 'Kaushambi',
      city: 'Mumbai',
      lead_timestamp: '2022-12-28 04:57 PM',
      client_status: 'Decision Pending',
      macchadalo_client_comment: null,
      macchadalo_client_status: null,
      updated_at: '2022-12-28 04:57 PM',
      phone_number: '70********',
      rating: 3,
      last_comment: '',
    },
  ];
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function actionButton(row) {
    return (
      <>
        <Button>Lead Details</Button>
        <br />
      </>
    );
  }
  function commentButton(cell, row) {
    return (
      <>
        <Button onClick={(e) => viewComment(cell, row)}>View Comment</Button>
        <br />
      </>
    );
  }
  function Status(cell, row) {
    return (
      <>
        <div>
          <select>
            <option value="fruit">Leads Verified By Machadalo</option>
            <option value="vegetable">Leads Verified By Client</option>
            <option value="meat">Leads Verified By Machadalo</option>
            <option value="meat">Leads Verified By Machadalo</option>
            <option value="meat">Ringing Not Responding</option>
            <option value="meat">Current Not a Decision Maker</option>
            <option value="meat">Leads Verified By Machadalo</option>
            <option value="meat">Meeting confirmed</option>
          </select>
        </div>
      </>
    );
  }
  function checkBox(cell, row) {
    return (
      <>
        <input type="checkbox"></input>
      </>
    );
  }
  const viewComment = (e, data) => {
    handleShow();
  };

  return (
    <>
      <div className="bootstrap-iso">
        <h4>Leads of Kriti test</h4>
        <BootstrapTable data={data} striped={true}>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'SN' }}
            width={'100px'}
            dataField={'index'}
            dataFormat={checkBox}
          >
            SELECT
          </TableHeaderColumn>
          <TableHeaderColumn isKey dataField="entity_name">
            Entity Name
          </TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'entity_type' }}
            dataField="entity_type"
            dataSort={true}
            searchable={false}
          >
            TOE
          </TableHeaderColumn>
          <TableHeaderColumn dataField="primary_count" dataSort={true} searchable={false}>
            PC
          </TableHeaderColumn>
          <TableHeaderColumn tdAttr={{ 'data-attr': 'area' }} dataField="area">
            AREA
          </TableHeaderColumn>
          <TableHeaderColumn tdAttr={{ 'data-attr': 'city' }} dataField="city">
            CITY
          </TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'lead_timestamp' }}
            dataField="lead_timestamp"
            dataSort={true}
            searchable={false}
          >
            LEAD STAMP
          </TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'macchadalo_client_status' }}
            dataField="macchadalo_client_status"
            dataFormat={Status}
          >
            CLIENT STATUS
          </TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'phone_number' }}
            dataField="phone_number"
            dataSort={true}
            searchable={false}
          >
            PHONE NUMBER
          </TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'Client Comment' }}
            dataField="Client Comment"
            dataFormat={commentButton}
          >
            CLIENT COMMENT
          </TableHeaderColumn>
          <TableHeaderColumn
            tdAttr={{ 'data-attr': 'Action' }}
            dataField="Action"
            dataFormat={actionButton}
          >
            ACTION
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewComment />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default BasicTable;
