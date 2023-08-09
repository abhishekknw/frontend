import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
// import Imagef from '../../../../';

export default function PermissionModal(props) {
  const { data, campaign } = props;
  const BookingApi = BookinPlanActions();
  const [uploadFileData, setUploadFileData] = useState({
    file: '',
    comment: '',
    hashtag: 'Permission Box',
    campaign_name: campaign?.name,
    supplier_type_code: data?.supplierCode,
    object_id: data?.object_id,
    supplier_name: data?.name,
  });
  async function getPermissionImages(data) {
    let getData = await BookingApi.getPermissionBoxImages(data);
  }

  function uploadImagesFile() {
    const formData = new FormData();
    formData.append('file', uploadFileData?.file);
    formData.append('comment', uploadFileData?.comment);
    formData.append('hashtag', uploadFileData?.hashtag);
    formData.append('campaign_name', uploadFileData?.campaign_name);
    formData.append('supplier_type_code', uploadFileData?.supplier_type_code);
    formData.append('object_id', uploadFileData?.object_id);
    formData.append('supplier_name', uploadFileData?.supplier_name);

    BookingApi.postPermissionBoxImages(formData);
    setUploadFileData({ ...uploadFileData, comment: '', file: '' });
  }
  useEffect(() => {
    let param = { supplier_id: data?.object_id, campaign_id: campaign?.proposal_id };
    getPermissionImages(param);
  }, [1]);
  return (
    <>
      <Form>
        {/* <img src={Imagef} /> */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control
            type="file"
            onChange={(e) => {
              setUploadFileData({ ...uploadFileData, file: e?.target?.files[0] });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            placeholder="Enter comments for permission box"
            onChange={(e) => {
              setUploadFileData({ ...uploadFileData, comment: e?.target?.value });
            }}
            value={uploadFileData?.comment}
            rows={3}
          />
        </Form.Group>

        <div>
          <span>
            <Button
              className="btn me-3 btn-primary"
              onClick={(e) => {
                uploadImagesFile();
              }}
            >
              Submit
            </Button>
          </span>
        </div>
      </Form>
    </>
  );
}
// file: (binary)
// comment: 
// object_id: MUMAECKRSHD3
// hashtag: Permission Box
// campaign_name: HDFC Retail Channels
// supplier_name: HDFC Distributor 3
// supplier_type_code: RS
