import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useRecoilValue } from 'recoil';
import { OrganisationListAtom } from '../../_states';
import SelectDropdown from '../../../components/Shared/SelectDropdown';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';

export default function AddBrandModal(props) {
  const { data } = props;
  const BookingApi = BookinPlanActions();
  const organisationList = useRecoilValue(OrganisationListAtom);
  const [postData, setPostData] = useState({
    brand_organisation_id: null,
    id: data?.id,
  });
  function handleSelect(selected) {
    setPostData({ ...postData, brand_organisation_id: selected?.value });
  }
  async function postAddBrand() {
    await BookingApi.postBrandAssignment(postData);
  }

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Add Brand </Form.Label>
          <SelectDropdown
            optionsData={organisationList}
            selectedValue={postData.brand_organisation_id}
            placeholder="Select Organisation"
            label="Select Organisation"
            id="SelectOrganisation"
            handleSelect={handleSelect}
          />
        </Form.Group>
        <div>
          <Button
            className="btn btn-primary"
            type="button"
            disabled={!postData.brand_organisation_id}
            onClick={(e) => {
              postAddBrand();
            }}
          >
            Add Brand
          </Button>
        </div>
      </Form>
    </>
  );
}
