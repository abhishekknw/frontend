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

        <button onClick={this.handleClick} className="btn btn-danger" style={{ marginTop: '10px' }}>
          View Details
        </button>
        <SupplierCampaignModal
          showModal={this.state.showModal}
          campaignId={supplierData.campaign_id}
          handleCloseModal={this.handleCloseModal}
          columns={getCampaignSummaryColumn()}
          data={this.state.supplierDetails}
        />
      </div>
    );
  }
}

export default SupplierAnalytics;
