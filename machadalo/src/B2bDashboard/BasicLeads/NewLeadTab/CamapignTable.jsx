import * as React from 'react';
import DataGridTable from '../../Table/DataGridTable';

export default function CampaignTable() {
  const header = [
    {
      field: 'Index',
      numeric: true,
      headerClassName: '',
      headerName: 'Index',
      width: 240,
      textAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 2,
    },
    {
      field: 'name',
      headerClassName: '',
      description: '',
      cellClassName: 'red-font',
      headerName: 'Campaign Name	',
      width: 240,
    },
    {
      field: 'purchased_count',
      numeric: true,
      headerClassName: '',
      description: '',
      headerName: 'Total purchased',
      width: 240,
    },
    {
      field: 'not_purchased_count',
      numeric: true,
      headerClassName: '',
      description: '',
      headerName: 'Total available',
      width: 240,
    },
  ];

  const tableData = [
    { name: 'Kriti test', not_purchased_count: 9, purchased_count: 0, proposal_id: 'KRIKRI4EF8' },
    { name: 'Kriti test', not_purchased_count: 9, purchased_count: 0, proposal_id: 'KRIKRI4EF9' },
    { name: 'Kriti test', not_purchased_count: 9, purchased_count: 0, proposal_id: 'KRIKRI4EF10' },
    { name: 'Kriti test', not_purchased_count: 9, purchased_count: 0, proposal_id: 'KRIKRI4EF12' },
    { name: 'Kriti test', not_purchased_count: 9, purchased_count: 0, proposal_id: 'KRIKRI4EF2' },
    { name: 'Kriti test', not_purchased_count: 9, purchased_count: 0, proposal_id: 'KRIKRI4EF11' },
  ];

  return (
    <>
      <DataGridTable
        row={tableData}
        columns={header}
        styles={{ height: 400, width: '100%' }}
        classNames="small-height-table data-b2b-table center-data-table "
      />
    </>
  );
}
