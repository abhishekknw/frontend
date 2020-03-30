import React from 'react';
import Modal from 'react-modal';
import SupplierCampaignStatusSummary from '../OperationsDashboard/SupplierAnalytics/SupplierCampaignStatusSummary';
import './index.css';

const SupplierCampaignModal = (props) => {
  const { showModal, data } = props;
  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '70%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div>
      {showModal &&
        data &&
        data.length > 0 && (
          <Modal isOpen={showModal} style={customStyles}>
            <SupplierCampaignStatusSummary
              data={props.data}
              campaignId={props.campaignId}
              campaignName={props.campaignName}
            />
            <button
              className="btn btn--danger"
              onClick={props.handleCloseModal}
              style={{
                marginTop: '10px',
                float: 'right',
                backgroundColor: 'rgb(232, 68, 120)',
                fontWeight: '400',
              }}
            >
              Close
            </button>
          </Modal>
        )}
    </div>
  );
};

export default SupplierCampaignModal;
