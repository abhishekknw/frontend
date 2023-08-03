import React from 'react';
import Form from 'react-bootstrap/Form';
export default function ImportSheetModal() {
  return  (
    <>
    <div>
      <Form.Group controlId="formFile" className="mb-3">
        {/* <Form.Label>Default file input example</Form.Label> */}
        <Form.Control type="file" />
      </Form.Group>
      <a href="#">Sample Sheet</a>
      <div className='mt-4'>
        <button className='btn btn-primary'>Submit</button>
      </div>
    </div>
    
    </>
    );
}
