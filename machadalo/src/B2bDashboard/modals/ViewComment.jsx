import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ViewCommentModal = (props) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
        <Dialog className="modal-comment" open={open} onClose={handleClose}>
          <DialogTitle className="title-modal">View Comments</DialogTitle>
          <DialogContent className="content-modal">
            <DialogContentText
              className="text-black"
              variant="h5"
              textAlign={'center'}
              sx={{ pb: 2 }}
            >
              Comments
            </DialogContentText>
            <Box sx={{}}>
              <FormControl fullWidth sx={{ mb: 2 }}>
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
              <TextField
                fullWidth
                className="textarea-modal"
                placeholder="Write Here"
                multiline
                rows={5}
              />
            </Box>
          </DialogContent>
          <DialogActions className="flex-start modal-btn">
            <Button onClick={handleClose}>Add Comment</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ViewCommentModal;
