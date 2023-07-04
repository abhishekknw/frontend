import React, { useEffect, useState } from 'react';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { DecisionBoardActions } from '../../_actions';
import Select from 'react-select';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function CampaignAssignModal(props) {
  const DecisionBoard = DecisionBoardActions();
  const { proposalData } = props;
  const [selectedOption, setSelectedOption] = useState('');
  const [organisationOptions, setOrganisationOptions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [multiSelect, setMultiSelect] = useState([]);

  const handleTypeSelect = async (e) => {
    setSelectedOption(e.value);
    let res = await DecisionBoard.getUserMinimalList(e.value);
    setUserList(res);
  };

  const handleMultiSelect = (e) => {
    setMultiSelect(e);
  };

  useEffect(() => {
    async function getOrganisationList() {
      let response = await DecisionBoard.getOrganisationList();
      setOrganisationOptions(response);
    }
    getOrganisationList();
  }, []);

  return (
    <div>
      <>
        <Modal show={props.show} onHide={props.close} className="wpModal">
          <Modal.Header closeButton>
            <Modal.Title>Assign Campaign to Operations Manager</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Select
                  options={organisationOptions}
                  onChange={handleTypeSelect}
                  value={organisationOptions.filter(function (option) {
                    return option.value === selectedOption;
                  })}
                  label="Organisations"
                  id="organisation"
                  placeholder="Select Organisation"
                />
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Select
                  label="Assign To"
                  id="assign"
                  placeholder="Select User For Assign"
                  isMulti={true}
                  value={multiSelect}
                  onChange={handleMultiSelect}
                  options={userList}
                />
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Assigned User
                </Form.Label>
                <Col sm="10">
                  <ListGroup>
                    {proposalData?.assignment_detail?.map((item, index) => {
                      return <ListGroupItem key={index}>{item.assigned_to.assigned_to_name},({item.assigned_to.organisation_name})</ListGroupItem>;
                    })}
                  </ListGroup>
                </Col>
              </Form.Group>
            </Form>
            <Button type="button" className="btn btn-primary submit-btn">
              Assign
            </Button>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
