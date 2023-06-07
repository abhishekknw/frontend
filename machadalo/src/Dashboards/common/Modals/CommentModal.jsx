import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
          <div>Comment</div>
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
