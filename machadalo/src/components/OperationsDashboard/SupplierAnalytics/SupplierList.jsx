import React, { Component } from 'react';
import InnerGrid from '../../InnerGrid';
import getSupplierColumn from './SupplierListGridConfig';

class SupplierList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { suppliers, campaign_id, status } = this.props.location.state;
    return (
      <div>
        {suppliers.length > 0 && (
          <InnerGrid
            columns={getSupplierColumn()}
            data={suppliers}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue={`List of Suppliers of ${campaign_id}`}
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierList;
