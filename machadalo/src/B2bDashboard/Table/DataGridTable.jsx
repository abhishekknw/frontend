import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const DataGridTable = (props) => {
  const TableData = props?.row;
  const columns = props?.columns;
  return (
    <>
      <div style={props?.styles} className={props?.classNames}>
        <DataGrid
          rows={TableData}
          getRowId={(row, index) =>
            row.campaign_id
              ? row.campaign_id
              : row._id
              ? row._id
              : row.proposal_id
              ? row.proposal_id
              : row.supplier_id
          }
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[]}
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
