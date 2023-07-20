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
        <Form.Group as={Row} className="mb-3 form-mainbox" controlId="formPlaintextEmail">
          <div className='pb-3 form-div'>
            <Form.Label>Sector</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Sector"
              id="sector"
              placeholder="Select Sector"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>Sub Sector</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Sub Sector"
              id="sub-sector"
              placeholder="Sub Sector"
            />
          </div>

          <div className='pb-3 form-div'>
            <Form.Label>Current Partner</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Current Partner"
              id="partner"
              placeholder="Current Partner"
            />
          </div>

        
          <div className='pb-3 form-div'>
            <Form.Label>Preferred Partner</Form.Label>
            {/* <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Preferred Partner"
              id="preferred-partner"
              placeholder="Preferred Partner"
            /> */}
            <Select
              label="Assign To"
              id="assign"
              placeholder="Select User For Assign"
              isMulti={true}
              // value={multiSelect}
              // onChange={handleMultiSelect}
              options={[{ label: 'painting', id: 1 }, { label: 'Elevator', id: 2 }, { label: 'Cars', id: 3 }]}
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>L4 Answers</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="L4 Answers"
              id="l4-answers"
              placeholder="L4 Answers"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>L5 Answers</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="L5 Answers"
              id="l5-answers"
              placeholder="L5 Answers"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>L6 Answers</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="L6 Answers"
              id="l6-answers"
              placeholder="L6 Answers"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>Lead Status</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Lead Status"
              id="lead-status"
              placeholder="Lead Status"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>Supplier</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Supplier"
              id="supplier"
              placeholder="Supplier"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>Agency</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Agency"
              id="agency"
              placeholder="Agency"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>Agency User</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Agency User"
              id="agency-user"
              placeholder="Agency User"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>Call Status</Form.Label>
            <Select
              options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
              onChange={handleTypeSelect}
              //   value={organisationOptions.filter(function (option) {
              //     return option.value === selectedOption;
              //   })}
              label="Call Status"
              id="call-status"
              placeholder="Call Status"
            />
          </div>
          <div className='pb-3 form-div'>
            <Form.Label>FeedBack</Form.Label>
            <textarea name="postContent" placeholder='feedback' />
          </div>


          <div className='pb-3 form-div price-div'>
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Enter price" />
          </div>
          <div className='pb-3 form-div form-static'>
            <Form.Label>Lead Given by</Form.Label>
            <p className='form-p'>
              <span className='fw-medium'>Name:</span> fdg<br />
              <span>Number:</span> 8082356021
            </p>
          </div>
          <div className='pb-3 form-div form-static'>
            <Form.Label>Timestamp</Form.Label>
            <p className='form-p'>
              <span> Submitted:</span> Apr 5, 2023 4:58:21 PM <br />
              <span> Ops Verify:</span> Apr 13, 2023 4:02:55 PM <br />
              <span> Ops Verify Name:</span> Admin
            </p>
          </div>

        </Form.Group>
      </Form>
    </div>
  );
}
