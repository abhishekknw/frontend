import React from 'react';
import {
    BsFillGeoAltFill,
    BsMessenger,

} from 'react-icons/bs';
import { BiSearch } from "react-icons/bi";
import Avatar from '../InterveneChat/avatar.jpg';

const ChatUsers = () => {
    return (
        <>
            <div className="search-area">
                <div className="search-area-inner">
                    <input type='text' placeholder='Search' />
                    <span className='search-ic'>
                        <BiSearch />
                    </span>
                </div>
            </div>
            <div className="scroll-div-left">
                <div className="pinned-chat">
                    <div className="chat-title">
                        <span className="chat-pre-icon">
                            <BsFillGeoAltFill />
                        </span>
                        Pinned Chat
                    </div>

                    {/* complete list */}
                    <div className="chat-user-list">
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item active-chat">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="all-chat">
                    <div className="chat-title">
                        <span className="chat-pre-icon">
                            <BsMessenger />
                        </span>
                        All Chat
                    </div>

                    <div className="chat-user-list">
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                        <div className="chat-user-list-item">
                            <div className="chat-user-list-item-details">
                                <div className='chat-user-avatar'>
                                    <img src={Avatar} className="avatar-img" />
                                    <span className="active-status active"></span>
                                </div>
                                <div className="chat-user-details">
                                    <h4 className="user-name">Chat Person
                                        <span className="chat-count">02</span>
                                    </h4>
                                    <p className="user-last-msg">Last massage...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default ChatUsers
