import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useRecoilValue } from 'recoil';
import { UserMinimalListAtom } from '../../_states';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';

export default function AssignUserModal(props) {
  const { data } = props;
  console.log(data, 'q222222222222222');
  const userMinimalList = useRecoilValue(UserMinimalListAtom);
  const [postData, setPostData] = useState({
    assigned_by: '',
    assigned_to_ids: [],
    campaign_id: '',
  });
  console.log(postData, 'postData');

  function handleSelect(select) {
    console.log(select);
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Supplier Type</Form.Label>
          <SelectDropdown
            optionsData={userMinimalList}
            selectedValue={postData.brand_organisation_id}
            placeholder="Select Organisation"
            label="Select Organisation"
            id="SelectOrganisation"
            handleSelect={handleSelect}
          />
          {/* <Form.Label>Assigned To</Form.Label>
          <Select
            className="selectbx"
            options={[{ label: 'painting' }, { label: 'Elevator' }, { label: 'Cars' }]}
            label="Supplier Type"
            id="SupplierType"
            placeholder="Supplier Type"
          /> */}
        </Form.Group>
        <div>
          <Button className="btn btn-primary" type="button">
            Assign User
          </Button>
        </div>
      </Form>
    </>
  );
}
