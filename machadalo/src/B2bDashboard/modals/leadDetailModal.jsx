import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  Divider,
  DialogActions,
  TextField,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import dayjs from 'dayjs';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Tooltip } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { LeadDetailActions } from '../API/_actions';
import { leadDetailData } from '../API/_state';
import { useRecoilValue } from 'recoil';
import { commentListAtom } from '../API/_state';
import { decisionPendingActions } from '../API/_actions';
// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function LeadDetailModal(props) {
  const leadDetailApi = LeadDetailActions();
  const LeadBasicApi = decisionPendingActions();
  const leadDetail = useRecoilValue(leadDetailData);
  const commentList = useRecoilValue(commentListAtom);
  const [commentType, setCommentType] = React.useState('all');
  const [comment, setComment] = React.useState('');
  const { data } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async () => {
    await leadDetailApi.getLeadDetailsData(data._id);
    commentModal(data, commentType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async (event) => {
    setCommentType(event.target.value);
    await LeadBasicApi.getCommentList(data, event.target.value);
  };

  async function addComment() {
    let commetDetail = [{ comment: comment, _id: data?._id, requirement_id: data?.requirement_id }];
    if (comment.length > 0) {
      await LeadBasicApi.postComment(commetDetail);
      setComment('');
      commentModal(data, commentType);
    }
  }

  async function commentModal(row, type) {
    await LeadBasicApi.getCommentList(row, type);
  }
  console.log(leadDetail, 'leadDetailleadDetail');

  function toolTipData(data) {
    console.log(data, 'toolTipData');
    return data;
  }
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
                    Q1.Response :
                    <Tooltip
                      style={{}}
                      title={
                        <div>
                          Question 1. {leadDetail?.lead_info?.L4_question.header}
                          <br />
                          A.{leadDetail?.lead_info?.L4_question.a}
                          <br />
                          B.{leadDetail?.lead_info?.L4_question.b}
                          <br />
                          C.{leadDetail?.lead_info?.L4_question.c}
                          <br />
                        </div>
                      }
                    >
                      <QuestionMarkIcon />
                    </Tooltip>
                  </Typography>
                  <Typography className="d-flex justify-content-between mb-2">
                    Q2.Response :
                    <Tooltip
                      style={{}}
                      title={
                        <div>
                          Question 1. {leadDetail?.lead_info?.L5_question.header}
                          <br />
                          A.{leadDetail?.lead_info?.L5_question.a}
                          <br />
                          B.{leadDetail?.lead_info?.L5_question.b}
                          <br />
                          C.{leadDetail?.lead_info?.L5_question.c}
                          <br />
                        </div>
                      }
                    >
                      <QuestionMarkIcon />
                    </Tooltip>
                  </Typography>
                  <Typography className="d-flex justify-content-between mb-2">
                    Q3.Response :
                    <Tooltip
                      style={{}}
                      title={
                        <div>
                          Question 1. {leadDetail?.lead_info?.L6_question.header}
                          <br />
                          A.{leadDetail?.lead_info?.L6_question.a}
                          <br />
                          B.{leadDetail?.lead_info?.L6_question.b}
                          <br />
                          C.{leadDetail?.lead_info?.L6_question.c}
                          <br />
                        </div>
                      }
                    >
                      <QuestionMarkIcon />
                    </Tooltip>
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

                {/* comment */}
                <Box className="pb-3">
                  <Typography variant="h6" className="heading-with-bg">
                    Comment :
                  </Typography>
                  <Typography className="mb-2">
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
                            <MenuItem value={'company_client_comment'}>
                              Company's client comment
                            </MenuItem>
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
                                <Avatar
                                  alt={data.comment_by.charAt(0)}
                                  src="/static/images/avatar/1.jpg"
                                />
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
                          sx={{ width: 400 }}
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
                  </Typography>
                </Box>
                {/* Comment ENd */}
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
