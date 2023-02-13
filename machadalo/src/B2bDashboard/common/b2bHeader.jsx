import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
// import {LogoImage} from '../../../src/assets/image/logo.png';
import '../index.css';
export default function Header() {
  return (
    <AppBar position="static" className="header-b2b">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* <Image src="../../../src/assets/image/logo.png"/> */}
        </Typography>
        <Button color="inherit" startIcon={<HomeIcon />}>
          Home
        </Button>
        <Button color="inherit" startIcon={<SettingsIcon />}>
          Setting
        </Button>
        <Button color="inherit" startIcon={<AccountCircleIcon />}>
          Kriti Harjika
        </Button>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/*This is a simple Menu
			Icon wrapped in Icon 
          <MenuIcon />
        </IconButton> */}
        {/* The Typography component applies
		default font weights and sizes */}
      </Toolbar>
    </AppBar>
  );
}
