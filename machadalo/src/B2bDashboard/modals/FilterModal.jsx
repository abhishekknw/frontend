import * as React from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Box, Button, Drawer, TextField, Accordion, AccordionSummary, AccordionDetails, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FilterModal() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setState({ ...state, [anchor]: open });
  };

  const handleSearch = (e, data) => {
    alert(1);
  };

  const list = (anchor) => (
    <Box
      sx={{ p: 3, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 460 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography borderBottom={1} variant='h5' mb={4}>Filters</Typography>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'flex-end' }} className="input-col-filter">
        <TextField
          fullWidth
          id="input-with-sx"
          label="Search"
          variant="standard"
          className="input-col-text"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box className="d-flex justify-content-between">
        <div>
          <Typography varient="h6" pb={2}>Client Status:</Typography>
          <FormControl sx={{width: '160px'}}>
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
        <div>
          <Typography varient="h6" pb={2}>Select City:</Typography>
          <FormControl sx={{width: '160px'}}>
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
      <Typography className='pt-5 pb-4'>Based on your filter there are 700+ leads in “All” cities</Typography>
      <Box className="d-flex justify-content-between"> 
      <Button variant="outlined " className='theme-btn text-white ' >Download Leads</Button>
      <Button variant="outlined " className='theme-btn text-white ' >Send Email</Button>
      <Button variant="outlined " className='theme-btn text-white ' >Apply</Button>
      </Box>
    </Box>
  );

  return (
    <div>
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}
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
            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
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
