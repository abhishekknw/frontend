import * as React from 'react';
import DataGridTable from '../../Table/DataGridTable';
import { supplierData } from '../../API/_state';
import { useRecoilValue } from 'recoil';
import { Typography } from '@mui/material';

export default function SupplierDataTable(props) {
  const tableData = useRecoilValue(supplierData);
  const header = [
    {
      field: 'supplier_name',
      headerName: 'Supplier Name	',
      width: 240,
      textAlign: 'center',
    },
    {
      field: 'unit_primary_count',
      headerName: 'Flat Count / Primary Count',
      width: 240,
    },
    {
      field: 'area',
      headerName: 'Area',
      width: 240,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 240,
    },
  ];

  return (
    <>
      <Typography className="text-center pt-2 pb-1" variant="h6">
        {' '}
        Supplier Details of {props?.data} Campaign{' '}
      </Typography>
      {tableData.length > 0 && (
        <DataGridTable
          row={tableData}
          columns={header}
          styles={{ height: 400, width: '100%' }}
          classNames="small-height-table data-b2b-table center-data-table "
        />
      )}
    </>
  );
}
