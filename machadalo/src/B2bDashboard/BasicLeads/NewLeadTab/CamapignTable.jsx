import * as React from 'react';
import DataGridTable from '../../Table/DataGridTable';
import { leadCampaignData } from '../../API/_state';
import { useRecoilValue } from 'recoil';
import { Typography } from '@mui/material';
import { NewLeadsTabActions } from '../../API/_actions';
import SupplierDataTable from './SupplierDataTable';
export default function CampaignTable() {
  const tableData = useRecoilValue(leadCampaignData);
  const NewLeadTabApi = NewLeadsTabActions();
  const [headerName, setHeaderName] = React.useState('');

  async function supplierData(data) {
    setHeaderName(data.row.name);
    await NewLeadTabApi.getSupplierData(data.row);
  }
  const header = [
    {
      field: 'Index',
      numeric: true,
      headerClassName: '',
      headerName: 'Index',
      width: 240,
      textAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.proposal_id) + 1,
    },
    {
      field: 'name',
      headerClassName: '',
      description: '',
      cellClassName: 'red-font',
      headerName: 'Campaign Name	',
      width: 240,
      renderCell: (params) => (
        <Typography
          variant="subtitle2"
          onClick={(e) => {
            supplierData(params);
          }}
        >
          {params.row.name}
        </Typography>
      ),
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

  return (
    <>
      <DataGridTable
        row={tableData.campaigns}
        columns={header}
        styles={{ height: 400, width: '100%' }}
        classNames="small-height-table data-b2b-table center-data-table "
      />
      {headerName != '' && <SupplierDataTable data={headerName} />}
    </>
  );
}
