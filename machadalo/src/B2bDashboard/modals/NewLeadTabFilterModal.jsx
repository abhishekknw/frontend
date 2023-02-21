import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Typography, Box, Button, Drawer } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import { NewLeadsTabActions } from '../API/_actions';

export default function NewLeadTabFilterModal() {
  const [searchDate, setSearchDate] = React.useState(dayjs('2023-03-15T21:11:54'));
  const [open, setOpen] = React.useState(false);
  const NewLeadTabApi = NewLeadsTabActions();

  const toggleDrawer = (anchor, open) => (event) => {
    setOpen(open);
  };

  const getLeadCount = async (e) => {
    let data = { selectDate: '2023-02-06 00:00:00.0000' };
    await NewLeadTabApi.leadCountByDate(data);
    setSearchDate(dayjs(e?.$d).format('YYYY-MM-DD'));
  };

  const Filters = (anchor) => (
    <Box
      sx={{ p: 3, height: 'auto', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 460 }}
      role="presentation"
    >
      <Typography borderBottom={1} variant="h5" pb={1} mb={4}>
        Filters
      </Typography>
      <Button className="close-btn" onClick={(e) => setOpen(false)}>
        <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Button>
      <Typography className="px-3">Select Date</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Select Date"
          inputFormat="DD/MM/YYYY"
          value={searchDate}
          onChange={(e) => {
            getLeadCount(e);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
  return (
    <>
      <Box className="d-flex justify-content-between align-items-center">
        <Box>
          <Button variant="outlined" className="btn btn-dark me-4">
            Lead Details (28-12-2022)
          </Button>
          <Button onClick={toggleDrawer('right', true)}>
            <TuneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
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
      </Box>
      <Drawer height={400} anchor={'right'} open={open} onClose={toggleDrawer('right', false)}>
        {Filters('right')}
      </Drawer>
    </>
  );
}
