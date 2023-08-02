import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';

export default function AssignUserModal() {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Supplier Type</Form.Label>
          <Select
            className=""
            options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
            label="Supplier Type"
            id="SupplierType"
            placeholder="Supplier Type"
          />
          <Form.Label>Assigned To</Form.Label>
          <Select
            className=""
            options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
            label="Supplier Type"
            id="SupplierType"
            placeholder="Supplier Type"
          />
        </Form.Group>
      </Form>
    </>
  );
}
