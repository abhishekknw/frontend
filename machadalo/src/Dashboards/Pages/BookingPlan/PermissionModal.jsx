import React from 'react';
import Form from 'react-bootstrap/Form';
// import Imagef from '../../../../';

export default function PermissionModal() {
  return (
    <>
      {/* <img src={Imagef} /> */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" placeholder='Enter comments for permission box' rows={3} />
      </Form.Group>

      <div>
        <span><button className='btn me-3 btn-danger'>Edit</button></span>
      </div>
    </>
  );
}
