import React from 'react';
import {
    BsFillPencilFill,
    BsSearch,
    BsFillGeoAltFill,
    BsMessenger,
    BsCameraVideo,
    BsTelephone,
    BsThreeDots,
} from 'react-icons/bs';
import Avatar from '../InterveneChat/avatar.jpg';

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
                        <p className='user-active'>Active</p>
                    </div>
                </div>
                <div className="current-user-actions">
                    <div className="con-icons">
                        <span>
                            <BsCameraVideo />
                        </span>{' '}
                        <span>
                            <BsTelephone />
                        </span>
                        <span>
                            <BsThreeDots />
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
                    <button type="submit" class="msger-send-btn">
                        Send
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatAreaCenter
