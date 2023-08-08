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

  async function getCommentList(data, type) {
    let response = await BookingApi.getCommetByShortlistedId(data, type);
    setCommentList(response);
  }
  useEffect(() => {
    getCommentList(data, commentType);
  }, [1]);

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
          {/* <div className="cboxinner d-flex">
            <span className="me-3">
              <BsFillPersonFill />
            </span>{' '}
            <span>
              <span className="comment-author">vidhidevelopment :</span>
              <span className="comment-time"> Sep 16, 2020 8:17:58 PM</span>
              <p className="comment-text">Test</p>
            </span>
          </div>
          <div className="cboxinner d-flex">
            <span className="me-3">
              <BsFillPersonFill />
            </span>{' '}
            <span>
              <span className="comment-author">vidhidevelopment :</span>
              <span className="comment-time"> Sep 16, 2020 8:17:58 PM</span>
              <p className="comment-text">Test</p>
            </span>
          </div>
          <div className="cboxinner d-flex">
            <span className="me-3">
              <BsFillPersonFill />
            </span>{' '}
            <span>
              <span className="comment-author">vidhidevelopment :</span>
              <span className="comment-time"> Sep 16, 2020 8:17:58 PM</span>
              <p className="comment-text">Test</p>
            </span>
          </div>
          <div className="cboxinner d-flex">
            <span className="me-3">
              <BsFillPersonFill />
            </span>{' '}
            <span>
              <span className="comment-author">vidhidevelopment :</span>
              <span className="comment-time"> Sep 16, 2020 8:17:58 PM</span>
              <p className="comment-text">Test</p>
            </span>
          </div> */}
        </div>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder="Write here" rows={3} />
          </Form.Group>
          <div>
            <Button className="btn me-3 btn-primary">Add Comments</Button>
          </div>
        </div>
      </div>
    </>
  );
}
