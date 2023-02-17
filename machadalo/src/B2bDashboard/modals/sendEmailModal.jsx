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
import { clientStatusAtom, errorAtom } from '../API/_state';
import { useRecoilValue, useRecoilState } from 'recoil';
import { LeadDetailActions } from '../API/_actions';

export default function SendEmailModal(props) {
  const [open, setOpen] = React.useState(false);
  const clientStatus = useRecoilValue(clientStatusAtom);
  const leadDetailApi = LeadDetailActions();
  const [fields, setFields] = React.useState({
    status: '',
    emails: '',
    campaign_id: props.data.id,
  });
  const [error, setError] = useRecoilState(errorAtom);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChange = (event) => {
    setFields({ ...fields, status: event.target.value });
  };

  const sendEmails = async () => {
    await leadDetailApi.sendEmails(fields);
    setFields({ ...fields, emails: '', status: '' });
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
        Email
      </Button>
      <Dialog className="modal-comment" open={open} onClose={handleClose}>
        <Button
          className="close-btn"
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Button>
        <DialogTitle className="title-modal">Send Email</DialogTitle>
        <DialogContent className="content-modal">
          <DialogContentText className="text-black" variant="h5" sx={{ pb: 2 }}>
            Select Email Type:
          </DialogContentText>
          <Box className="d-flex">
            <FormControl fullWidth sx={{ mb: 2, mr: 2 }}>
              <InputLabel id="demo-simple-select-label">Email</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fields.status}
                label="Email"
                onChange={handleChange}
              >
                {clientStatus.map((status, index) => (
                  <MenuItem key={index} value={status.status_name} className="select-menu-list">
                    {status.status_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              id="outlined-basic"
              label="Enter Multiple User's Email To Send Mail"
              variant="outlined"
              value={fields.emails}
              onChange={(e) => {
                setFields({ ...fields, emails: e.target.value });
              }}
            />
          </Box>
          <Typography>
            Note :- Use comma separation between emails to send multiple emails to users at the same
            time
          </Typography>
        </DialogContent>
        <DialogActions className="justify-content-between modal-btn">
          <Button onClick={(e) => sendEmails()}>Send email for given user</Button>
          <Typography>Or</Typography>
          <Button onClick={(e) => handleClose()}>Send email to all (Default)</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
