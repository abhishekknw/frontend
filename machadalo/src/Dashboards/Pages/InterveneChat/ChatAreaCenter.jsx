import React from 'react';
import {
    BsFillPencilFill,
    BsSearch,
    BsFillGeoAltFill,
    BsMessenger,
    BsShare,
    BsTelephone,
    BsThreeDots,
} from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

import { Dropdown, Form } from 'react-bootstrap';
import { FiMapPin } from 'react-icons/fi';
import Avatar from '../InterveneChat/avatar.jpg';
import { Link } from 'react-router-dom';

const ChatAreaCenter = () => {
  return (
    <>
      <div className="center-header">
        <div className="current-user-info">
          <div className="current-user-avatar">
            <img src={Avatar} className="avatar-img" />
          </div>
          <div>
            <h4 className="user-name-top-head m-0">Chat Person</h4>
            <p className="user-active">Active</p>
          </div>
        </div>
        <div className="current-user-actions">
          <div className="con-icons">
            <span>
              <BsShare />
            </span>{' '}
            <span>
              <BsTelephone />
            </span>
            <span>
              <FiMapPin />
            </span>
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <BsThreeDots />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="suspenseSheet">Suspense Sheet</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    {' '}
                    <Link to="requirement">Ops Verified</Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        </div>
      </div>
      {/* chat-detail */}
      <div className="messages-area">
        <div className="recent-msgs">
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
          <div class="message message-left">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-text">
                Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
              </div>
            </div>
          </div>
          <div class="message message-right">
            <img class="msg-img" src={Avatar} />
            <div class="msg-bubble">
              <div class="msg-info">
                <div class="msg-text">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, tempore?
                </div>
              </div>
            </div>
          </div>
        </div>
        <form class="msger-inputarea">
          <input type="text" class="msger-input" placeholder="Type message..." />
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="btn-attachment">
              <AiOutlinePlus />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <Form.Group controlId="formFile" className="mb-3">
                  {/* <Form.Label>Default file input example</Form.Label> */}
                  <Form.Control type="file" />
                </Form.Group>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <Form.Group controlId="formFile" className="mb-3">
                  {/* <Form.Label>Default file input example</Form.Label> */}
                  <Form.Control type="file" />
                </Form.Group>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <Form.Group controlId="formFile" className="mb-3">
                  {/* <Form.Label>Default file input example</Form.Label> */}
                  <Form.Control type="file" />
                </Form.Group>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button type="submit" class="msger-send-btn">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatAreaCenter
