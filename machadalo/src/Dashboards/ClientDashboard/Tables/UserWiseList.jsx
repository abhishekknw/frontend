import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Button } from 'react-bootstrap';
//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    key:"1",
    address: '261 Erdman Ford',
    city: 'Indore',
    Total_Leads_count:"5000",
    Current_week_count :"1000",
    Last_week_count:"300",
    Current_month_count:"3000",
    This_quarter_count:"700",
    Total_comment_updated_count:"898",
    Total_status_updated_count:"775"
  },
  {
    key:"2",
    address: '261 Erdman Ford',
    city: 'Indore',
    Total_Leads_count:"5000",
    Current_week_count :"1000",
    Last_week_count:"300",
    Current_month_count:"3000",
    This_quarter_count:"700",
    Total_comment_updated_count:"898",
    Total_status_updated_count:"775"
  }, {
    key:"3",
    address: '261 Erdman Ford',
    city: 'Indore',
    Total_Leads_count:"5000",
    Current_week_count :"1000",
    Last_week_count:"300",
    Current_month_count:"3000",
    This_quarter_count:"700",
    Total_comment_updated_count:"898",
    Total_status_updated_count:"775"
  }, {
    key:"4",
    address: '261 Erdman Ford',
    city: 'Indore',
    Total_Leads_count:"5000",
    Current_week_count :"1000",
    Last_week_count:"300",
    Current_month_count:"3000",
    This_quarter_count:"700",
    Total_comment_updated_count:"898",
    Total_status_updated_count:"775"
  }, {
    key:"5",
    address: '261 Erdman Ford',
    city: 'Indore',
    Total_Leads_count:"5000",
    Current_week_count :"1000",
    Last_week_count:"300",
    Current_month_count:"3000",
    This_quarter_count:"700",
    Total_comment_updated_count:"898",
    Total_status_updated_count:"775"
  },
];

const UserWiseList = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'key', //access nested data with dot notation
        header: 'S.No.',
      },
      {
        accessorKey: 'city',
        header: 'City Name',
      },
      {
        accessorKey: 'Total_Leads_count', //normal accessorKey
        header: 'Total Leads count',
      },
      {
        accessorKey: 'Current_week_count',
        header: 'Current week count',
      },
      {
        accessorKey: 'Last_week_count',
        header: 'Last week count',
      },
      {
        accessorKey: 'Current_month_count',
        header: 'Current month count',
      },
      {
        accessorKey: 'This_quarter_count',
        header: 'This quarter count',
      },
      {
        accessorKey: 'Total_comment_updated_count',
        header: 'Total comment updated count',
      },
      {
        accessorKey: 'Total_status_updated_count',
        header: 'Total status updated count',
      },
      {
        // accessorKey: 'Total_status_updated_count',
        header: 'View',
        accessorFn: rowData => <Button>View</Button>
      },
      {
        accessorFn: rowData => <Button>Download</Button>,
        header: 'Download',
      },
      {
        header: 'Email',
        accessorFn: rowData => <Button>Email</Button>,
      },
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default UserWiseList;