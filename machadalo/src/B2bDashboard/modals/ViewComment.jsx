import React, { useState } from 'react';
import { Button, Modal, Typography, Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ViewCommentModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  function commentModal(e) {
    setOpen(true);
  }
  return (
    <>
      <Button
        variant="contained"
        size="small"
        className="theme-btn text-small"
        onClick={(e) => {
          commentModal(e);
        }}
      >
        View Comment
      </Button>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default ViewCommentModal;
