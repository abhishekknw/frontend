import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState } from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
function EmailModal(props) {
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [showModal, setShow] = useState(showHideModal.email);
  const [formData, setFormData] = useState({ emails: '', emailType: '' });
  const clientStatusList = props?.data?.dropdownOptions;
  const handleClose = () => {
    setshowHideModal({ ...showHideModal, email: { show: false } });
    props?.data?.show ? props?.onCancel() : '';
  };
  const handleSelect = (status) => {
    setFormData({ ...formData, emailType: status });
  };
  //   const handleShow = () => setShow(true);
  return (
    <>
      {/* <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      </div> */}
      <Modal
        show={showHideModal.email.show || props?.data?.show}
        onHide={handleClose}
        className="wpModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="email-modal">
            <div className="form-group email-form-control">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Email Ids"
                onChange={(e) => {
                  setFormData({ ...formData, emails: e.target.value });
                }}
              />
            </div>
            <div className="form-group email-dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {formData.emailType != '' ? formData.emailType : 'Email Type'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {clientStatusList &&
                    clientStatusList.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          eventKey={item.status_name}
                          onClick={(e) => {
                            handleSelect(item.status_name);
                          }}
                          active={item.status_name==formData.emailType}
                        >
                          {item.status_name}
                        </Dropdown.Item>
                      );
                    })}
                  {/* <Dropdown.Item >All</Dropdown.Item>
                  <Dropdown.Item >Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item >Decision pending</Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <p>
                Note :- Use comma separation between emails to send multiple emails to users at the
                same time
              </p>
            </div>
            <div className="row email-btn-group">
              <div className="col-sm-5">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    props.onSubmit(formData, true);
                  }}
                >
                  Send email for given user
                </button>
              </div>
              <div className="col-sm-2">
                <p>Or</p>
              </div>
              <div className="col-sm-5">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    props.onSubmit(formData, false);
                  }}
                >
                  Send email to all
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="submit-btn" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmailModal;