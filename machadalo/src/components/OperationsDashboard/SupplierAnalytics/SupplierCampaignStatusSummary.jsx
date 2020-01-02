import React, { Component } from 'react';
import InnerGrid from '../../InnerGrid';
import getCampaignColumn from './SupplierCampaignStatusGridConfig';

class SupplierCampaignStatusSummary extends Component {
  constructor(props) {
    super(props);
  }

  addMissingDatafield = (data) => {
    const dataFields = [
      'permission_box_count',
      'receipt_count',
      'comments_count',
      'payment_method',
    ];
    dataFields.map((dataField) => {
      data.map((element) => {
        if (!element.hasOwnProperty(dataField)) {
          element[dataField] = 'NA';
        } else if (element.dataField == null) {
          element[dataField] = 0;
        }
      });
    });
    data.map((element) => {
      if (element.supplier && element.supplier.length > 0) {
        element.supplier.map((s) => {
          if (!s.society_quality) {
            s.society_quality = 'None';
          }
          if (!s.society_quantity) {
            s.society_quantity = 'None';
          }
          if (!s.payment_method) {
            s.payment_method = 'None';
          }
        });
      }
    });
    return data;
  };

  render() {
    const datafields = this.props.data;
    const headerValue = datafields[0].campaign_name
      ? `Campaign Details (${datafields[0].campaign_name})`
      : 'Campaign Details';
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
