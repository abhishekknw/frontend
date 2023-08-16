import React from 'react';
import Form from 'react-bootstrap/Form';

export default function PaymentTypeModal() {
  return (
    <>
      testign
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" placeholder="Enter comments for permission box" rows={3} />
      </Form.Group>
    </>
  );
}
