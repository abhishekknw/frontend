import React, { useState } from 'react';
import { Table, Button, Form, Modal, ListGroup } from 'react-bootstrap';
import Select from 'react-select';
export default function AddSupplierModal() {
  const [filtersCheckbox, setFiltersCheckbox] = useState([
    { label: 'Poster(PO)', value: 'PO', checked: false },
    { label: 'Standee(ST)', value: 'ST', checked: false },
    { label: 'Stall(SL)', value: 'SL', checked: false },
    { label: 'Flyer(FL)', value: 'FL', checked: false },
    { label: 'Banner(BA)', value: 'BA', checked: false },
    { label: 'Gateway Arch', value: 'GA', checked: false },
    { label: 'SunBoard(SB)', value: 'SB', checked: false },
  ]);
  return (
    <>
      <div className="text-end">
        <span>
          <Button className="btn me-3 btn-warning" variant="warning">
            Search and Finalize
          </Button>
        </span>
        <span>
          <Button className="btn btn-primary">Finalize List</Button>
        </span>
      </div>
      <div className="filterbx">
        <h4>Select Filters</h4>
        <Form>
          <div className="mb-3 b-form-maindiv">
            {filtersCheckbox.map((item, index) => {
              return (
                <Form.Check type="checkbox" id={`filters${item?.label}`}>
                  <Form.Check.Input type="checkbox" isValid />
                  <Form.Check.Label>{item?.label}</Form.Check.Label>
                </Form.Check>
              );
            })}
          </div>
        </Form>
        <div className="filter-selectdiv">
          <Select
            className="filter-select mb-3"
            options={[{ label: 'All' }, { label: 'All' }, { label: 'All' }]}
            label="Select Supplier"
            id="selectsupplier"
            placeholder="Select Supplier"
          />
          <Select
            className="filter-select mb-3"
            options={[{ label: 'All' }, { label: 'All' }, { label: 'All' }]}
            label="Select Center"
            id="selectcenter"
            placeholder="Select Center"
          />
          <Select
            className="filter-select mb-3"
            options={[{ label: 'All' }, { label: 'All' }, { label: 'All' }]}
            label="Select Area"
            id="selectarea"
            placeholder="Select Area"
          />
          <Select
            className="filter-select mb-3"
            options={[{ label: 'All' }, { label: 'All' }, { label: 'All' }]}
            label="Select SubArea"
            id="selectsubarea"
            placeholder="Select SubArea"
          />
        </div>

        <button className="btn btn-primary mb-2 mt-2">Search</button>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" placeholder="Enter Text" rows={3} />
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
