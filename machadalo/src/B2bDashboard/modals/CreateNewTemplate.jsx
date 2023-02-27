import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { LeadDetailActions } from '../API/_actions';

export default function CreateNewTemplate(props) {
  const [open, setOpen] = React.useState(false);
  const leadDetailApi = LeadDetailActions();

  const downloadLeads = () => {
    leadDetailApi.DownloadLeadsSummary(props.data.id);
  };

  return (
    <>
      <Button
        className="theme-btn"
        variant="contained"
        size="small"
        style={{}}
        onClick={(e) => {
          setOpen(true);
        }}
      >
        Create
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
        <DialogTitle className="title-modal">CREATE FIELDS</DialogTitle>
        <DialogContent className="content-modal">
          <Box className="d-flex justify-content-around upload-btns">
            <Box>
              <Typography className=" pb-3 text-black text-center red-font" variant="h6">
                Download Leads
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
