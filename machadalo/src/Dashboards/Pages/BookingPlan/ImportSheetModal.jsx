import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { BookinPlanActions } from '../../_actions';
export default function ImportSheetModal() {
  const BookingApi = BookinPlanActions();
  const [proposalData, setProposalData] = useState({});
  const [postFileData, setpostFileData] = useState({
    file: '',
  });
  const [errors, setErrors] = useState({});

  const uploadFile = async () => {
    if (postFileData?.file === '' || !postFileData?.file) {
      setErrors({
        ...errors,
        file: 'Please Select File',
      });
    } else {
      const formData = new FormData();
      formData.append('file', postFileData?.file);
      formData.append('is_import_sheet', true);
      formData.append('data_import_type', 'base-data');
      formData.append('tentative_start_date', '');
      formData.append('tentative_end_date', '');
      formData.append('center_id', proposalData?.id);
      formData.append('assigned_by', proposalData?.user);
      formData.append('assigned_to', proposalData?.user);
      formData.append('proposal_id', proposalData?.proposal);
      await BookingApi.uploadBookingPlan(formData);
    }
  };
  const getProposalData = async () => {
    let response = await BookingApi.getProposalMapping();
    setProposalData(response[0]);
  };

  useEffect(() => {
    getProposalData();
  }, [1]);
  return (
    <>
      <div>
        <Form>
          {' '}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              isInvalid={!!errors.file}
              onChange={(e) => {
                setpostFileData({ ...postFileData, file: e?.target?.files[0] });
              }}
            />
            <Form.Control.Feedback type="invalid">{errors.file}</Form.Control.Feedback>
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
