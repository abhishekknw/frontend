import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { LeadDetailActions } from '../API/_actions';
import { leadDetailData } from '../API/_state';
import { useRecoilValue } from 'recoil';

export default function LeadDetailModal(props) {
  const leadDetailApi = LeadDetailActions();
  const leadDetail = useRecoilValue(leadDetailData);
  const { data } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    await leadDetailApi.getLeadDetailsData(data._id);
    setOpen(true);
    console.log(leadDetail, 'leadDetail');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
              <Box>Share Date:{leadDetail?.sector?.lead_assigned?.datetime}</Box>
              <Box>
                <strong>Assigned by :</strong> {leadDetail?.sector?.lead_assigned?.assignedby}
              </Box>
              <Box>
                <strong>Assigned to :</strong> {leadDetail?.sector?.lead_assigned?.assignedto}
              </Box>
            </Box>
            <Box className="d-flex">
              <Box>
                <Box className="pb-3">
                  <Typography variant="h6" className="heading-with-bg">
                    Sector :
                  </Typography>
                  <Typography>{leadDetail?.sector?.sector}</Typography>
                </Box>
                <Box className="pb-3">
                  <Typography variant="h6" className="heading-with-bg">
                    Sector Specific Questions :
                  </Typography>
                  <Typography className="d-flex justify-content-between mb-2">
                    Q1.Response : <QuestionMarkIcon />
                  </Typography>
                  <Typography className="d-flex justify-content-between mb-2">
                    Q2.Response : <QuestionMarkIcon />
                  </Typography>
                  <Typography className="d-flex justify-content-between mb-2">
                    Q3.Response : <QuestionMarkIcon />
                  </Typography>
                </Box>
                <Box className="pb-3">
                  <Typography variant="h6" className="heading-with-bg">
                    User Details :
                  </Typography>
                  <Typography className="mb-2">
                    {leadDetail?.user_info?.name},{leadDetail?.user_info?.number},
                    {leadDetail?.user_info?.designation}
                  </Typography>
                </Box>
                <Box className="pb-3">
                  <Typography variant="h6" className="heading-with-bg">
                    Address :
                  </Typography>
                  <Typography className="mb-2">
                    {leadDetail?.adress_details?.address},{leadDetail?.adress_details?.area},
                    {leadDetail?.adress_details?.city},{leadDetail?.adress_details?.state},
                    {leadDetail?.adress_details?.country},{leadDetail?.adress_details?.pincode}, ({' '}
                    {leadDetail?.adress_details?.lat}, {leadDetail?.adress_details?.long})
                  </Typography>
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
