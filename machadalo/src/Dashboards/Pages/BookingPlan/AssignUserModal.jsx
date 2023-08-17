import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { UserMinimalListAtom, userInformationAtom } from '../../_states';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
export default function AssignUserModal(props) {
  const BookingApi = BookinPlanActions();
  const { data, campaign } = props;
  const userMinimalList = useRecoilValue(UserMinimalListAtom);
  const userInfo = useRecoilValue(userInformationAtom);
  const [postData, setPostData] = useState({
    assigned_by: userInfo?.id,
    assigned_to_ids: [],
    campaign_id: campaign?.proposal_id,
    supplier_id: data?.supplier_id,
    supplierName: data?.name,
  });
  function handleSelect(select) {
    console.log(select.value);
    setPostData({
      ...postData,
      assigned_to_ids: [select.value],
    });
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Supplier Type</Form.Label>
          <SelectDropdown
            optionsData={userMinimalList}
            selectedValue={postData.assigned_to_ids[0]}
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
          <Button
            className="btn btn-primary"
            type="button"
            onClick={(e) => {
              BookingApi.postSupplierAssignment(postData);
            }}
          >
            Assign User
          </Button>
        </div>
      </Form>
    </>
  );
}
