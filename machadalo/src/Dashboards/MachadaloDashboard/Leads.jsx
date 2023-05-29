import MaterialTable from '../Table/MaterialTable';
import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Typography, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Table from 'react-bootstrap/Table';
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



  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Username</th>
            <th>Username</th>
            <th>Username</th>
            <th>Username</th>
            <th>Username</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>

        </tbody>
      </Table>
      {/* <MaterialTable data={data} columns={columns}/> */}
    </>
  );
}
