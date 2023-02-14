import * as React from 'react';
import DataGridTable from './DataGridTable';
import { Button, Checkbox } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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
    description: 'Type Of Entity',
    headerName: 'TOE',
    width: 60,
  },
  {
    field: 'primary_count',
    numeric: true,
    headerName: 'PC',
    description: 'Primary Count',
    width: 60,
  },
  {
    field: 'city',
    numeric: true,
    headerName: 'City',
    width: 100,
  },
  {
    field: 'area',
    numeric: true,
    headerName: 'Area',
    width: 100,
  },
  {
    field: 'lead_timestamp',
    headerName: 'Lead Stamp',
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
    width: 100,
  },
  {
    field: 'ClientComment',
    headerName: 'Client Comment',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <strong>
        <Button variant="contained" size="small" style={{}} className="theme-btn text-small">
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
        <Button variant="contained" size="small" className="theme-btn text-small" style={{}}>
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

export default function BasicTable(props) {
  const { data } = props;
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    alert(value);
  };

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
        className="page-link"
          count={10}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
}
