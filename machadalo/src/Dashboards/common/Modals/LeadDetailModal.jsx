import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../Recoil/States/Machadalo/Constant';
import { useRecoilState } from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
function LeadDetailModal() {
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [showModal, setShow] = useState(showHideModal.email);
  const handleClose = () => setshowHideModal({ ...showHideModal, leadDetail: { show: false } });

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
      <Modal show={showHideModal.leadDetail.show} onHide={handleClose} className='wpModal'>
        <Modal.Header closeButton>
          <Modal.Title>Lead Detail</Modal.Title>

        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-4'><p>Share Date:</p></div>
            <div className='col-md-4'><p>Assigned by: </p></div>
            <div className='col-md-4'><p>Assigned to:</p></div>
          </div>
          <div>
              <p className='strip-div'> Sector:</p>
              <p>Test Sector</p>
          </div>
          <div>
              <p className='strip-div'> Sector Specific Questions :</p>
              <p className='d-flex justify-content-between'><span>Q1&nbsp;. &nbsp;Response :</span><span>?</span></p>
              <p className='d-flex justify-content-between'><span>Q2&nbsp;. &nbsp;Response :</span><span>?</span></p>
              <p className='d-flex justify-content-between'><span>Q3&nbsp;. &nbsp;Response :</span><span>?</span></p>
          </div>
          <div>
              <p className='strip-div'>User Details:</p>
              <p>aman, 9752276168 , Secretary</p>
          </div>
          <div>
              <p className='strip-div'>Address :</p>
              <p>testadddress Prayagraj, Uttar Pradesh 211011,Prayagraj, Allahabad,Uttar Pradesh,India, 110002,(18.222,72.0)</p>
          </div>
          <div className='status-div'>
              <p className='strip-div'>Status History :</p>
              <textarea rows={4} className='fullwidth' ></textarea>   
          </div>
          <div className='status-div'>
            <div className='d-flex align-items-center strip-div justify-content-between'>
              <p className='p-0'>Comments :</p>
              <div  class="form-group email-dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  All
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">All</Dropdown.Item>
                  <Dropdown.Item href="#">Machadalo</Dropdown.Item>
                  <Dropdown.Item href="#">Client</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </div>
              <textarea rows={4} className='fullwidth' ></textarea>   
          </div>
       
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

export default LeadDetailModal;
