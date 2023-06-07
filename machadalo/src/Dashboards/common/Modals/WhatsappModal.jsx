import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState } from 'recoil';
function WhatsappModal(props) {
  // const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  // const [showModal, setShow] = useState(showHideModal.whatsapp);
  const handleClose = () => {
    // setshowHideModal({ ...showHideModal, whatsapp: { show: false } });
   props?.onCancel();
  }
    //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={props?.data?.show} onHide={handleClose} className='wpModal'>
        <Modal.Header closeButton>
          <Modal.Title>Share on WhatsApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='wp-form'>
            <div class="form-group">
              <label for="exampleInputEmail1">Whatsapp Number</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" class="btn btn-primary submit-btn">
              Submit
            </button>
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

export default WhatsappModal;
