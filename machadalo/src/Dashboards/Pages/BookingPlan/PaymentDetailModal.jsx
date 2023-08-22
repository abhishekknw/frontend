import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { BookinPlanActions } from '../../_actions';
export default function PaymentDetailModal(props) {
  const { data } = props;
  const [formData, setFormData] = useState({ ...data });
  const [validated, setValidated] = useState(false);
  const [editEnable, setEditEnable] = useState(true);
  const BookingApi = BookinPlanActions();
  const handleSubmit = async (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    let check = isValidForm(formData);
    if (check) {
      await BookingApi.updateChequeDetail(formData);
    }
  };

  const isValidForm = () => {
    if (
      !formData?.name_for_payment ||
      !formData?.bank_name ||
      !formData?.ifsc_code ||
      !formData?.account_no
    ) {
      setValidated(true);
      return false;
    } else return true;
  };

  return (
    <>
      <div>
        <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="exampleForm.NameOnCheque">
            <Form.Label>Name On Cheque</Form.Label>
            <Form.Control
              placeholder="Beneficiary Name"
              value={formData?.name_for_payment}
              onChange={(e) => {
                setFormData({ ...formData, name_for_payment: e.target.value });
              }}
              disabled={editEnable}
              required
            />
            <Form.Control.Feedback type="invalid">Please Enter Name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.BankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              placeholder="Bank Name"
              value={formData?.bank_name}
              onChange={(e) => {
                setFormData({ ...formData, bank_name: e.target.value });
              }}
              disabled={editEnable}
              required
            />
            <Form.Control.Feedback type="invalid">Please Enter Bank Name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.IFSCCode">
            <Form.Label>IFSC Code</Form.Label>
            <Form.Control
              placeholder="Bank Name"
              value={formData?.ifsc_code}
              onChange={(e) => {
                setFormData({ ...formData, ifsc_code: e.target.value });
              }}
              disabled={editEnable}
              required
            />
            <Form.Control.Feedback type="invalid">Please Enter IFSC CODE</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.AccountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              placeholder="Bank Name"
              value={formData?.account_no}
              onChange={(e) => {
                setFormData({ ...formData, account_no: e.target.value });
              }}
              disabled={editEnable}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Account Number{' '}
            </Form.Control.Feedback>
          </Form.Group>
          <div>
            <span>
              {/* <Button
              className="btn me-3 btn-primary"
              onClick={(e) => {
                setEditEnable(!editEnable);
              }}
            >
              Edit
            </Button> */}
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Edit"
                checked={!editEnable}
                onChange={(e) => {
                  setEditEnable(!editEnable);
                }}
              />
              {!editEnable && (
                <Button
                  className="btn btn-success"
                  variant="success"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Update
                </Button>
              )}
            </span>
          </div>
        </Form>
      </div>
    </>
  );
}
