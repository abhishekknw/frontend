import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { LeadDetailActions } from '../API/_actions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

const columns = [
  { id: 'name', label: 'Field Name', minWidth: 170 },
  { id: 'code', label: 'Alais Name', minWidth: 100 }, 		 		   
  {
    id: 'population',
    label: 'Type of Field',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Comment',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Send Trigger (Y/N)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: '',
    label: 'Trigger Message',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '',
    label: 'Params ?',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '',
    label: '  Add Buttons ?',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: '',
    label: 'Action',  	
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '',
    label: 'Help File ?',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },  
];

function createData(name, code, population, size) {
  const density = population / size;

  return { name, code, population, size, density };
}
const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];
export default function CreateNewTemplate(props) {
  const [open, setOpen] = React.useState(false);
  const leadDetailApi = LeadDetailActions();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const downloadLeads = () => {
    leadDetailApi.DownloadLeadsSummary(props.data.id);
  };

  return (
    <>
      <Button
        className="theme-btn"
        variant="contained"
        size="small"
        style={{}}
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Create
      </Button>
      <Dialog
        width={800}
        className="modal-comment create-table"
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <Button
          className="close-btn"
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Button>
        <DialogTitle className="title-modal">CREATE FIELDS</DialogTitle>
        <DialogContent className="content-modal">
          <Box className="d-flex justify-content-around upload-btns">
            <Box>
              <Typography className=" pb-3 text-black text-center red-font" variant="h6">
                Create and Edit Leads
              </Typography>

              <Paper sx={{ width: '90%', overflow: 'hidden' , maxWidth: '1100px'}} className="createfieldb2b ">
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
