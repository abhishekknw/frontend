import MaterialTable from '../Table/MaterialTable';
import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Typography, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import './index.css';
export default function LeadsTable(props) {
  const columns = [
    {
      accessorKey: 'index',
      header: 'S.No.',
    },
    {
      accessorKey: 'type',
      header: 'Lead Type',
    },
    {
      accessorKey: 'count',
      header: 'Lead Count',
    },
    {
      accessorKey: 'QA',
      header: 'Lead Accepted by QA',
    },
    {
      accessorKey: 'client',
      header: 'Lead Accepted by Client',
    },
    {
      accessorKey: 'client_wise',
      header: 'View Client Wise',
      Cell: ({ cell, row }) => (<><Button>View Client Wise</Button></>)
    },
    {
      accessorKey: 'agency_wise',
      header: 'View Agency Wise',
      Cell: ({ cell, row }) => (<><Button>View Agency Wise</Button></>)

    },
    {
      accessorKey: 'action',
      header: 'Action',
      Cell: ({ cell, row }) => (<><Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '0px' }}>
        <IconButton
          color="primary"
        // onClick={() => {
        //   table.setEditingRow(row);
        // }}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          color="primary"
        //  onClick={() =>
        //   window.open(
        //     `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
        //   )
        // }
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => {
            data.splice(row.index, 1); //assuming simple data table
            setData([...data]);
          }}
        >
          <DownloadForOfflineIcon />
        </IconButton>
      </Box></>)
    },
  ];

  const data = [
    {
      index: 1,
      type: 'B2B',
      count: 5000,
      QA: 3000,
      client: 3000,
    },
    {
      index: 2,
      type: 'B2C',
      count: 5000,
      QA: 3000,
      client: 3000,
    },
  ];

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'grid',
              margin: 'auto',
              gridTemplateColumns: '1fr 1fr',
              width: '100%',
            }}
          >
            <Typography>Address: {row.count}</Typography>
            <Typography>City: {row.QA}</Typography>
            <Typography>State: {row.client}</Typography>
            <Typography>Country: {row.original.country}</Typography>
          </Box>
        )}
      />
      {/* <MaterialTable data={data} columns={columns}/> */}
    </>
  );
}
