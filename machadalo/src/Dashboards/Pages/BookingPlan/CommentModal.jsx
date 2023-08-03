import React from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form';

export default function CommentModal() {
  return (
    <>
      <div>
        <div className='comment-box'>
          <div className='cboxinner d-flex'>
            <span className='me-3'><BsFillPersonFill /></span>  <span><span className='comment-author'>vidhidevelopment :</span><span className='comment-time'> Sep 16, 2020 8:17:58 PM</span>
              <p className='comment-text'>Test</p></span>
          </div>
          <div className='cboxinner d-flex'>
            <span className='me-3'><BsFillPersonFill /></span>  <span><span className='comment-author'>vidhidevelopment :</span><span className='comment-time'> Sep 16, 2020 8:17:58 PM</span>
              <p className='comment-text'>Test</p></span>
          </div>
          <div className='cboxinner d-flex'>
            <span className='me-3'><BsFillPersonFill /></span>  <span><span className='comment-author'>vidhidevelopment :</span><span className='comment-time'> Sep 16, 2020 8:17:58 PM</span>
              <p className='comment-text'>Test</p></span>
          </div>
          <div className='cboxinner d-flex'>
            <span className='me-3'><BsFillPersonFill /></span>  <span><span className='comment-author'>vidhidevelopment :</span><span className='comment-time'> Sep 16, 2020 8:17:58 PM</span>
              <p className='comment-text'>Test</p></span>
          </div>
          <div className='cboxinner d-flex'>
            <span className='me-3'><BsFillPersonFill /></span>  <span><span className='comment-author'>vidhidevelopment :</span><span className='comment-time'> Sep 16, 2020 8:17:58 PM</span>
              <p className='comment-text'>Test</p></span>
          </div>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder='Write here' rows={3} />
          </Form.Group>

          <div>
            <button className='btn me-3 btn-primary'>Add Comments</button>
          </div>
        </div>
      </div>
    </>
  );
}
