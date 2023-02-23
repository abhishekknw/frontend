import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { LeadDetailActions } from '../API/_actions';

export default function DownloadLeadsModal(props) {
  const [open, setOpen] = React.useState(false);
  const leadDetailApi = LeadDetailActions();
  const [file, setFile] = React.useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    leadDetailApi.uploadComments(formData);
  };

  const downloadLeads = () => {
    leadDetailApi.DownloadLeadsSummary(props.data.id);
  };

  return (
    <>
      <Button
        className="theme-btn"
        variant="contained"
        size="small"
        startIcon={<CloudDownloadIcon />}
        style={{}}
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Download
      </Button>
      <Dialog
        className="modal-comment"
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <Button
          className="close-btn"
          onClick={(e) => {
            setOpen(false);
          }}
        >
          <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Button>
        <DialogTitle className="title-modal">Download All leads</DialogTitle>
        <DialogContent className="content-modal">
          <DialogContentText></DialogContentText>
          <Box className="d-flex justify-content-around upload-btns">
            <Box>
              <Typography className=" pb-3 text-black text-center red-font" variant="h6">
                Download Leads
              </Typography>
              <Button
                variant="contained"
                className="theme-btn"
                onClick={(e) => {
                  downloadLeads();
                }}
              >
                Download Leads
              </Button>
            </Box>
            <Box className=" text-white ">
              <Typography className="text-black text-center pb-3  red-font" variant="h6">
                Upload Comments
              </Typography>
              <Button variant="contained" className="theme-btn mx-4" component="label">
                <IconButton color="" aria-label="upload picture" component="label">
                  <input hidden type="file" onChange={handleFileChange} />
                  <CloudUploadIcon style={{ fill: '#fff' }} />
                </IconButton>
                Upload file
                {/* <input hidden accept="image/*" multiple type="file" /> */}
              </Button>
              <Button
                variant="contained"
                className="theme-btn"
                onClick={(e) => {
                  uploadFile(e);
                }}
              >
                Upload Comments
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
