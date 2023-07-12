import React from 'react';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Select from 'react-select';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function RequirementEditModal(props) {
  const handleTypeSelect = (e) => {
    console.log('122234234', e);
  };
  return (
    <div>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Select
            options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
            onChange={handleTypeSelect}
            //   value={organisationOptions.filter(function (option) {
            //     return option.value === selectedOption;
            //   })}
            label="Organisations"
            id="organisation"
            placeholder="Select Organisation"
          />
        </Form.Group>
      </Form>
    </div>
  );
}
