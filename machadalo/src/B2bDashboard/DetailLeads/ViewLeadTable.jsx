import React, { useState } from 'react';
import { campaignLeads, viewLeadFilters } from '../API/_state';
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
import ViewCommentModal from '../modals/ViewComment';
import LeadDetailModal from '../modals/leadDetailModal';
import PaginationConstant from '../Pagination/index';
import { LeadDetailActions } from '../API/_actions';

const ViewLeadDetail = (props) => {
  const viewLeads = useRecoilValue(campaignLeads);
  const filters = useRecoilValue(viewLeadFilters);
  const leadDetailApi = LeadDetailActions();
  const headers = viewLeads.header;
  const tableData = viewLeads.values;
  const [page, setPage] = useState(1);

  async function handleChange(event, value) {
    let filterData = {
      campaign_id: props?.data?.campaign_id,
      lead_type: filters?.lead_type,
      supplier_type: filters?.supplier_type,
      next_page: value - 1,
    };
    await leadDetailApi.campaignViewLeads(filterData);
    setPage(value);
  }
  return (
    <>
      <FilterModal headerName={props?.data?.name} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              {headers &&
                Object.keys(headers).map((key) => <TableCell key={key}>{headers[key]}</TableCell>)}
              <TableCell>Current Status</TableCell>
              <TableCell>Client Comment </TableCell>
              <TableCell>Lead Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  {row.map((data, index) =>
                    index != 0 ? <TableCell key={index}>{data?.value}</TableCell> : null
                  )}
                  <TableCell>
                    <ClientStatusDropdown data={row[0]} checkTable="leadDetailTable" />
                  </TableCell>
                  <TableCell>
                    <ViewCommentModal data={row[0]} />
                  </TableCell>
                  <TableCell>
                    <LeadDetailModal data={row[0]} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationConstant
        pageSize={20}
        totalItems={viewLeads.length}
        pageNo={page}
        onPageChange={handleChange}
      />
    </>
  );
};

export default ViewLeadDetail;
