import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { BookinPlanActions } from '../../_actions';
export default function ImportSheetModal() {
  const BookingApi = BookinPlanActions();

  const [postFileData, setpostFileData] = useState({
    file: '',
  });

  async function uploadFile() {
    const formData = new FormData();
    formData.append('file', postFileData?.file);
    await BookingApi.uploadBookingPlan(formData);
  }
  return (
    <>
      <div>
        <Form>
          {' '}
          <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Default file input example</Form.Label> */}
            <Form.Control
              type="file"
              onChange={(e) => {
                setpostFileData({ ...postFileData, file: e?.target?.files[0] });
              }}
            />
          </Form.Group>
          <a href="https://dev.machadalo.com/sample_files/booking_plan_sheet_v1.xlsx">
            Sample Sheet
          </a>
          <div className="mt-4">
            <Button
              className="btn btn-primary"
              onClick={(e) => {
                uploadFile();
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
