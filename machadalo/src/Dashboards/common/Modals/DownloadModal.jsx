import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState } from 'recoil';
import Form from 'react-bootstrap/Form';
import { BsFillCloudUploadFill, BsCloudDownloadFill } from 'react-icons/bs';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';

function DownloadModal(props) {
  const NewLeadAction = newLeadActions();
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const [uploadFile, setUploadFile] = React.useState([]);

  const uploadCommentFile = async()=>{
    const formData = new FormData();

    formData.append('file', uploadFile);
    await NewLeadAction.uploadCommentFile(formData);
  }
  return (
    <>
      <Modal
        show={showHideModal.download.show}
        onHide={(e) => {
          setshowHideModal({ ...showHideModal, download: { show: false } });
        }}
        className="wpModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Download/Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <div className='form-out-box'>
            <Form.Label>Upload Comments :</Form.Label>
            <Form.Control type="file" onChange={(e)=>{setUploadFile(e.target.files[0])}}/>
            <div className="action-icon">
              <span
              onClick={(e)=>{uploadCommentFile()}}
              >
                <BsFillCloudUploadFill />
              </span>
            </div>

            </div>
            <div className='form-out-box'>
            <Form.Label>Download Lead Summary:</Form.Label>
            <div className="action-icon">
              <span
              onClick={(e)=>{NewLeadAction.downloadLeadsSummary(showHideModal.download.data.campaign_id)}}
              >
                <BsCloudDownloadFill />
              </span>
            </div>
            </div>
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DownloadModal;
