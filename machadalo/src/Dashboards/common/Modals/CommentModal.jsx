import React, { useState } from 'react';
import { Modal, Button,Dropdown } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
function CommentModal(props) {
  const [showModal, setShow] = useState();
  const handleClose = () => {
    props?.onCancel();
  }
  //   const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={props?.data?.show} onHide={handleClose} className='wpModal'>
        <Modal.Header closeButton>
          <Modal.Title>Comment Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='status-div'>
                <div className='d-flex align-items-center strip-div justify-content-between'>
                  <p className='p-0'>Comments :</p>

                  <div className="form-group email-dropdown">
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
                <div className='comment-box-outer'>
                  <div className='comment-box'>
                    <p >Hello</p>
                    <p><span><BsFillPersonFill /></span>: <span>June 6, 2023 </span><span>1:42:38 PM </span></p>
                  </div>
                  <div className='comment-box'>
                    <p >Hello</p>
                    <p><span><BsFillPersonFill /></span>: <span>June 6, 2023 </span><span>1:42:38 PM </span></p>
                  </div>
                  <div className='comment-box'>
                    <p >Hello</p>
                    <p><span><BsFillPersonFill /></span>: <span>June 6, 2023 </span><span>1:42:38 PM </span></p>
                  </div>
                </div>
                <textarea rows={2} className='fullwidth' ></textarea>
                 <Button variant="secondary" className='btn btn-primary'>
                  Add
                </Button>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='submit-btn' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentModal;
