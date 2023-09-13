import React, { useState } from 'react';
import { BsFillGeoAltFill, BsMessenger } from 'react-icons/bs';
import { Form } from 'react-bootstrap';
import { BiSearch, BiFilterAlt } from 'react-icons/bi';
import Avatar from '../InterveneChat/avatar.jpg';
import FilterModal from './FilterModal';
import ModalForms from '../../../components/Shared/Modals';

const ChatUsers = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <ModalForms
        show={modalShow}
        handleClose={(e) => {
          setModalShow(!modalShow);
        }}
        modalBody={FilterModal()}
        modalHeader={'Filters'}
        modalId={'filters'}
        modalClass={'wpModal'}
      />
      <div className="search-area">
        <div className="search-area-form">
          <div className="filter-wrapper">
            <Form.Select aria-label="Default select example">
              <option>Select Category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <div className="filters">
              <BiFilterAlt
                onClick={(e) => {
                  setModalShow(true);
                }}
              />
            </div>
          </div>
          <div className="search-area-inner">
            <div className="search-wrapper">
              <input type="text" placeholder="Search" />
              <span className="search-ic">
                <BiSearch />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-div-left">
        <div className="all-chat">
          <div className="chat-title">
            <span className="chat-pre-icon">
              <BsMessenger />
            </span>
            Active
          </div>

          <div className="chat-user-list">
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
            <div className="chat-user-list-item">
              <div className="chat-user-list-item-details">
                <div className="chat-user-avatar">
                  <img src={Avatar} className="avatar-img" />
                  <span className="active-status active"></span>
                </div>
                <div className="chat-user-details">
                  <h4 className="user-name">
                    Chat Person
                    <span className="chat-count">02</span>
                  </h4>
                  <p className="user-last-msg">Last massage...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatUsers;
