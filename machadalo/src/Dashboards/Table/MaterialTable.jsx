import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';

const MaterialTable = ({ data, columns }) => {
  return <MaterialReactTable columns={columns} data={data} />;
};

export default MaterialTable;
