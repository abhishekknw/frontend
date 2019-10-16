import React from 'react';
import getCampaignColumn from './CampaignGridColumnConfig';
import Grid from '../../Grid';
import SupplierAnalytics from '../SupplierAnalytics';

class CampaignAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierData: [],
    };
  }

  isExpandableRow = (row) => {
    return row.campaign_id == this.props.selectedCampaignId ? true : false;
  };

  expandComponent = (row) => {
    return (
      <SupplierAnalytics campaignId={row.campaign_id} supplierData={this.state.supplierData} />
    );
  };

  render() {
    const { tappingData } = this.props.tappingDetails;
    const { data } = tappingData;
    const listData = [],
      completedCampaigns = [],
      ongoingCampaings = [],
      onholdCampaings = [],
      rejectedCampaings = [];
    if (data) {
      Object.keys(data).map((key) => {
        listData.push(data[key]);
      });
    }
    if (listData) {
      listData.map((campaign) => {
        if (campaign.campaign_status == 'completed') {
          completedCampaigns.push(campaign);
        } else if (campaign.campaign_status == 'ongoing') {
          ongoingCampaings.push(campaign);
        } else if (campaign.campaign_status == 'on_hold') {
          onholdCampaings.push(campaign);
        } else {
          rejectedCampaings.push(campaign);
        }
      });
    }

    return (
      <Grid
        columns={getCampaignColumn()}
        data={listData}
        headerValue="Operations Dashboard"
        exportCsv={true}
        search={true}
        pagination={true}
        onRowClick={(row) => {
          this.props.renderSelectedCampaign(row.campaign_id);
          this.setState({ supplierData: this.props.getSupplierDetails() });
        }}
        isExpandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
      />
    );
  }
}

export default CampaignAnalytics;
