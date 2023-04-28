import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from './logo.png';
import './index.css';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import useMediaQuery from '@mui/material/useMediaQuery';
import { theme,styles } from './Theme';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';


export default function ClientHeader() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const userDetail = JSON.parse(localStorage.getItem('userInfo'));
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function logout() {
    localStorage.clear();
    location.replace('/#/logout');
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const DesktopNavigation = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <>
        <Button color="inherit" startIcon={<HomeIcon />}>
          Home
        </Button>

        <div>
          <Button
            color="inherit"
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            startIcon={<SettingsIcon />}
            onClick={handleToggle}
          >
            Setting
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                        <a href="/#/changePassword">Change Password</a>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          logout(e);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Button color="inherit" startIcon={<AccountCircleIcon />}>
          "TESTING"
        </Button>
      </>
    );
  };

  const MobileNavigation = () => {
      const hamburgerRef = React.useRef(null);
      const [openDrawer, setOpenDrawer] = React.useState(false);
      const prevOpen1 = React.useRef(openDrawer);
      React.useEffect(() => {
        if (prevOpen1.current === true && open === false) {
          hamburgerRef.current.focus();
        }
    
        prevOpen1.current = openDrawer;
      }, [openDrawer]);
      const iOS =
        typeof navigator !== 'undefined' &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);
    
      return (
        <React.Fragment>
          <IconButton
            sx={styles.menuIconContainer}
            ref={hamburgerRef}
            onClick={() => setOpenDrawer(!openDrawer)}
            disableRipple
          >
            <MenuIcon sx={styles.hamburgerMenuIcon} />
          </IconButton>
          <Popper
            open={openDrawer}
            anchorEl={hamburgerRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: "placement === 'bottom-start' ? 'left top' : 'left bottom'",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem>
                        <a href="/#/changePassword">Home</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="/#/changePassword">Change Password</a>
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          logout(e);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      );
    };
  const isMobileMode = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <AppBar position="static" className="header-b2b">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={Logo} alt="Machadalo" />
        </Typography>
        {isMobileMode ? <MobileNavigation /> : <DesktopNavigation />}
      </Toolbar>
    </AppBar>
  );
}
