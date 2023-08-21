import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { BookinPlanActions } from '../../_actions';
export default function PaymentTypeModal(props) {
  const { modalType, data } = props;
  console.log(props?.data);
  const BookingApi = BookinPlanActions();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    BeneficiaryName: '',
    BankAccountNumber: '',
    IFSCcode: '',
    NegotiatedPrice: '',
    Message: '',
    to: '',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      let payload = {
        subject: `${modalType} Details For ${data?.name}`,
        body: `Beneficiary Name : ${formData.BeneficiaryName},Bank Account Number : ${formData.BankAccountNumber}, IFSC Code : ${formData.IFSCcode}, Negotiated Price : ${formData.NegotiatedPrice},Message : ${formData.Message}`,
        to: 'Testing.xyz@gmail.com',
      };
      BookingApi.postEmailPaymentDetail(payload);
    }
    setValidated(true);
  };
  return (
    <>
      <h6>Check Payment Details, Edit As per requirement and send to Account</h6>
      <div>
        <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="Beneficiary Name"
              value={formData?.BeneficiaryName}
              onChange={(e) => {
                setFormData({ ...formData, BeneficiaryName: e.target.value });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">Please Enter Phase</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              placeholder="Bank Account Number"
              value={formData?.BankAccountNumber}
              onChange={(e) => {
                setFormData({ ...formData, BankAccountNumber: e.target.value });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Bank Account Number
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              placeholder="IFSC Code"
              value={formData?.IFSCcode}
              onChange={(e) => {
                setFormData({ ...formData, IFSCcode: e.target.value });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">Please Enter IFSC Code</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              placeholder="Negotiated Price"
              value={formData?.NegotiatedPrice}
              onChange={(e) => {
                setFormData({ ...formData, NegotiatedPrice: e.target.value });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Negotiated Price
            </Form.Control.Feedback>
          </Form.Group>{' '}
          <Form.Group className="mb-3" controlId="">
            <Form.Control
              placeholder="Message"
              value={formData?.Message}
              onChange={(e) => {
                setFormData({ ...formData, Message: e.target.value });
              }}
            />
            <Form.Control.Feedback type="invalid">Please Enter Message</Form.Control.Feedback>
          </Form.Group>
          <Button
            className="btn btn-primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Send
          </Button>
        </Form>
      </div>
    </>
  );
}
