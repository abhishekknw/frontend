import * as React from 'react';
import DataGridTable from './DataGridTable';
import { Button, Checkbox } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import ViewComment from '../modals/ViewComment';
export default function BasicTable(props) {
  const { data } = props;
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleChange = (event, value) => {
    setPage(value);
    alert(value);
  };
  const viewCommentModal = (e, params) => {
    setOpen(true);
  };
  const headCells = [
    {
      field: 'checkbox',
      headerName: 'Select',
      width: 60,
      renderCell: (params) => (
        <>
          <Checkbox />
        </>
      ),
    },
    {
      field: 'entity_name',
      headerName: 'Entity Name',
      width: 200,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'entity_type',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      description: 'Type Of Entity',
      headerName: 'TOE',
      width: 60,
    },
    {
      field: 'primary_count',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      headerName: 'PC',
      description: 'Primary Count',
      width: 60,
    },
    {
      field: 'city',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      headerName: 'City',
      width: 100,
    },
    {
      field: 'area',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      headerName: 'Area',
      width: 100,
    },
    {
      field: 'lead_timestamp',
      headerName: 'Lead Stamp',
      headerClassName: 'super-app-theme--header',
      width: 100,
    },
    {
      field: 'CurrentStatus',
      numeric: true,
      sortable: false,
      headerName: 'Current Status',
      width: 230,
      renderCell: (params) => (
        <>
          <select className="select-b2b">
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
      field: 'phone_number',
      numeric: true,
      headerName: 'Phone Number',
      sortable: false,
      width: 100,
    },
    {
      field: 'ClientComment',
      headerName: 'Client Comment',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            size="small"
            className="theme-btn text-small"
            onClick={(e) => {
              viewCommentModal(e, params);
            }}
          >
            View Comment
          </Button>
        </strong>
      ),
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button variant="contained" size="small" className="theme-btn text-small">
            Accept
          </Button>
          <Button
            variant="contained"
            size="small"
            className="theme-btn text-small"
            style={{ marginLeft: 16 }}
          >
            Decline
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <>
      {data.length > 0 && (
        <DataGridTable
          row={data.lead}
          columns={headCells}
          styles={{ height: 400, width: '100%' }}
          classNames="data-b2b-table"
        />
      )}
      <Stack spacing={2}>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChange}
        />
      </Stack>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ViewComment />
        </Modal>
      </div>
    </>
  );
}
