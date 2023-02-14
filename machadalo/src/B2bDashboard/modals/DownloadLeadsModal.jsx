import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
      <Dialog className="modal-comment" open={open} onClose={handleClose}>
        <DialogTitle className="title-modal">Download All leads</DialogTitle>
        <DialogContent className="content-modal">
          <DialogContentText></DialogContentText>
          <Box className="d-flex justify-content-between upload-btns">
            <Box>
              <Button variant="contained" className="theme-btn">Download Leads</Button>
            </Box>
            <Box className=" text-white ">
            
              <Button variant="contained" className='theme-btn' component="label">
              <IconButton color="" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <CloudUploadIcon  style={{ fill: '#fff' }}/>
              </IconButton>
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>
              
            </Box>
            <Box>
              <Button variant="contained" className="theme-btn">Upload Comments</Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
