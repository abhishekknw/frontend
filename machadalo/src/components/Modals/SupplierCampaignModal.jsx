import React from 'react';
import Modal from 'react-modal';
import SupplierCampaignStatusSummary from '../OperationsDashboard/SupplierAnalytics/SupplierCampaignStatusSummary';
import './index.css';

const SupplierCampaignModal = (props) => {
  const { showModal } = props;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '70%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div>
      {showModal && (
        <Modal isOpen={showModal} style={customStyles}>
          <SupplierCampaignStatusSummary />
          <button
            className="btn btn--danger"
            onClick={props.handleCloseModal}
            style={{ marginTop: '10px', float: 'right' }}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default SupplierCampaignModal;
