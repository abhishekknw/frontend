import React, { Component } from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getCampaignColumn from './SupplierCampaignStatusGridConfig';

class SupplierCampaignStatusSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplierDetails: {},
    };
  }

  componentDidMount() {
    this.getSupplierDetails('BYJBYJ1DF8');
  }

  onBack() {
    const { match } = this.props;
    this.props.history.push(`/r/operations-dashboard`);
  }

  isRowExpandable() {
    return false;
  }

  expandColumnComponent() {
    return '';
  }

  getSupplierDetails = (campaignId) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1kYWRtaW4iLCJvcmlnX2lhdCI6MTU0MDQ1MTU5NSwibmFtZSI6IkFkbWluIiwiZXhwIjoxNTQwNDUxODk1LCJ1c2VyX2lkIjoxMDcsImVtYWlsIjoiYWRtaW5AbWFjaGFkYWxvLmNvbSJ9.oPeM1QtnbYHaKuky7fKYP2dCNI9DsM0tC4byBMCso58';
    request
      .get(`${config.API_URL}/v0/ui/ops/campaign/supplier-analytics/?campaign_id=${campaignId}`)
      .set('Authorization', `JWT ${token}`)
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

  render() {
    return (
      <div>
        {this.state.supplierDetails.length > 0 && <button onClick={this.onBack}>Back</button> && (
          <InnerGrid
            columns={getCampaignColumn()}
            data={this.state.supplierDetails}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue="Supplier Details"
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierCampaignStatusSummary;
