import React, { useState } from 'react';
import { campaignLeads } from '../API/_state';
import { useRecoilValue } from 'recoil';
import FilterModal from '../modals/FilterModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientStatusDropdown from '../common/ClientStatus';

const ViewLeadDetail = (props) => {
  const viewLeads = useRecoilValue(campaignLeads);
  const headers = viewLeads.header;
  const tableData = viewLeads.values;

  return (
    <>
      <FilterModal />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              {Object.keys(headers).map((key) => (
                <TableCell key={key}>{headers[key]}</TableCell>
              ))}
              <TableCell>Current Status</TableCell>
              <TableCell>Client Comment </TableCell>
              <TableCell>Lead Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.index}
                </TableCell>
                {row.map((data, index) =>
                  index != 0 ? <TableCell key={index}>{data?.value}</TableCell> : null
                )}
                <TableCell>
                  <ClientStatusDropdown data={row[0]} checkTable="leadDetailTable" />
                </TableCell>
                <TableCell>{row.clientcomment}</TableCell>
                <TableCell>{row.leaddetail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewLeadDetail;
