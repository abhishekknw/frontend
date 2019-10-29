import React from 'react';
import '../../bootstrap-iso.css';
import getCampaignSummaryColumn from './SupplierCampaignSummaryGridConfig';
import InnerGrid from '../../InnerGrid';
import SupplierCampaignModal from '../../Modals/SupplierCampaignModal';

class SupplierAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  addMissingDatafield = (data) => {
    const dataFields = [
      'Not Booked',
      'Not Initiated',
      'Recce',
      'Decision Pending',
      'completed',
      'Confirmed Booking',
      'Phone Booked',
      'Visit Booked',
      'Tentative Booking',
    ];
    dataFields.map((dataField) => {
      if (!data.hasOwnProperty(dataField)) {
        data[dataField] = 0;
      }
    });
    return [data];
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { supplierData } = this.props;
    const data = this.addMissingDatafield(supplierData);
    return (
      <div className="bootstrap-iso">
        {supplierData && (
          <InnerGrid
            columns={getCampaignSummaryColumn()}
            data={data}
            exportCsv={false}
            search={false}
            pagination={false}
            backgroundColor="white"
            showModal={false}
          />
        )}

        <button
          onClick={() => this.setState({ showModal: true })}
          className="btn btn-danger"
          style={{ marginTop: '10px' }}
        >
          View Details
        </button>
        <SupplierCampaignModal
          showModal={this.state.showModal}
          campaignId={supplierData.campaign_id}
          handleCloseModal={this.handleCloseModal}
          columns={getCampaignSummaryColumn()}
        />
      </div>
    );
  }
}

export default SupplierAnalytics;
