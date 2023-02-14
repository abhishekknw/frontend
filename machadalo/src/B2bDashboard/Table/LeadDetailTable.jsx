import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ViewComment from '../modals/ViewComment';
import ViewLeadDetail from './ViewLeadTable';
import * as React from 'react';
import { Button } from '@mui/material';
import DataGridTable from './DataGridTable';
import FormControl from '@mui/material/FormControl';
import EmailIcon from '@mui/icons-material/Email';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import InputLabel from '@mui/material/InputLabel';
const LeadDetailTable = (props) => {
  const [params, setParams] = useState({
    leadType: 'Leads',
    supplierType: 'all',
    search: '',
    page: 0,
    userType: '',
  });
  const [showViewLeads, setShowViewLeads] = useState(false);
  const columns = [
    { field: 'campaign_id', headerName: 'Index', sortable: false, width: 70 },
    { field: 'name', headerName: 'Camaign Name', sortable: false, width: 130 },
    { field: 'start_date', headerName: 'Start Date', width: 130 },
    { field: 'supplier_count', headerName: 'Supplier Count', type: 'number', width: 90 },
    {
      field: 'ViewLeads',
      headerName: 'View Leads	',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              setShowViewLeads(true);
            }}
          >
            View Leads
          </Button>
        </strong>
      ),
    },
    {
      field: 'EmailLeads',
      headerName: 'View Leads	',
      description: 'Send Emails',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              handleShow(params);
            }}
            startIcon={<EmailIcon />}
          >
            Email Leads
          </Button>
        </strong>
      ),
    },
    {
      field: 'DownloadLeads',
      headerName: 'View Leads	',
      description: 'Download Leads',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            startIcon={<CloudDownloadIcon />}
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              handleShow(params);
            }}
          >
            Download Leads
          </Button>
        </strong>
      ),
    },
    {
      field: 'CreateField',
      headerName: 'View Leads	',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <strong>
          <Button
            className="theme-btn"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              handleShow(params);
            }}
          >
            Create Field
          </Button>
        </strong>
      ),
    },
  ];

  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <DataGridTable
        row={props.data}
        columns={columns}
        styles={{ height: 400, width: '100%' }}
        classNames="small-height-table data-b2b-table"
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
      {showViewLeads && <ViewLeadDetail />}
    </>
  );
};

export default LeadDetailTable;
