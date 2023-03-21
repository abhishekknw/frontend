import * as React from 'react';
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
import Collapse from '@mui/material/Collapse';
import { Box,Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const ViewLeadDetail = (props) => {
  const viewLeads = useRecoilValue(campaignLeads);
  const filters = useRecoilValue(viewLeadFilters);
  const leadDetailApi = LeadDetailActions();
  const headers = viewLeads.header;
  const tableData = viewLeads.values;
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [_id, set_id] = React.useState('');
  const [supplierLeads, setSupplierLeads] = React.useState({});

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

  async function showSameLeads(data) {
    console.log(open, _id == data[0]?._id);
    if (_id == data[0]?._id) {
      set_id('');
      setOpen(false);
    } else if (_id != data[0]?._id) {
      set_id(data[0]?._id);
      setOpen(true);
      let supplierData = await leadDetailApi.getSupplierLeadDetails(data[0]?.supplier_id);
      console.log(supplierData, 'supplierData');
      setSupplierLeads({ ...supplierData });
    }
  }
  return (
    <>
      {/* <FilterModal headerName={props?.data?.name} /> */}
      <FilterModal />
      <Typography variant="h6"  component="div">LEADS OF {props?.data?.name}</Typography>
      <TableContainer component={Paper} className="s-height-table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              {headers &&
                Object.keys(headers).map((key) => <TableCell key={key}>{headers[key]}</TableCell>)}
              <TableCell className="text-center">Current Status</TableCell>
              <TableCell>Client Comment </TableCell>
              <TableCell>Lead Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((row, index) => (
                <React.Fragment>
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={(e) => showSameLeads(row)}
                      >
                        {open && row[0]?._id == _id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
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
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={open && row[0]?._id == _id} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Table size="small" aria-label="purchases">
                            <TableBody>
                              {supplierLeads.length > 0 &&
                                supplierLeads.lead.map((row, index) => (
                                  <TableRow key={index}>
                                    <TableCell></TableCell>
                                    <TableCell align="right">{row.entity_name}</TableCell>
                                    <TableCell align="right">{row.entity_type}</TableCell>
                                    <TableCell align="right">{row.area}</TableCell>
                                    <TableCell align="right">{row.city}</TableCell>
                                    <TableCell align="right">{row.primary_count}</TableCell>
                                    <TableCell align="right">{row.lead_timestamp}</TableCell>
                                    <TableCell align="right">{row?.supplier_secondary_count}</TableCell>
                                    <TableCell align="right">
                                      <ClientStatusDropdown
                                        data={row}
                                        checkTable="leadDetailTable"
                                      />
                                    </TableCell>
                                    <TableCell align="right">
                                      <ViewCommentModal data={row} />
                                    </TableCell>
                                    <TableCell>
                                      <LeadDetailModal data={row} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
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
