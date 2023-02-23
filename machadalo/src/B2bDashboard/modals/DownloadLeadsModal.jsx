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
import { viewLeadFilters } from '../API/_state';
import { useRecoilValue } from 'recoil';
import { LeadDetailActions } from '../API/_actions';

export default function DownloadLeadsModal(props) {
  const [open, setOpen] = React.useState(false);
  const filters = useRecoilValue(viewLeadFilters);
  const leadDetailApi = LeadDetailActions();

  const handleClickOpen = () => {
    setOpen(true);
  };

  function downloadLeads() {
    leadDetailApi.DownloadLeadsSummary(props.data.id);
    //  let url = `https://stagingapi.machadalo.com/v0/ui/b2b/download-leads-summary/?lead_type=${filters.lead_type}&supplier_code=${filters.supplier_type}&campaign_id=${props.data.id}`
    //   window.open(url,'_blank');
  }

  const handleClose = () => {
    setOpen(false);
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
          handleClickOpen();
        }}
      >
        Download
      </Button>
      <Dialog className="modal-comment" open={open} onClose={handleClose}>
        <Button
          className="close-btn"
          onClick={(e) => {
            handleClose();
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
                  <input hidden accept="image/*" type="file" />
                  <CloudUploadIcon style={{ fill: '#fff' }} />
                </IconButton>
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>

              <Button variant="contained" className="theme-btn">
                Upload Comments
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
