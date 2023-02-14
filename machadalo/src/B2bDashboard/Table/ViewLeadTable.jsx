import React, { useState } from 'react';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import ViewComment from '../modals/ViewComment';
import { Button } from '@mui/material';
import DataGridTable from './DataGridTable';

const ViewLeadDetail = (props) => {
  const row = [
    {
      _id: '63ac2812db3c2f3b4',
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
      _id: '22222',
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
      _id: '63ac28ce722cd37eb',
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
      _id: '63ac283b4ce7cd37eb11',
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
  const headCells = [
    {
      field: 'checkbox',
      headerName: 'Select',
      width: 50,
      renderCell: (params) => <>1</>,
    },
    {
      field: 'entity_name',
      headerName: 'Supplier Name',
      width: 200,
    },
    {
      field: 'entity_name',
      numeric: true,
      description: 'Type Of Entity',
      headerName: 'TOE',
      width: 60,
    },
    {
      field: 'entity_type',
      numeric: true,
      headerName: 'Supplier Type',
      width: 60,
    },
    {
      field: 'area',
      numeric: true,
      headerName: 'Area',
    },
    {
      field: 'city',
      numeric: true,
      headerName: 'City',
    },
    {
      field: 'primary_count',
      headerName: 'Flat Count',
      numeric: true,
      width: 100,
    },
    {
      field: 'supplier_secondary_count',
      headerName: 'Tower Count',
      numeric: true,
      width: 100,
    },
    {
      field: 'lead_timestamp',
      numeric: true,
      sortable: true,
      headerName: 'Lead Time Stamp',
    },
    {
      field: 'CurrentStatus',
      numeric: true,
      sortable: false,
      headerName: 'Current Status',
      width: 200,
      renderCell: (params) => (
        <>
          <select>
            <option>Leads Verified By Machadalo</option>
            <option>Leads Verified By Machadalo</option>
            <option>Leads Verified By Machadalo</option>
            <option>Leads Verified By Machadalo</option>
            <option>Leads Verified By Machadalo</option>
            <option>Leads Verified By Machadalo</option>
            <option>Leads Verified By Machadalo</option>
          </select>
        </>
      ),
    },
    {
      field: 'ClientComment',
      headerName: 'Client Comment',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button variant="contained" size="small" style={{ marginLeft: 16 }}>
            View Comment
          </Button>
        </strong>
      ),
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button variant="contained" size="small" style={{ marginLeft: 16 }}>
            Lead Details
          </Button>
        </strong>
      ),
    },
  ];
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const viewComment = (e, data) => {
    handleShow();
  };

  return (
    <>
    {/* FILTER ICON nd search */}
      <DataGridTable
        row={row}
        columns={headCells}
        styles={{ height: 400, width: '100%' }}
        classNames="data-b2b-table"
      />
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

export default ViewLeadDetail;
