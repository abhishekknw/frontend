import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export default function SendEmailModal() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="theme-btn"
        variant="contained"
        size="small"
        style={{}}
        onClick={(e) => {
          handleClickOpen();
        }}
        startIcon={<EmailIcon />}
      >
        Email Leads
      </Button>
      <Dialog className="modal-comment" open={open} onClose={handleClose}>
      <Button className='close-btn'><CloseIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }}/></Button>
        <DialogTitle className="title-modal">Send Email</DialogTitle>
        <DialogContent className="content-modal">
          <DialogContentText
            className="text-black"
            variant="h5"
            sx={{ pb: 2 }}>
            Select Email Type:
          </DialogContentText>
          <Box className="d-flex">
            <FormControl fullWidth sx={{ mb: 2, mr: 2 }}>
              <InputLabel id="demo-simple-select-label">All</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>All</MenuItem>
                <MenuItem value={20}>Company Comment</MenuItem>
                <MenuItem value={30}>Machadalo Comments</MenuItem>
                <MenuItem value={40}>Company's client comment</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth id="outlined-basic" label="Enter Multiple User's Email To Send Mail" variant="outlined" />

          </Box>
          <Typography>Note :- Use comma separation between emails to send multiple emails to users at the same time</Typography>
        </DialogContent>
        <DialogActions className='justify-content-between modal-btn'>
          <Button onClick={handleClose}>Send email for given user</Button> 
          <Typography>Or</Typography>
          <Button onClick={handleClose}>Send email to all (Default)</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
