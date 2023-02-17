import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Typography, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CampaignTable from './CamapignTable';
import TuneIcon from '@mui/icons-material/Tune';

export default function NewLeadsBasic() {
  const [value, setValue] = React.useState(dayjs('2023-03-15T21:11:54'));
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="d-flex pt-4 date-box justify-content-around">
        {/* <Typography className="px-3">Select Date</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Select Date"
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider> */}
        <Box className="d-flex">
        <Box className="time-color-bg text-center mx-5">
          <Typography variant="h6" className="text-white pb-1 count-heading">
            Least Count
          </Typography>
          <Typography variant="h2" className="count">
            12
          </Typography>
        </Box>
        <Box className="time-color-bg text-center mx-5">
          <Typography variant="h6" className="text-white pb-1 count-heading">
            Satisfaction Survey
          </Typography>
          <Typography variant="h2" className="count">
            01
          </Typography>
        </Box>
        </Box>
      </Box>
        <Box className="d-flex justify-content-between align-items-center">
      <Box>
          <Button variant="outlined" className="btn btn-dark me-4">
            Lead Details (28-12-2022)
          </Button>
          <Button>
          <TuneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
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
      <CampaignTable />
    </>
  );
}
