import React, { Component } from 'react';
import InnerGrid from '../../InnerGrid';
import getCampaignColumn from './SupplierCampaignStatusGridConfig';

class SupplierCampaignStatusSummary extends Component {
  constructor(props) {
    super(props);
  }

  isRowExpandable() {
    return false;
  }

  expandColumnComponent() {
    return '';
  }

  render() {
    return (
      <div>
        {this.props.data.length > 0 && (
          <InnerGrid
            columns={getCampaignColumn()}
            data={this.props.data}
            exportCsv={false}
            search={false}
            pagination={false}
            headerValue="Campaign Details"
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierCampaignStatusSummary;
