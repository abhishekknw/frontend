import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../Recoil/States/Machadalo/Constant';
import { useRecoilState } from 'recoil';
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
      <Modal show={showHideModal.leadDetail.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>leadDetail Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">LEad Detail Modals</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              {/* <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
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
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
