import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
export default function LeadDetailModal(props) {
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
      >
        Lead Details
      </Button>
      <Dialog className="modal-comment" open={open} onClose={handleClose}>
        <Button
          className="close-btn"
          onClick={(e) => {
            handleClose(e);
          }}
        >
          <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Button>
        <DialogTitle className="title-modal">Lead Details</DialogTitle>
        <Box className="d-flex justify-content-around upload-btns"></Box>

        <DialogContent className="content-modal">
          <DialogContentText>
            <Box className="d-flex justify-content-between mb-3">
              <Box>Share Date:</Box>
              <Box><strong>Assigned by :</strong> kritiuser</Box>
              <Box><strong>Assigned to :</strong> shahid</Box>
            </Box>
            <Box className="d-flex">
              <Box>
                <Box className="pb-3">
                  <Typography variant='h6' className='heading-with-bg'>Sector :</Typography>
                  <Typography >Test sector</Typography>
                </Box>
                <Box className="pb-3">
                  <Typography variant='h6' className='heading-with-bg'>Sector Specific Questions :</Typography>
                  <Typography className='d-flex justify-content-between mb-2' >Q1.Response : <QuestionMarkIcon /></Typography>
                  <Typography className='d-flex justify-content-between mb-2' >Q2.Response : <QuestionMarkIcon /></Typography>
                  <Typography className='d-flex justify-content-between mb-2' >Q3.Response : <QuestionMarkIcon /></Typography>
                </Box>
                <Box className="pb-3">
                  <Typography variant='h6' className='heading-with-bg'>User Details :</Typography>
                  <Typography className='mb-2' >shahid, 7006501835 , Chairman</Typography>
                </Box>
                <Box className="pb-3">
                  <Typography variant='h6' className='heading-with-bg'>Address :</Typography>
                  <Typography className='mb-2' >this is a test address for the society for shahid ,Kaushambi, Mumbai,Maharashtra,India, 110049,(28.445353,72.31555)</Typography>
                </Box>
              </Box>
              <Box>
                

              </Box>
            </Box>



          </DialogContentText>

        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
