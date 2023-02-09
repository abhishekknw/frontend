// import React, { useState } from 'react';
// import { get } from 'lodash';
// // import '../bootstrap-iso.css';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ViewComment from '../modals/ViewComment';
// import ClientStatus from '../common/Common';

// const BasicTable = (props) => {
//   const data = props.data;
//   const [showModal, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   function actionButton(row) {
//     return (
//       <>
//         <Button>Accept</Button>
//         <br />
//         <Button>Decline</Button>
//       </>
//     );
//   }
//   function commentButton(cell, row) {
//     return (
//       <>
//         <Button onClick={(e) => viewComment(cell, row)}>View Comment</Button>
//         <br />
//       </>
//     );
//   }
//   function checkBox(cell, row) {
//     return (
//       <>
//         <input type="checkbox"></input>
//       </>
//     );
//   }
//   function Status(cell, row) {
//     // return <ClientStatus />
//     return (
//       <>
//         <div>
//           <select>
//             <option value="fruit">Leads Verified By Machadalo</option>
//             <option value="vegetable">Leads Verified By Client</option>
//             <option value="meat">Leads Verified By Machadalo</option>
//             <option value="meat">Leads Verified By Machadalo</option>
//             <option value="meat">Ringing Not Responding</option>
//             <option value="meat">Current Not a Decision Maker</option>
//             <option value="meat">Leads Verified By Machadalo</option>
//             <option value="meat">Meeting confirmed</option>
//           </select>
//         </div>
//       </>
//     );
//   }
//   const viewComment = (e, data) => {
//     handleShow();
//   };

//   return (
//     <>
//       <div className="bootstrap-iso">
//         <BootstrapTable data={data}>
//           <TableHeaderColumn 
//             isKey dataField="_id"
//             tdAttr={{ 'data-attr': 'SN' }}
//             width={'80px'}
//             dataFormat={checkBox}
//           >
//             SELECT
//           </TableHeaderColumn>
//           <TableHeaderColumn  dataField="entity_name">
//             Entity Name
//           </TableHeaderColumn>
//           <TableHeaderColumn
//             tdAttr={{ 'data-attr': 'entity_type' }}
//             dataField="entity_type"
//             dataSort={true}
//             searchable={false}
//           >
//             TOE
//           </TableHeaderColumn>
//           <TableHeaderColumn dataField="primary_count" dataSort={true} searchable={false}>
//             PC
//           </TableHeaderColumn>
//           <TableHeaderColumn tdAttr={{ 'data-attr': 'area' }} dataField="area">
//             AREA
//           </TableHeaderColumn>
//           <TableHeaderColumn tdAttr={{ 'data-attr': 'city' }} dataField="city">
//             CITY
//           </TableHeaderColumn>
//           <TableHeaderColumn
//             tdAttr={{ 'data-attr': 'lead_timestamp' }}
//             dataField="lead_timestamp"
//             dataSort={true}
//             searchable={false}
//           >
//             LEAD STAMP
//           </TableHeaderColumn>
//           <TableHeaderColumn
//             tdAttr={{ 'data-attr': 'macchadalo_client_status' }}
//             dataField="macchadalo_client_status"
//             dataFormat={Status}
//           >
//             CLIENT STATUS
//           </TableHeaderColumn>
//           <TableHeaderColumn
//             tdAttr={{ 'data-attr': 'phone_number' }}
//             dataField="phone_number"
//             dataSort={true}
//             searchable={false}
//           >
//             PHONE NUMBER
//           </TableHeaderColumn>
//           <TableHeaderColumn
//             tdAttr={{ 'data-attr': 'Client Comment' }}
//             dataField="Client Comment"
//             dataFormat={commentButton}
//           >
//             CLIENT COMMENT
//           </TableHeaderColumn>
//           <TableHeaderColumn
//             tdAttr={{ 'data-attr': 'Action' }}
//             dataField="Action"
//             dataFormat={actionButton}
//           >
//             ACTION
//           </TableHeaderColumn>
//         </BootstrapTable>
//       </div>
//       <div>
//         <Modal show={showModal} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <ViewComment />
//           </Modal.Body>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default BasicTable;
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button,Select } from '@mui/material';

const rows = [{ "_id": "63cf6527b3cf3b2cc60f1bbc", "requirement_id": 10388, "supplier_id": "XESDWMUMKHASECRSYAS", "entity_name": "Yash Garden", "entity_type": "RS", "primary_count": 100, "area": "Khandeshhwar", "city": "Mumbai", "lead_timestamp": "2023-01-24 10:27 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:26 AM", "phone_number": "98********", "rating": 3, "last_comment": "" }, { "_id": "63cf6490b3cf3b2cc60f1bb4", "requirement_id": 10385, "supplier_id": "NDLDWS10RSRAB", "entity_name": "Rashtrapati Bhavan Cabinet Affairs CGHS", "entity_type": "RS", "primary_count": 135, "area": "Dwarka", "city": "Delhi NCR", "lead_timestamp": "2023-01-24 10:24 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:23 AM", "phone_number": "98********", "rating": 3, "last_comment": "" }, { "_id": "63cf6408b3cf3b2cc50f1bb0", "requirement_id": 10382, "supplier_id": "NDLDWS7RSSRA", "entity_name": "SHREE RADHA APARTMENT", "entity_type": "RS", "primary_count": 75, "area": "Dwarka", "city": "Delhi NCR", "lead_timestamp": "2023-01-24 10:22 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:21 AM", "phone_number": "98********", "rating": 3, "last_comment": "" },
   { "_id": "63cf6310b3cf3b2cc50f1ba8", "requirement_id": 10379, "supplier_id": "GZBKPCQRLRSBDR", "entity_name": "Balmukanda Residency", "entity_type": "RS", "primary_count": 250, "area": "Ghaziabad", "city": "Delhi NCR", "lead_timestamp": "2023-01-24 10:18 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 10:16 AM", "phone_number": "72********", "rating": 3, "last_comment": "" }, 
   { "_id": "63cf5e3ab3cf3b2cc50f1b9e", "requirement_id": 10371, "supplier_id": "ACGDMMUMKAMSECRSPAD", "entity_name": "Padmavati Residency", "entity_type": "RS", "primary_count": 116, "area": "Kamothe", "city": "Mumbai", "lead_timestamp": "2023-01-24 09:57 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 09:57 AM", "phone_number": "97********", "rating": 3, "last_comment": "" },
    { "_id": "63cf5d40b3cf3b2cc30f1b7f", "requirement_id": 10364, "supplier_id": "QMRCCVQCJKNOR", "entity_name": "vidyasagar oswal garden", "entity_type": "RS", "primary_count": 167, "area": "Old Washermanpet", "city": "Chennai", "lead_timestamp": "2023-01-24 09:53 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-24 09:50 AM", "phone_number": "93********", "rating": 3, "last_comment": "" }, 
    { "_id": "63bc380fb3cf3b1b21ab30cf", "requirement_id": 10118, "supplier_id": "MPVYQUAHRNVOAC", "entity_name": "SEA SHOW CGHS LTD", "entity_type": "RS", "primary_count": 60, "area": "None", "city": "Hyderabad", "lead_timestamp": "2023-01-09 09:21 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-19 10:58 AM", "phone_number": "99********", "rating": 3, "last_comment": "" },
     { "_id": "63b53af1b3cf3b14d027e30c", "requirement_id": 9978, "supplier_id": "ATIHUNOIVAISECRSSUP", "entity_name": "Supertech Estate Complex", "entity_type": "RS", "primary_count": 1, "area": "Vaishali", "city": "Delhi NCR", "lead_timestamp": "2023-01-04 02:08 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2023-01-19 10:58 AM", "phone_number": "99********", "rating": 3, "last_comment": "" }, 
     { "_id": "63a967cbb3cf3b3abc1bdaed", "requirement_id": 9866, "supplier_id": "GVUNHFJUERSTW", "entity_name": "Spectrum Bliss", "entity_type": "RS", "primary_count": 16, "area": null, "city": "Kolkata", "lead_timestamp": "2022-12-26 02:52 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-27 11:10 AM", "phone_number": "93********", "rating": 3, "last_comment": "" },
      { "_id": "639ed9b5b3cf3b021105a9c3", "requirement_id": 9663, "supplier_id": "GCBLPDLCHTB", "entity_name": null, "entity_type": "RS", "primary_count": null, "area": "Panchkula", "city": "Chandigarh", "lead_timestamp": "2022-12-18 02:43 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-19 09:52 AM", "phone_number": "73********", "rating": 0, "last_comment": "" }, 
      { "_id": "639b0cecb3cf3b14a40984b9", "requirement_id": 9623, "supplier_id": "JFUDLDJLPCZBE", "entity_name": "Ekta test society", "entity_type": "RS", "primary_count": null, "area": "Delhi", "city": "Delhi NCR", "lead_timestamp": "2022-12-15 05:32 PM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 05:32 PM", "phone_number": "87********", "rating": 3, "last_comment": "" }, 
      { "_id": "6392e909b3cf3b6ebb7560d1", "requirement_id": 9454, "supplier_id": "GZBKPCFAPRSGGR", "entity_name": "Gaur Ganga 2", "entity_type": "RS", "primary_count": 112, "area": "Ghaziabad", "city": "Delhi NCR", "lead_timestamp": "2022-12-09 01:21 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:45 PM", "phone_number": "96********", "rating": 3, "last_comment": "" }, 
      { "_id": "63904ab5b3cf3b2b568b8600", "requirement_id": 9423, "supplier_id": "ZPFUVBENKAS12TRSPOE", "entity_name": "Poetree", "entity_type": "RS", "primary_count": 1, "area": "Kasavanahalli", "city": "Bengaluru", "lead_timestamp": "2022-12-07 01:41 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-07 02:11 PM", "phone_number": "99********", "rating": 3, "last_comment": "" },
       { "_id": "638f00dbb3cf3b2b568b85e3", "requirement_id": 9407, "supplier_id": "QJBPTVISMARVUDRSVAI", "entity_name": "Vaibhav Hills", "entity_type": "RS", "primary_count": 1, "area": "Marripalem", "city": "Vishakhapatnam", "lead_timestamp": "2022-12-06 02:14 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "94********", "rating": 3, "last_comment": "" }, 
       { "_id": "638eff0bb3cf3b2b558b859c", "requirement_id": 9405, "supplier_id": "SUMWGMUMVIRYKRSRAS", "entity_name": "Rashmi Nagar", "entity_type": "RS", "primary_count": 288, "area": "Virar West", "city": "Mumbai", "lead_timestamp": "2022-12-06 02:06 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "638efe65b3cf3b2b548b8585", "requirement_id": 9403, "supplier_id": "ZWMVTMUMVIRBOLRSSUD", "entity_name": "Sudha Palms", "entity_type": "RS", "primary_count": 62, "area": "Virar West", "city": "Mumbai", "lead_timestamp": "2022-12-06 02:03 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "638efdf4b3cf3b2b568b85d9", "requirement_id": 9400, "supplier_id": "YLCWVMICZXPPP", "entity_name": "royal green", "entity_type": "RS", "primary_count": 88, "area": "Lake Town", "city": "Kolkata", "lead_timestamp": "2022-12-06 02:01 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "96********", "rating": 3, "last_comment": "" }, 
       { "_id": "636f2ff5b3cf3b3861154d4f", "requirement_id": 8437, "supplier_id": "KIBCBTUGSWGP", "entity_name": "Wardhmaan Township", "entity_type": "RS", "primary_count": 54, "area": "Wakad", "city": "Pune", "lead_timestamp": "2022-11-12 11:02 AM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-05 08:43 AM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "63663bd1b3cf3b79fe6bf1a7", "requirement_id": 8211, "supplier_id": "FGBBCMUMMUMKAURSNAU", "entity_name": "Nausheen Plaza", "entity_type": "RS", "primary_count": 56, "area": "Mumbra", "city": "Mumbai", "lead_timestamp": "2022-11-05 04:02 PM", "client_status": "Decline", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-12-15 03:46 PM", "phone_number": "98********", "rating": 3, "last_comment": "" }, 
       { "_id": "63586fd5b3cf3b771ab25f30", "requirement_id": 7993, "supplier_id": "CHAZPDHRSSGV", "entity_name": "Sushma Green Vista", "entity_type": "RS", "primary_count": 176, "area": "Zirakpur", "city": "Chandigarh", "lead_timestamp": "2022-10-26 04:53 AM", "client_status": "Decision Pending", "macchadalo_client_comment": null, "macchadalo_client_status": null, "updated_at": "2022-10-26 04:53 AM", "phone_number": "93********", "rating": 0, "last_comment": "" }
      ]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Entity Name',
  },
  {
    id: 'TOE',
    numeric: true,
    disablePadding: false,
    label: 'TOE',
  },
  {
    id: 'PrimaryCount',
    numeric: true,
    disablePadding: false,
    label: 'Primary Count',
  },
  {
    id: 'City',
    numeric: true,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'area',
    numeric: true,
    disablePadding: false,
    label: 'Area',
  },
  {
    id: 'LeadStamp',
    numeric: true,
    disablePadding: false,
    label: 'Lead Stamp',
  },
  {
    id: 'CurrentStatus',
    numeric: true,
    disablePadding: false,
    label: 'Current Status',
  },
  {
    id: 'PhoneNumber',
    numeric: true,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'ClientComment',
    numeric: true,
    disablePadding: false,
    label: 'Client Comment',
  },
  {
    id: 'Action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : ( */}
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Kirti Test Company
        </Typography>
      {/* )} */}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : ( */}
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      {/* )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function BasicTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row._id)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.entity_name}
                      </TableCell>
                      <TableCell align="right">{row.entity_type}</TableCell>
                      <TableCell align="right">{row.primary_count}</TableCell>
                      <TableCell align="right">{row.area}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.lead_timestamp}</TableCell>
                      <TableCell align="right">
                        <Select native label="Value">
                        <option aria-label="None" value="" />
                            <option>Leads Verified by Machadalo</option>
                            <option>Leads Verified by Machadalo</option>    
                            <option>Leads Verified by Machadalo</option>    
                            <option>Leads Verified by Machadalo</option>    
                            <option>Leads Verified by Machadalo</option>    
                            <option>Leads Verified by Machadalo</option>    
                            <option>Leads Verified by Machadalo</option>    
                            <option>Leads Verified by Machadalo</option>        
                        </Select></TableCell>
                      <TableCell align="right">{row.phone_number}</TableCell>
                      <TableCell align="right">
                      <Button>View Comment</Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button>Accept</Button>
                        <Button>Decline</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
