import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState } from 'recoil';
function WhatsappModal(props) {
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  // const [showModal, setShow] = useState(showHideModal.whatsapp);
  const handleClose = () => {
    setshowHideModal({ ...showHideModal, whatsapp: { show: false } });
    props?.data?.show ? props?.onCancel():'';
  }
    //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={props?.data?.show || showHideModal.whatsapp.show} onHide={handleClose} className='wpModal'>
        <Modal.Header closeButton>
          <Modal.Title>Share on WhatsApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='wp-form'>
            <div className="form-group">
              <label>Whatsapp Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputNumber"
                // aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
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
