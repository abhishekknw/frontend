import React from 'react'
import './interveneChat.css'
import { BsFillPencilFill, BsSearch, BsFillGeoAltFill, BsMessenger, BsCameraVideo, BsTelephone, BsThreeDots } from "react-icons/bs";
import Avatar from "../InterveneChat/avatar.jpg";
export default function InterveneChat() {
  return (
    <>
      <div className='chat-main-container'>
        <div className='row heading-div'>
          <div className='col-md-4 b p-0'>
            <div className='header-div box-common'>
              <ul className='d-flex justify-content-between'>
                <li><h3>Messages</h3></li>
                <li className='icons'><span><BsFillPencilFill /></span><span><BsSearch /></span></li>
              </ul>
            </div>
          </div>
          <div className='col-md-8 b p-0'>
            <div className='box-common'>
              <ul>
                <li className='chat-box'>
                  <ul className='d-flex'>
                    <li>
                      <img src={Avatar} className='avatar-img' />
                    </li>
                    <li className='w-100'>
                      {/* inner chat heading and content */}
                      <ul className='d-flex justify-content-between'>
                        <li>
                          <h4 className='user-name-top-head m-0'>Chat Person</h4>
                          <h4 className='user-typing-text pt-0'>Chat Person Name</h4></li>
                        <li><p className='con-icons'><span><BsCameraVideo /></span> <span><BsTelephone /></span><span><BsThreeDots /></span></p></li>
                      </ul>

                      {/* inner chat heading and content end */}
                    </li>
                  </ul>
                </li>
              </ul>

            </div>

          </div>
        </div>
        {/* header ends */}

        <div className='row content-left-div'>
          <div className='col-md-4 b p-0'>
            <div className=' scroll-div-left'>
            <div className='pinned-chat'>

              <div className='grey-text p-com'><span className='chat-pre-icon'><BsFillGeoAltFill /></span>Pinned Chat</div>

              <div className='chat-box-list'>
                {/* complete list */}
                <ul className='m-0 p-0'>
                  {/* single list box */}
                  <li className='chat-box active-chat'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


             
                </ul>
              </div>
            </div>

            <div className='all-chat'>

              <div className='grey-text p-com'><span className='chat-pre-icon'><BsMessenger /></span>All Chat</div>

              <div className='chat-box-list'>
                {/* complete list */}
                <ul className='m-0 p-0'>
                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}

                       {/* single list box */}
                       <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}

                       {/* single list box */}
                       <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}

                       {/* single list box */}
                       <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}


                  {/* single list box */}
                  <li className='chat-box'>
                    <ul className='d-flex'>
                      <li>
                        <img src={Avatar} className='avatar-img' />
                      </li>
                      <li className='w-100'>
                        {/* inner chat heading and content */}
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-name'>Chat Person</h4></li>
                          <li><p className='chat-time'>09:11 PM</p></li>
                        </ul>
                        <ul className='d-flex justify-content-between'>
                          <li><h4 className='user-typing-text'>Chat Person Name</h4></li>
                          <li><p className='chat-count'>02</p></li>
                        </ul>
                        {/* inner chat heading and content end */}
                      </li>
                    </ul>
                  </li>
                  {/* single list box ends*/}
                </ul>
              </div>
            </div>
            </div>
          </div>
          <div className='col-md-8 b p-0'>


            {/* chat-detail */}
            <div className='message-b box-common full-height '>

              <section class="msger ">

                <main class="msger-chat scroll-div-right">
                  <div class="msg left-msg">
                    <img class="msg-img" src={Avatar} />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                      </div>
                      <div class="msg-text"> Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>

                  <div class="msg left-msg">
                    <img class="msg-img" src={Avatar} />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                      </div>
                      <div class="msg-text"> Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>

                  <div class="msg left-msg">
                    <img class="msg-img" src={Avatar} />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                      </div>
                      <div class="msg-text"> Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>

                  <div class="msg left-msg">
                    <img class="msg-img" src={Avatar} />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                      </div>
                      <div class="msg-text"> Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>

                  <div class="msg left-msg">
                    <img class="msg-img" src={Avatar} />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                      </div>
                      <div class="msg-text"> Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
                    </div>
                  </div>

                  <div class="msg right-msg">
                    <img
                      class="msg-img"
                      src={Avatar}
                    />
                    <div class="msg-bubble">
                      <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                      </div>

                      <div class="msg-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, facilis exercitatione
                      </div>
                    </div>
                  </div>
                </main>

                <form class="msger-inputarea">
                  <input type="text" class="msger-input" placeholder="Enter your message..." />
                  <button type="submit" class="msger-send-btn">Send</button>
                </form>
              </section>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}
