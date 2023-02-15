import React, { useState } from 'react';
import { Button } from '@mui/material';
import DataGridTable from '../Table/DataGridTable';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { campaignLeads } from '../API/_state';
import { useRecoilValue } from 'recoil';
import FilterModal from '../modals/FilterModal';

const ViewLeadDetail = (props) => {
  // const headCells = [
  //   {
  //     field: 'checkbox',
  //     headerName: 'Select',
  //     width: 50,
  //     renderCell: (params) => <>1</>,
  //   },
  //   {
  //     field: 'entity_name',
  //     headerName: 'Supplier Name',
  //     width: 200,
  //   },
  //   {
  //     field: 'entity_name',
  //     numeric: true,
  //     description: 'Type Of Entity',
  //     headerName: 'TOE',
  //     width: 60,
  //   },
  //   {
  //     field: 'entity_type',
  //     numeric: true,
  //     headerName: 'Supplier Type',
  //     width: 60,
  //   },
  //   {
  //     field: 'area',
  //     numeric: true,
  //     headerName: 'Area',
  //   },
  //   {
  //     field: 'city',
  //     numeric: true,
  //     headerName: 'City',
  //   },
  //   {
  //     field: 'primary_count',
  //     headerName: 'Flat Count',
  //     numeric: true,
  //     width: 100,
  //   },
  //   {
  //     field: 'supplier_secondary_count',
  //     headerName: 'Tower Count',
  //     numeric: true,
  //     width: 100,
  //   },
  //   {
  //     field: 'lead_timestamp',
  //     numeric: true,
  //     sortable: true,
  //     headerName: 'Lead Time Stamp',
  //   },
  //   {
  //     field: 'CurrentStatus',
  //     numeric: true,
  //     sortable: false,
  //     headerName: 'Current Status',
  //     width: 250,
  //     renderCell: (params) => (
  //       <>
  //         <select className="select-b2b">
  //           <option>Leads Verified By Machadalo</option>
  //           <option>Leads Verified By Machadalo</option>
  //           <option>Leads Verified By Machadalo</option>
  //           <option>Leads Verified By Machadalo</option>
  //           <option>Leads Verified By Machadalo</option>
  //           <option>Leads Verified By Machadalo</option>
  //           <option>Leads Verified By Machadalo</option>
  //         </select>
  //       </>
  //     ),
  //   },
  //   {
  //     field: 'ClientComment',
  //     headerName: 'Client Comment',
  //     width: 140,
  //     sortable: false,
  //     renderCell: (params) => (
  //       <strong>
  //         <Button variant="contained" size="small"
  //           className='theme-btn'>
  //           View Comment
  //         </Button>
  //       </strong>
  //     ),
  //   },
  //   {
  //     field: 'Action',
  //     headerName: 'Action',
  //     width: 150,
  //     sortable: false,
  //     renderCell: (params) => (
  //       <strong>
  //         <Button variant="contained" size="small"
  //           className='theme-btn'>
  //           Lead Details
  //         </Button>
  //       </strong>
  //     ),
  //   },
  // ];
  const viewLeads = useRecoilValue(campaignLeads);
  console.log(viewLeads, 'viewLeads');

  return (
    <>
      <FilterModal />

      {/* FILTER ICON nd search */}
      {/* <Box className="b2b-container">
        <Box sx={{ m: 1 }}>
          <Button startIcon={<TuneIcon />} className="text-black"
          onClick={e=>{openModalFilter(e)}}
          >
            Apply Filter
          </Button>
        </Box>
        <Box sx={{ m: 1, display: 'flex', alignItems: 'flex-end' }} className="input-col">
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search"
            variant="standard"
            className="input-col-text"
            onChange={(e) => handleSearch(e)}
          />
        </Box>
      </Box> */}
      {/* <DataGridTable
        row={row}
        columns={headCells}
        styles={{ height: 400, width: '100%' }}
        classNames="data-b2b-table"
      /> */}
    </>
  );
};

export default ViewLeadDetail;
