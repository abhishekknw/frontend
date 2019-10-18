import React from 'react';
import request from 'superagent';
import config from '../../../config';
import getCampaignColumn from './CampaignGridColumnConfig';
import Grid from '../../Grid';
import SupplierAnalytics from '../SupplierAnalytics';

class CampaignAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierData: {},
      selectedCampaign: '',
    };
  }

  isExpandableRow = (row) => {
    return row.campaign_id == this.state.selectedCampaign ? true : false;
  };

  expandComponent = () => {
    return <SupplierAnalytics supplierData={this.state.supplierData} />;
  };

  getSupplierCampaignDetails = (campaignId) => {
    const { tappingData } = this.props.tappingDetails;
    const { token } = tappingData;
    this.setState({
      selectedCampaign: campaignId,
    });
    request
      .get(`${config.API_URL}/v0/ui/ops/campaign/supplier-count/?campaign_id=${campaignId}`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        this.setState({
          supplierData: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  };

  render() {
    const { tappingData } = this.props.tappingDetails;
    const { data } = tappingData;
    const listData = [];
    if (data) {
      Object.keys(data).map((key) => {
        listData.push(data[key]);
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
          this.getSupplierCampaignDetails(row.campaign_id);
        }}
        isExpandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
      />
    );
  }
}

export default CampaignAnalytics;
