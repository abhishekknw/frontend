import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
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
    city: 'Ujjain',
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
    city: 'Ahemdabad',
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
    city: 'Mumbai',
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
    city: 'Bhopal',
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
        enableColumnActions: false,
        enableSorting: false, 
        size:40,
      },
      {
        accessorKey: 'city',
        header: 'City Name',
        size:120
      },
      {
        accessorKey: 'Total_Leads_count', //normal accessorKey
        header: 'Total Leads count',
        size:100,
      },
      {
        accessorKey: 'Current_week_count',
        header: 'Current week count',
        size:100,
      },
      {
        accessorKey: 'Last_week_count',
        header: 'Last week count',
        size:100,

      },
      {
        accessorKey: 'Current_month_count',
        header: 'Current month count',
        size:100,

      },
      {
        accessorKey: 'This_quarter_count',
        header: 'This quarter count',
        size:100,

      },
      {
        accessorKey: 'Total_comment_updated_count',
        header: 'Total comment updated count',
        size:200,
      },
      {
        accessorKey: 'Total_status_updated_count',
        header: 'Total status updated count',
        size:200,
      },
    //   {
    //     // accessorKey: 'Total_status_updated_count',
    //     header: 'View',
    //     enableColumnActions: false,
    //     enableSorting: false, 
    //     accessorFn: rowData => <Button>View</Button>
    //   },
    //   {
    //     accessorFn: rowData => <Button>Download</Button>,
    //     enableColumnActions: false,
    //     enableSorting: false, 
    //     header: 'Download',
    //   },
    //   {
    //     header: 'Email',
    //     enableColumnActions: false,
    //     enableSorting: false,
    //     accessorFn: rowData => <Button>Email</Button>,
    //   },
    ],
    [],
  );
const Searching = (e)=>{
    console.log(e)
}
  return <MaterialReactTable 
  columns={columns} 
  data={data}
  enableDensityToggle={false}
  showColumnFilters={false}
  initialState={{ density: 'comfortable' }}
  enableRowActions
  positionActionsColumn="last"
  renderRowActions={({ row, table }) => (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
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
             onClick={() =>
              window.open(
                `mailto:kevinvandy@mailinator.com?subject=Hello ${row.original.firstName}!`,
              )
            }
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
        </Box>
  )}
//   muiSearchTextFieldProps={{
//     placeholder: 'Search all users',
//     sx: { minWidth: '100px' },
//     variant: 'outlined',
//   }}
  onGlobalFilterChange={Searching}
  enableHiding={false}
//   muiTablePaperProps={{
//     elevation: 0, //change the mui box shadow
//     //customize paper styles
//     sx: {
//       borderRadius: '1',
//       border: '3px dashed #e0e0e0',
//     },
//   }}
  muiTableHeadCellProps={{
    //easier way to create media queries, no useMediaQuery hook needed.
    sx: {
      fontSize: {
        xs: '10px',
        sm: '11px',
        md: '12px',
        lg: '13px',
        xl: '14px',
      },
    },
  }}
  />;
};

export default UserWiseList;