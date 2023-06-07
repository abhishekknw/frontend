import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState } from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
function EmailModal() {
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [showModal, setShow] = useState(showHideModal.email);
  const handleClose = () => setshowHideModal({ ...showHideModal, email: { show: false } });
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
      <Modal show={showHideModal.email.show} onHide={handleClose} className='wpModal'>
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='email-modal'>
            <div class="form-group email-form-control">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="form-group email-dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  All
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Leads Verified by Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Decision pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div>
              <p>Note :- Use comma separation between emails to send multiple emails to users at the same time</p>
            </div>
            <div className='row email-btn-group'>
              <div className='col-sm-5'>
                <button className='btn btn-primary'>Send email for given user</button>
              </div>
              <div className='col-sm-2'><p >Or</p></div>
              <div className='col-sm-5'>
                <button className='btn btn-primary'>Send email for given user</button>
              </div>
            </div>
            {/* <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div> */}
            {/* <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div> */}

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='submit-btn' onClick={handleClose}>
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
