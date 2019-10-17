import React, { Component } from 'react';
import CampaignAnalytics from './CampaignAnalytics';

class OperationsDashboard extends Component {
  constructor(props) {
    super(props);
    this.getSelectedCampaign = this.getSelectedCampaign.bind(this);
    this.getSupplierDetails = this.getSupplierDetails.bind(this);
    this.state = {
      selectedCampaign: '',
    };
  }
  componentWillMount() {
    this.props.getTappingDetails();
  }

  getSelectedCampaign(campaignId) {
    this.setState({ selectedCampaign: campaignId });
  }

  getSupplierDetails() {
    if (this.state.selectedCampaign)
      this.props.getSupplierCampaignDetails(this.state.selectedCampaign);
  }

  render() {
    return (
      <CampaignAnalytics
        tappingDetails={this.props.tappingDetails}
        renderSelectedCampaign={this.getSelectedCampaign}
        selectedCampaignId={this.state.selectedCampaign}
        getSupplierDetails={this.getSupplierDetails}
        supplierTappingDetails={this.props.supplierTappingDetails}
      />
    );
  }
}

export default OperationsDashboard;
