import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { BookinPlanActions } from '../../_actions/BookingPlan/bookingPlan.actions';
import Carousel from 'react-bootstrap/Carousel';
import { BaseImageUrl } from '../../app.constants';
// Permission Receipt
export default function PermissionModal(props) {
  const { data, campaign, modalType } = props;
  const BookingApi = BookinPlanActions();
  const [imageList, setImageList] = useState([]);
  const [uploadFileData, setUploadFileData] = useState({
    file: '',
    comment: '',
    hashtag: 'Permission Box',
    campaign_name: campaign?.name,
    supplier_type_code: data?.supplierCode,
    object_id: data?.object_id,
    supplier_name: data?.name,
  });
  async function getImagesList(data) {
    let getData =
      modalType === 'Permission'
        ? await BookingApi.getPermissionBoxImages(data)
        : await BookingApi.getReceiptImages(data);
    setImageList(getData);
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

    modalType === 'Permission'
      ? BookingApi.postPermissionBoxImages(formData)
      : BookingApi.postReceiptImages(formData);

    setUploadFileData({ ...uploadFileData, comment: '', file: '' });
  }
  useEffect(() => {
    let param = { supplier_id: data?.object_id, campaign_id: campaign?.proposal_id };
    getImagesList(param);
  }, [1]);
  return (
    <>
      <Form>
        {imageList.length > 0 && (
          <Carousel data-bs-theme="dark">
            {imageList &&
              imageList.map((item, index) => {
                return (
                  <Carousel.Item key={item?.id}>
                    <img
                      className="d-block w-100"
                      src={`${BaseImageUrl}${item?.image_path}`}
                      alt={item?.content_type}
                    />
                    <Carousel.Caption>
                      <h5>{item?.hashtag}</h5>
                      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        )}
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
