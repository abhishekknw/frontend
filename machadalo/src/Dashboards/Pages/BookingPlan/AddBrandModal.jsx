import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';

export default function AddBrandModal() {
  return (
    <>
       <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Brand </Form.Label>
          <Select
            className="selectbx"
            options={[{ label: ' 0-2 Years' }, { label: 'org in organisation' }, { label: 'Cooling' }]}
            label="Select organization"
            id="Select organization"
            placeholder="Select organization"
          />
         
        </Form.Group>
        <div>
          <button className='btn btn-primary' type='button'>Add Brand</button>
        </div>
      </Form>
    </>
  );
}
