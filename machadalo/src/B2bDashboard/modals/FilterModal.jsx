import * as React from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import {
  Typography,
  Box,
  Button,
  Drawer,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { viewLeadFilters } from '../API/_state';
import { useRecoilState } from 'recoil';

export default function FilterModal() {
  const [filters, setFilters] = useRecoilState(viewLeadFilters);
  const [value, setValue] = React.useState(dayjs('2023-03-15T21:11:54'));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    console.log(event.$d);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleSearch = (e, data) => {
    alert(1);
  };
  function applyFilters() {
    console.log(filters, '111111111111111');
  }
  const list = (anchor) => (
    <Box
      sx={{ p: 3, height: 'auto', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 460 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography borderBottom={1} variant="h5" pb={1} mb={4}>
        Filters
      </Typography>
      <Button className="close-btn">
        <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Button>
      <Box className="accordion-box pt-3 pb-5">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Lead Submitted Date</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="d-flex justify-content-between">
              <Box className="me-2 d-flex">
                <Typography className="small-text me-2" variant="h6">
                  Start Date{' '}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-range-d"
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={filters.start_date}
                    disableFuture={true}
                    onChange={(e) => {
                      setFilters({ ...filters, start_date: e?.$d });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <Box className="d-flex">
                <Typography className="small-text me-2" variant="h6">
                  End Date{' '}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-range-d"
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={filters.end_date}
                    disableFuture={true}
                    minDate={filters.start_date}
                    onChange={(e) => {
                      setFilters({ ...filters, end_date: e?.$d });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Lead Acceptance Date</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="d-flex justify-content-between">
              <Box className="me-2 d-flex">
                <Typography className="small-text me-2" variant="h6">
                  Start Date{' '}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-range-d"
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={filters.start_acceptance_date}
                    disableFuture={true}
                    onChange={(e) => {
                      setFilters({ ...filters, start_acceptance_date: e?.$d });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <Box className="d-flex">
                <Typography className="small-text me-2" variant="h6">
                  End Date{' '}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-range-d"
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={filters.end_acceptance_date}
                    disableFuture={true}
                    minDate={filters.start_acceptance_date}
                    onChange={(e) => {
                      setFilters({ ...filters, end_acceptance_date: e?.$d });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Lead Update Date</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="d-flex justify-content-between">
              <Box className="me-2 d-flex">
                <Typography className="small-text me-2" variant="h6">
                  Start Date{' '}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-range-d"
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={filters.start_update_date}
                    disableFuture={true}
                    onChange={(e) => {
                      setFilters({ ...filters, start_update_date: e?.$d });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <Box className="d-flex">
                <Typography className="small-text me-2" variant="h6">
                  End Date{' '}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    className="date-range-d"
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={filters.end_update_date}
                    disableFuture={true}
                    minDate={filters.start_update_date}
                    onChange={(e) => {
                      setFilters({ ...filters, end_update_date: e?.$d });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography>Primary Count</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Box className="d-flex justify-content-between">
              <Box className="me-2 d-flex">
                <Typography className='small-text me-2' variant='h6' >Start Date </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                  className='date-range-d'
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <Box className="d-flex">      
                <Typography className='small-text me-2' variant='h6' >End Date </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                  className='date-range-d'
                    label="Select Date"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box> */}
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className="d-flex justify-content-between">
        <div className="status">
          <Typography varient="h6" pb={2}>
            Client Status:
          </Typography>
          <FormControl sx={{ width: '160px' }}>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="status">
          <Typography varient="h6" pb={2}>
            Select City:
          </Typography>
          <FormControl sx={{ width: '160px' }}>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <Typography className="pt-5 pb-4">
        Based on your filter there are 700+ leads in “All” cities
      </Typography>
      <Box className="d-flex justify-content-between">
        <Button variant="outlined " className="theme-btn text-white ">
          Download Leads
        </Button>
        <Button variant="outlined " className="theme-btn text-white ">
          Send Email
        </Button>
        <Button
          variant="outlined "
          className="theme-btn text-white "
          onClick={(e) => {
            applyFilters();
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Box className="b2b-container">
        <Box sx={{ m: 1 }}>
          <React.Fragment key={'right'}>
            <Button
              startIcon={<TuneIcon />}
              className="text-black"
              onClick={toggleDrawer('right', true)}
            >
              Apply Filter
            </Button>
            <Drawer
              height={400}
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {list('right')}
            </Drawer>
          </React.Fragment>
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
    </div>
  );
}
