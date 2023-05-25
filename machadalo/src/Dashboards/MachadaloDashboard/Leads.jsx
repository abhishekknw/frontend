import React from 'react';
import MaterialTable from '../Table/MaterialTable';

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
    },
    {
      accessorKey: 'agency_wise',
      header: 'View Agency Wise',
    },
    {
      accessorKey: 'action',
      header: 'Action',
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
  ];

  return (
    <>
      <MaterialTable data={data} columns={columns} />
    </>
  );
}
