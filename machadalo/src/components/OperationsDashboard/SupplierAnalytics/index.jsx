import React from 'react';
import request from 'superagent';
import config from '../../../config';
import getCampaignSummaryColumn from './SupplierCampaignSummaryGridConfig';
import InnerGrid from '../../InnerGrid';
import SupplierCampaignModal from '../../Modals/SupplierCampaignModal';

class SupplierAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      supplierDetails: [],
      bookingSubStatusDetails: {},
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  addMissingDatafield = (data) => {
    const dataFields = [
      'Not Booked',
      'Not Initiated',
      'Recce',
      'New Entity',
      'Decision Pending',
      'completed',
      'Confirmed Booking',
      'Rejected',
      'unknown',
      'Tentative Booking',
    ];
    dataFields.map((dataField) => {
      if (!data.hasOwnProperty(dataField)) {
        data[dataField] = 0;
      }
    });
    if (data.booking_sub_status) {
      this.state.bookingSubStatusDetails = data.booking_sub_status;
    }
    return [data];
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  getSupplierDetails = (campaignId) => {
    request
      .get(`${config.API_URL}/v0/ui/ops/campaign/supplier-analytics/?campaign_id=${campaignId}`)
      .set('Authorization', `JWT ${this.props.token}`)
      .then((resp) => {
        const listData = [];
        if (resp.body.data) {
          Object.keys(resp.body.data).map((key) => {
            listData.push(resp.body.data[key]);
          });
        }
        this.setState({
          supplierDetails: listData,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  };

  handleClick = () => {
    const supplierDetails = this.getSupplierDetails(this.props.supplierData.campaign_id);
    this.setState({ showModal: true, supplierDetails });
  };

  render() {
    const { supplierData } = this.props;
    const data = this.addMissingDatafield(supplierData);
    return (
      <div className="bootstrap-iso">
        {supplierData && (
          <div>
            {/* <h5 style={{ color: 'white' }}>Booking Status Summary</h5> */}
            <InnerGrid
              columns={getCampaignSummaryColumn()}
              data={data}
              exportCsv={false}
              search={false}
              pagination={false}
              backgroundColor="white"
              showModal={false}
              styles={{ backgroundColor: 'white' }}
            />
            {/* <BookingSubStatusSummary bookingSubStatusDetails={this.state.bookingSubStatusDetails} /> */}

            <button
              onClick={this.handleClick}
              className="btn btn-danger"
              style={{ marginTop: '10px', backgroundColor: '#e84478', borderColor: '#e84478' }}
            >
              View Details
            </button>
            <SupplierCampaignModal
              showModal={this.state.showModal}
              campaignId={supplierData.campaign_id}
              campaignName={supplierData.campaign_name}
              handleCloseModal={this.handleCloseModal}
              columns={getCampaignSummaryColumn()}
              data={this.state.supplierDetails}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SupplierAnalytics;
