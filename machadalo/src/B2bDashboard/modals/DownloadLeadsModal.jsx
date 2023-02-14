import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function DownloadLeadsModal(props) {
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
        startIcon={<CloudDownloadIcon />}
        style={{ marginLeft: 16 }}
        onClick={(e) => {
          handleClickOpen();
        }}
      >
        Download Leads
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download Leads</DialogTitle>
        <DialogContent>
          <DialogContentText>To Download Leads By</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
