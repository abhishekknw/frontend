import React, { Component } from 'react';
import InnerGrid from '../../InnerGrid';
import getCampaignColumn from './SupplierCampaignStatusGridConfig';

class SupplierCampaignStatusSummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const datafields = this.props.data;
    const headerValue = datafields[0].campaign_name
      ? `Campaign Details (${datafields[0].campaign_name})`
      : 'Campaign Details';
    return (
      <div>

        {this.props.data.length > 0 && (
          <InnerGrid
            columns={getCampaignColumn()}
            data={datafields}
            exportCsv={false}
            search={false}
            pagination={false}
            headerValue={headerValue}
            backgroundColor="#c7c7c7c9"
          />
        )}

      </div>
    );
  }
}

export default SupplierCampaignStatusSummary;
