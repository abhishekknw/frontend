import * as React from 'react';
import {
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Box,
  Dialog,
  TextField,
  Button,
} from '@mui/material';
import dayjs from 'dayjs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { decisionPendingActions } from '../API/_actions';
import { commentListAtom } from '../API/_state';
import { useRecoilValue } from 'recoil';

import CloseIcon from '@mui/icons-material/Close';
const ViewCommentModal = (props) => {
  const LeadBasicApi = decisionPendingActions();
  const commentList = useRecoilValue(commentListAtom);
  const [comment, setComment] = React.useState('');
  const [commentType, setCommentType] = React.useState('all');
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState({});

  const handleClose = () => setOpen(false);

  const handleChange = async (event) => {
    setCommentType(event.target.value);
    await LeadBasicApi.getCommentList(rowData, event.target.value);
  };

  async function commentModal(row, type) {
    await LeadBasicApi.getCommentList(row, type);
    setOpen(true);
    setRowData({ ...row });
  }

  async function addComment() {
    let data = [{ comment: comment, _id: rowData?._id, requirement_id: rowData?.requirement_id }];
    if (comment.length > 0) {
      await LeadBasicApi.postComment(data);
      setComment('');
      commentModal(rowData, commentType);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        size="small"
        className="theme-btn text-small"
        onClick={(e) => {
          commentModal(props.data, commentType);
        }}
      >
        View / Add
      </Button>

      <div>
        <Dialog className="modal-comment" open={open} onClose={handleClose}>
          <Button className="close-btn" onClick={(e) => setOpen(false)}>
            <CloseIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </Button>
          <DialogTitle className="title-modal">View Comments</DialogTitle>
          <DialogContent className="content-modal">
            <DialogContentText
              className="text-black"
              variant="h5"
              textAlign={'center'}
            ></DialogContentText>
            <Box sx={{}} className="comment-all d-flex">
              <FormControl sx={{ mb: 2, mr: 2, width: 250 }}>
                <InputLabel id="demo-simple-select-label">All</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={commentType}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={'all'}>All</MenuItem>
                  <MenuItem value={'company_comment'}>Company Comment</MenuItem>
                  <MenuItem value={'machadalo_comment'}>Machadalo Comments</MenuItem>
                  <MenuItem value={'company_client_comment'}>Company's client comment</MenuItem>
                </Select>
              </FormControl>
              <Box></Box>
            </Box>
            <Typography className="pb-2">{commentType} Comments</Typography>
            <Box sx={{ maxHeight: '250px', overflowX: 'hidden', overflowY: 'scroll' }}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {commentList.map((data, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemAvatar>
                      <Avatar alt={data.comment_by.charAt(0)} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={data.comment_by}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {dayjs(data.created_at).format('MMM D, YYYY h:mm A')}
                          </Typography>
                          <Typography>{data.comment}</Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
                <Divider variant="inset" component="li" />
              </List>
            </Box>
          </DialogContent>
          <DialogActions className="modal-btn d-flex justify-content-between">
            <Box>
              <TextField
                sx={{ width: 450 }}
                className="textarea-modal"
                placeholder="Write Here"
                multiline
                rows={1}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Box>
            <Box>
              <Button onClick={(e) => addComment(e)}>Add Comment</Button>
            </Box>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default ViewCommentModal;
