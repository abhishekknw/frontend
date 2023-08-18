import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { UserMinimalListAtom, userInformationAtom } from '../../_states';
import SelectDropdown from '../../common/SelectDropdown/SelectDropdown';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
export default function AssignUserModal(props) {
  const BookingApi = BookinPlanActions();
  const { data, campaign, modalType } = props;
  const userMinimalList = useRecoilValue(UserMinimalListAtom);
  const userInfo = useRecoilValue(userInformationAtom);
  const [postData, setPostData] = useState({
    assigned_by: userInfo?.id,
    assigned_to_ids: [],
    campaign_id: campaign?.proposal_id,
    supplier_id: data?.supplier_id,
    supplierName: data?.name,
    quality_rating: '',
  });

  const categorylist = [
    { label: 'Ultra High', value: 'Ultra High' },
    { label: 'High', value: 'High' },
    { label: 'Medium High', value: 'Medium High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Standard', value: 'Standard' },
    { label: 'Small', value: 'Small' },
    { label: 'Large', value: 'Large' },
    { label: 'Very Large', value: 'Very Large' },
    { label: 'Super', value: 'Super' },
  ];

  function handleSelect(select) {
    setPostData({
      ...postData,
      assigned_to_ids: [select.value],
    });
  }
  const handleSelectQuality = (select) => {
    setPostData({
      ...postData,
      quality_rating: select.value,
    });
  };
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
          {modalType === 'AssignUserWithQuality' && (
            <>
              <Form.Label>Assigned To</Form.Label>
              <SelectDropdown
                optionsData={categorylist}
                selectedValue={postData.quality_rating}
                placeholder="Select Quality"
                label="Select Quality"
                id="SelectQuality"
                handleSelect={handleSelectQuality}
              />
            </>
          )}
        </Form.Group>
        <div>
          <Button
            className="btn btn-primary"
            type="button"
            onClick={(e) => {
              modalType === 'AssignUserWithQuality'
                ? BookingApi.putAssignSupplierUser(postData)
                : BookingApi.postSupplierAssignment(postData);
            }}
          >
            Assign User
          </Button>
        </div>
      </Form>
    </>
  );
}
