import React from 'react';
import { Table, Button, Form, Modal, ListGroup } from 'react-bootstrap';
import Select from 'react-select';
export default function AddSupplierModal() {
  return (
    <>
      <div className='text-end'>
        <span><button className='btn me-3 btn-warning'>Search and Finalize</button></span>
        <span><button className='btn btn-primary'>Finalize List</button></span>
      </div>
      <div className='filterbx'>
        <h4>Select Filters</h4>

        <Form>
          <div className="mb-3 b-form-maindiv">
            <Form.Check type="checkbox" id="Freebies-WhatsApp">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>Poster(PO)</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>
            <Form.Check type="checkbox" id="Freebies-Email">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>Standee(ST)</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>
            <Form.Check type="checkbox" id="Freebies-Billing">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>  Stall(SL)</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>
            <Form.Check type="checkbox" id="Freebies-Announcement">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>Flyer(FL)</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>
            <Form.Check type="checkbox" id="Freebies-Email">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>Banner(BA)</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>
            <Form.Check type="checkbox" id="Freebies-Billing">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>  Gateway Arch</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>
            <Form.Check type="checkbox" id="Freebies-Announcement">
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label>SunBoard(SB)</Form.Check.Label>
              {/* <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback> */}
            </Form.Check>

          </div>
        </Form>
        <div className='filter-selectdiv'>
        <Select
          className="filter-select mb-3"
          options={[
            { label: 'All' },
            { label: 'All' },
            { label: 'All' },
          ]}
          label="Select Supplier"
          id="selectsupplier"
          placeholder="Select Supplier"
        />
        <Select
          className="filter-select mb-3"
          options={[
            { label: 'All' },
            { label: 'All' },
            { label: 'All' },
          ]}
          label="Select Center"
          id="selectcenter"
          placeholder="Select Center"
        />
        <Select
          className="filter-select mb-3"
          options={[
            { label: 'All' },
            { label: 'All' },
            { label: 'All' },
          ]}
          label="Select Area"
          id="selectarea"
          placeholder="Select Area"
        />
        <Select
          className="filter-select mb-3"
          options={[
            { label: 'All' },
            { label: 'All' },
            { label: 'All' },
          ]}
          label="Select SubArea"
          id="selectsubarea"
          placeholder="Select SubArea"
        />

        </div>

        <button className='btn btn-primary mb-2 mt-2'>Search</button>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" placeholder='Enter Text' rows={3} />
        </Form.Group>
        </Form>
      </div>

    </>
  );


}
