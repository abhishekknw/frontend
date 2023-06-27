import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { DecisionBoardActions } from '../../_actions';
import Select from 'react-select';

export default function CampaignAssignModal(props) {
  const DecisionBoard = DecisionBoardActions();
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
            <div>
              <Select
                options={organisationOptions}
                onChange={handleTypeSelect}
                value={organisationOptions.filter(function (option) {
                  return option.value === selectedOption;
                })}
                label="Organisations"
                id='organisation'
                placeholder='Select Organisation'
              />
            </div>
            <br />
            <div>
              <Select
                label="Assign To"
                id='assign'
                placeholder='Select User For Assign'
                isMulti={true}
                value={multiSelect}
                onChange={handleMultiSelect}
                options={userList}
              />
            </div>
            <Button type="button" className="btn btn-primary submit-btn">
              Assign
            </Button>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
