import React from 'react';
import '../../bootstrap-iso.css';
import request from 'superagent';
import config from '../../../config';
import getCampaignColumn from './CampaignGridColumnConfig';
import Grid from '../../Grid';
import SupplierAnalytics from '../SupplierAnalytics';
import LoadingWrapper from '../../Error/LoadingWrapper';

class CampaignAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierData: {},
      selectedCampaign: '',
      token: '',
    };
  }

  isExpandableRow = (row) => {
    return row.campaign_id == this.state.selectedCampaign ? true : false;
  };

  expandComponent = () => {
    return <SupplierAnalytics supplierData={this.state.supplierData} token={this.state.token} />;
  };

  getSupplierCampaignDetails = (campaignId) => {
    const { tappingData } = this.props.tappingDetails;
    const { token } = tappingData;
    this.setState({
      selectedCampaign: campaignId,
      token,
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
    const { tappingData, isFetchingTappingList } = this.props.tappingDetails;
    const { data } = tappingData;
    const listData = [];
    if (data) {
      Object.keys(data).map((key) => {
        listData.push(data[key]);
      });
    }

    return (
      <div className="bootstrap-iso">
        {isFetchingTappingList ? (
          <LoadingWrapper />
        ) : (
          <Grid
            columns={getCampaignColumn()}
            data={listData}
            headerValue="Campaign Report"
            exportCsv={true}
            search={true}
            pagination={true}
            onRowClick={(row) => {
              this.getSupplierCampaignDetails(row.campaign_id);
            }}
            isExpandableRow={this.isExpandableRow}
            expandComponent={this.expandComponent}
          />
        )}
      </div>
    );
  }
}

export default CampaignAnalytics;
