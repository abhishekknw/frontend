import React from 'react';
import MaterialTable from '../Table/MaterialTable';

export default function ViewTable(props) {
  const columns = [
    {
      accessorKey: 'index',
      header: 'S.No.',
    },
    {
      accessorKey: 'name',
      header: 'Client Name',
    },
    {
      accessorKey: 'shared',
      header: 'TO BE SHARED',
    },
    {
      accessorKey: 'count',
      header: 'COUNT',
    },
    {
      accessorKey: 'QA',
      header: 'Accepted by QA',
    },
    {
      accessorKey: 'client',
      header: 'Accepted by Client',
    },
    {
      accessorKey: 'comment',
      header: 'COMMENT UPDATED',
    },
    {
      accessorKey: 'status',
      header: 'STATUS UPDATED',
    },
    {
      accessorKey: 'revenue',
      header: 'REVENUE EARNED',
    },
    {
      accessorKey: 'campaign',
      header: 'VIEW CAMPAOGN',
    },
    {
      accessorKey: 'action',
      header: 'ACTION',
    },
  ];

  const data = [
    {
      index: 1,
      name: 'C1',
      shared: 6000,
      count: 5000,
      QA: 2500,
      client: 2000,
      comment: 1000,
      status: 700,
      revenue: '20K',
    },
  ];

  return (
    <>
      <h2 style={{ paddingTop: '10px' }}>ViewTable</h2>
      <MaterialTable columns={columns} data={data} />
    </>
  );
}
