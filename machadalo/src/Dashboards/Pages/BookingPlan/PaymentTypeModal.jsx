import React from 'react';
import Form from 'react-bootstrap/Form';

export default function PaymentTypeModal() {
  return (
    <>
      <h6>Check Payment Details, Edit As per requirement and send to Account</h6>
      <div>
        {/* <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control placeholder="Beneficiary Name"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Control placeholder="Bank Account Number"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Control placeholder="IFSC Code"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Control placeholder="Negotiated Price"  />
        </Form.Group>    <Form.Group className="mb-3" controlId="">
          <Form.Control placeholder="Message"  />
        </Form.Group>
        <button className='btn btn-primary'>Send</button>
      </div>
    </>
  );
}
