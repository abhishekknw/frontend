import React, { Component } from 'react';
import InnerGrid from '../../InnerGrid';
import getSupplierColumn from './SupplierListGridConfig';

class SupplierList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { suppliers, campaign_id } = this.props.location.state;
    let { status } = this.props.location.state;
    status = status.charAt(0).toUpperCase() + status.slice(1);
    return (
      <div>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => this.props.history.push(`/r/operations-dashboard`)}
          style={{ marginTop: '10px' }}
        >
          <i className="fa fa-arrow-left" aria-hidden="true" />
          &nbsp; Back
        </button>
        {suppliers.length > 0 && (
          <InnerGrid
            columns={getSupplierColumn()}
            data={suppliers}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue={`List of Suppliers(${status}) - ${campaign_id}`}
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierList;
