import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function FilterModal() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleSearch = (e, data) => {
    alert(1);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      Filtesr
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
