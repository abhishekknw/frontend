import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ViewComment from '../modals/ViewComment';
import ViewLeadDetail from './ViewLeadTable';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DataGridTable from './DataGridTable';
const LeadDetailTable = (props) => {
  const [showViewLeads, setShowViewLeads] = useState(false);
  const TableData = [
    {
      campaign_id: 'KRIKRI8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRIK4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'RI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
    {
      campaign_id: 'KRI4EF8',
      name: 'Kriti test',
      start_date: '2022-06-02T12:13:38.632000Z',
      end_date: '2023-01-09T12:13:38.632000Z',
      supplier_count: 21,
      flat_count: 3205,
      purchased_survey: 0,
      campaign_status: 'completed',
      unique_count: 6,
    },
  ];
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
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              handleShow(params);
            }}
          >
            Email Leads
          </Button>
        </strong>
      ),
    },
    {
      field: 'DownloadLeads',
      headerName: 'View Leads	',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            size="small"
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
  function ViewLeads(params) {
    console.log(params);
  }

  return (
    <>
      <DataGridTable row={TableData} columns={columns} />
      <div style={{ height: 400, width: '100%' }}>
        {/* <DataGrid
      rows={TableData}
      getRowId={(row) => row.campaign_id} 
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
    /> */}
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
      {/* {showViewLeads && <ViewLeadTable />} */}
    </>
  );
};

export default LeadDetailTable;
