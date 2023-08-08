import React, { useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import { Button } from 'react-bootstrap';
import dayjs from 'dayjs';

export default function CommentModal(props) {
  const { data, commentType } = props;
  const BookingApi = BookinPlanActions();
  const [commentList, setCommentList] = useState([]);
  const [postCommentData, setPostCommentData] = useState({
    comment: '',
    related_to: commentType === 'externalComments' ? 'EXTERNAL' : 'INTERNAL',
    shortlisted_spaces_id: data?.id,
  });
  const [getApi, setGetAPi] = useState(false);

  async function getCommentList(data, type) {
    let response = await BookingApi.getCommetByShortlistedId(data, type);
    setCommentList(response);
  }

  async function postComment() {
    await BookingApi.postCommentByShortlistedId(postCommentData);
    setGetAPi(!getApi);
  }
  useEffect(() => {
    getCommentList(data, commentType);
  }, [getApi]);

  return (
    <>
      <div>
        <div className="comment-box">
          {commentList &&
            !!commentList &&
            commentList.map((item, index) => {
              return (
                <div className="cboxinner d-flex" key={index}>
                  <span className="me-3">
                    <BsFillPersonFill />
                  </span>{' '}
                  <span>
                    <span className="comment-author">{item?.user_name} :</span>
                    <span className="comment-time">
                      {' '}
                      {dayjs(item?.timestamp).format('MMM D, YYYY h:mm:ss A')}
                    </span>
                    {/* Sep 16, 2020 8:17:58 PM */}
                    <p className="comment-text">{item?.comment}</p>
                  </span>
                </div>
              );
            })}
        </div>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                placeholder="Write comment here"
                rows={3}
                onChange={(e) => {
                  setPostCommentData({ ...postCommentData, comment: e?.target?.value });
                }}
              />
            </Form.Group>
            <div>
              <Button
                className="btn me-3 btn-primary"
                disabled={!postCommentData.comment && postCommentData.comment === ''}
                onClick={(e) => postComment()}
              >
                Add Comments
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
