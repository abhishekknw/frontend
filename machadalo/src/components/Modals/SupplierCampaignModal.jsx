import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const SupplierCampaignModal = (props) => {
  const { showModal } = props;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div>
      {showModal && (
        <Modal isOpen={showModal} style={customStyles}>
          <p>Campaignwise Summary</p>
          <Link
            to={`/r/operations-dashboard/${props.campaignId}`}
            className="btn btn-danger"
            style={{ marginTop: '8px' }}
          >
            View Suppliers
          </Link>
          <button className="btn btn-secondary" onClick={props.handleCloseModal}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default SupplierCampaignModal;
