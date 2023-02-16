import * as React from 'react';
import { Typography, Select, FormControl, MenuItem, InputLabel, DialogTitle, DialogContentText, DialogContent, DialogActions, Box, Dialog, TextField, Button } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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
            >
            </DialogContentText>
            <Box sx={{}} className="comment-all d-flex">
              <FormControl  sx={{ mb: 2, mr: 2, width:250 }}>
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
              <Box></Box>

            </Box>
            <Typography className='pb-2'>Previous Comments</Typography>
            <Box sx={{maxHeight: "250px", overflowX: "hidden", overflowY: "scroll"}}>
              <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Kriti" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Kritiuser"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          kriti test company -  Feb 14, 2023 3:38:33 PM
                        </Typography>
                        <Typography>{"test 1111"}</Typography>
                        
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Kriti" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Kritiuser"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          kriti test company -  Feb 14, 2023 3:38:33 PM
                        </Typography>
                        <Typography>{"test 1111"}</Typography>
                        
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Kriti" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Kritiuser"
                    secondary={
                     <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          kriti test company -  Feb 14, 2023 3:38:33 PM
                        </Typography>
                        <Typography>{"test 1111"}</Typography>
                        
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>

            </Box>
          </DialogContent>
          <DialogActions className="modal-btn d-flex justify-content-between">
            <Box>
              <TextField
                sx={{ width: 250 }}
                className="textarea-modal"
                placeholder="Write Here"
                multiline
                rows={1}
              />
            </Box>
            <Box>
              <Button onClick={handleClose}>Add Comment</Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ViewCommentModal;
