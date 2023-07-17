import React from 'react'
import './interveneChat.css'
import { BsFillPencilFill,BsSearch } from "react-icons/bs";
export default function InterveneChat() {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div>
              <ul className='d-flex justify-content-between'>
                <li>Messages</li>
                <li><span><BsFillPencilFill/></span><span><BsSearch/></span></li>
              </ul>
            </div>
          </div>
          <div className='col-md-8'>
            
          </div>
        </div>
      </div>
    </>
  )
}
