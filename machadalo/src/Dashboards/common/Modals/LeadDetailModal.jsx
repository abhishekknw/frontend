import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState } from 'recoil';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillPersonFill } from "react-icons/bs";
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
            <div>
            <div className="table-responsive">
                <table className="table">
                  <tr>
                    <td>
                      <div className="line_box stav_projektu" >
                        <div className="text_circle done">
                          <div className="circle">
                            <h4>Leads Verified By Machadalo</h4>
                          </div>
                          <a className="tvar"><span data-toggle="popover" title="Sample text" data-trigger="hover"
                              data-placement="top" data-content="Ukázkový text při hover"></span></a>
                          <div className="subline">
                            <p>1/2/20223</p>
                            <p>Vidhidevlopment</p>
                          </div>
                         
                          
                        </div>
                        <div className="text_circle done">
                          <div className="circle">
                            <h4>Leads Verified By Machadalo</h4>
                          </div>
                          <a className="tvar"><span data-toggle="popover" title="Sample text" data-trigger="hover"
                              data-placement="top" data-content="Ukázkový text při hover"></span></a>
                          <div className="subline">
                            <p>1/2/20223</p>
                            <p>Vidhidevlopment</p>
                          </div>
                        </div>

                        <div className="text_circle done">
                          <div className="circle">
                            <h4>Leads Verified By Machadalo</h4>
                          </div>
                          <a className="tvar"><span data-toggle="popover" title="Sample text" data-trigger="hover"
                              data-placement="top" data-content="Ukázkový text při hover"></span></a>
                          <div className="subline">
                            <p>1/2/20223</p>
                            <p>Vidhidevlopment</p>
                          </div>
                        </div>
                        <div className="text_circle done">
                          <div className="circle">
                            <h4>Leads Verified By Machadalo</h4>
                          </div>
                          <a className="tvar"><span data-toggle="popover" title="Sample text" data-trigger="hover"
                              data-placement="top" data-content="Ukázkový text při hover"></span></a>
                          <div className="subline">
                            <p>1/2/20223</p>
                            <p>Vidhidevlopment</p>
                          </div>
                        </div>
                        <div className="text_circle done">
                          <div className="circle">
                            <h4>Leads Verified By Machadalo</h4>
                          </div>
                          <a className="tvar"><span data-toggle="popover" title="Sample text" data-trigger="hover"
                              data-placement="top" data-content="Ukázkový text při hover"></span></a>
                          <div className="subline">
                            <p>1/2/20223</p>
                            <p>Vidhidevlopment</p>
                          </div>
                        </div>
                        <div className="text_circle done">
                          <div className="circle">
                            <h4>Leads Verified By Machadalo</h4>
                          </div>
                          <a className="tvar"><span data-toggle="popover" title="Sample text" data-trigger="hover"
                              data-placement="top" data-content="Ukázkový text při hover"></span></a>
                          <div className="subline">
                            <p>1/2/20223</p>
                            <p>Vidhidevlopment</p>
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
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
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LeadDetailModal;
