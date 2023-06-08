import React, { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { showHideModalAtom } from '../../_states/Constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CommentListAtom } from '../../_states/Machadalo/newLeads';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';
import dayjs from 'dayjs';

function CommentModal(props) {
  const [showHideModal, setshowHideModal] = useRecoilState(showHideModalAtom);
  const NewLeadAction = newLeadActions();
  const CommentList = useRecoilValue(CommentListAtom);
  const [commentType, setCommentType] = useState({ name: 'All', value: 'all' });
  const DropdownOption = [
    { name: 'All', value: 'all' },
    { name: 'Company Comment', value: 'company_comment' },
    { name: 'Machadalo Comment', value: 'machadalo_comment' },
    { name: 'Company Client Comment', value: 'company_client_comment' },
  ];

  const handleClose = () => {
    setshowHideModal({ ...showHideModal, comment: { show: false } });
  };

  const handleSelect = async (data) => {
    let params = {
      comment_type: data.value,
      _id: '63107c31b3cf3b1a2a78f580',
      requirement_id: 7451,
    };
    setCommentType({name:data.name,value:data.value})
    await NewLeadAction.getCommentListByIds(params);
  };

  return (
    <>
      <Modal show={showHideModal.comment.show} onHide={handleClose} className="wpModal">
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="status-div">
            <div className="d-flex align-items-center strip-div justify-content-between">
              <p className="p-0">Comments :</p>

              <div className="form-group email-dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {commentType.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {DropdownOption.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          eventKey={item.value}
                          onClick={(e) => {
                            handleSelect(item);
                          }}
                          active={commentType.value == item.value}
                        >
                          {item.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="comment-box-outer">
              {CommentList &&
                CommentList.map((item, index) => {
                  return (
                    <div className="comment-box" key={index}>
                      <p>{item.comment}</p>
                      <p>
                        <span>
                          <BsFillPersonFill />
                        </span>
                        <span>{item.comment_by}</span>:{' '}
                        <span>{dayjs(item.created_at).format('DD-MM-YYYY HH:mm')} </span>
                      </p>
                    </div>
                  );
                })}
            </div>
            <textarea rows={2} className="fullwidth"></textarea>
            <Button variant="secondary" className="btn btn-primary">
              Add
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="submit-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentModal;
