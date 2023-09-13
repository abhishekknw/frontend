import React from 'react';
import './interveneChat.css';
import {
  BsFillPencilFill,
  BsSearch,
  BsFillGeoAltFill,
  BsMessenger,
  BsCameraVideo,
  BsTelephone,
  BsThreeDots,
} from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import Avatar from '../InterveneChat/avatar.jpg';
import ChatUsers from './ChatUsers';
import ChatAreaCenter from './ChatAreaCenter';
import UserInfo from './UserInfo';
export default function InterveneChat() {
  return (
    <>
      <div className="chat-main-container">
        <div className="chat-main-container-header">
          <Button variant="primary">Add Supplier</Button>
          <Button variant="primary">Contact</Button>
          <Button variant="primary">History</Button>
          <Button variant="primary">Temaplate</Button>
        </div>
        <div className="chat-main-container-inner">
          <div className="steps">
            <div className="step-one">
              <ChatUsers />
            </div>
            <div className="step-two">
              <ChatAreaCenter />
            </div>
            <div className="step-three">
              <UserInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
