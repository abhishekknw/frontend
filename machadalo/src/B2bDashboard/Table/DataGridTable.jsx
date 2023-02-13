import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataGridTable = (props) => {
  const TableData = props?.row;
  const columns = props?.columns;
  return (
    <>
      <div style={{ height: 400, width: '100%' }} className="data-b2b-table">
        <DataGrid
          rows={TableData}
          getRowId={(row, index) => (row.campaign_id ? row.campaign_id : row._id)}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </>
  );
};

export default DataGridTable;
