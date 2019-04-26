import React from 'react';
import Modal from 'react-modal';

import './index.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ViewImageModal({ isVisible, onClose }) {
  const url = 'https://placeimg.com/256/256/any';
  return (
    <Modal isOpen={isVisible} style={customStyles} ariaHideApp={false}>
      <div className="modal modal-view-image">
        <div className="modal__body">
          <div className="modal__body__image">
            <img src={url} />
          </div>
        </div>
        <div className="modal__action">
          <button type="button" className="btn btn--danger" onClick={onClose}>
            x
          </button>
        </div>
      </div>
    </Modal>
  );
}
