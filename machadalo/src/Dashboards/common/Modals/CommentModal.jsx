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
  const [commentValue, setCommentValue] = useState('');
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
      _id: showHideModal.comment.data._id,
      requirement_id: showHideModal.comment.data.requirement_id,
    };
    setCommentType({ name: data.name, value: data.value });
    await NewLeadAction.getCommentListByIds(params);
  };

  const onAddComment = async () => {
    let object = [
      {
        comment: commentValue,
        _id: showHideModal.comment.data._id,
        requirement_id: showHideModal.comment.data.requirement_id,
      },
    ];
    setCommentValue('');
    await NewLeadAction.postCommentById(object);
  };

  return (
    <>
      <Modal show={showHideModal.comment.show} onHide={handleClose} className="wpModal">
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="status-div">
             
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
            <textarea
              rows={2}
              className="fullwidth"
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
            ></textarea>
            <Button
              variant="secondary"
              className="btn btn-primary"
              disabled={commentValue === ''}
              onClick={(e) => {
                onAddComment();
              }}
            >
              Add
            </Button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" className="submit-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default CommentModal;
