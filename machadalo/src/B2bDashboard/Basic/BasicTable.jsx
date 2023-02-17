import * as React from 'react';
import DataGridTable from '../Table/DataGridTable';
import { Button, Checkbox } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ClientStatusDropdown from '../common/ClientStatus';
import ViewCommentModal from '../modals/ViewComment';
import { useRecoilValue } from 'recoil';
import { leadDecisionPendingListAtom } from '../API/_state';

export default function BasicTable(props) {
  const ListData = useRecoilValue(leadDecisionPendingListAtom);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    alert(value);
  };

  const headCells = [
    {
      field: 'checkbox',
      headerName: 'Select',
      width: 65,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'select-box-cell',
      headerAlign: 'left',
      renderCell: (params) => (
        <>
        <div className=''>
          <Checkbox />
          </div>
        </>
      ),
    },
    {
      field: 'entity_name',
      headerName: 'Entity Name',
      width: 140,
      headerAlign: 'left',
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'entity_type',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      description: 'Type Of Entity',
      headerName: 'TOE',
      width: 40,
    },
    {
      field: 'primary_count',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      headerName: 'PC',
      description: 'Primary Count',
      width: 40,
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
      width: 140,
    },
    {
      field: 'CurrentStatus',
      numeric: true,
      sortable: false,
      headerName: 'Current Status',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <>
          <ClientStatusDropdown data={params} />
        </>
      ),
    },
    {
      field: 'phone_number',
      numeric: true,
      headerClassName: 'super-app-theme--header',
      headerName: 'Phone Number',
      sortable: false,
      width: 120,
    },
    {
      field: 'ClientComment',
      headerName: 'Client Comment',
      width: 125,
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell center-div',
      sortable: false,
      renderCell: (params) => (
        <>
          <ViewCommentModal data={params} />
        </>
      ),
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'super-app-theme--header',
      cellClassName: 'super-app-theme--cell center-div',
      renderCell: (params) => (
        <strong>
          <Button variant="contained" size="small" className="theme-btn text-small">
            Accept
          </Button>
          <Button
            variant="contained"
            size="small"
            className="theme-btn text-small"
            style={{ marginLeft: 5 }}
          >
            Decline
          </Button>
        </strong>
      ),
    },
  ];

  return (
    <>
      {ListData.length > 0 && (
        <DataGridTable
          row={ListData.lead}
          columns={headCells}
          styles={{ height: 400, width: '100%' }}
          classNames="data-b2b-table"
        />
      )}
      {ListData.length > 10 && (
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
      )}
    </>
  );
}
