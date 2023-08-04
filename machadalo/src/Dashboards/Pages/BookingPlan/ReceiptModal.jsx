import React from 'react';
import Form from 'react-bootstrap/Form';

export default function ReceiptModal() {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" placeholder='Enter comments for permission box' rows={3} />
      </Form.Group>
      <div>
        <span><button className='btn me-3 btn-primary'>Edit</button></span>
      </div>
    </>
  );
}
