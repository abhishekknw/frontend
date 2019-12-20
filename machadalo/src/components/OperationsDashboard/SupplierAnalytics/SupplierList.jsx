import React, { Component } from 'react';
import request from 'superagent';
import config from '../../../config';
import InnerGrid from '../../InnerGrid';
import getSupplierColumn from './SupplierListGridConfig';
import getSupplierColumnContactDetails from './ContactDetailsSuppliersGridConfig';

class SupplierList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignName: '',
      supplierDetails: [],
      suppliers: [],
      columns: [],
    };
  }

  getSupplierDetails = (data) => {
    const { token } = this.props.auth;
    request
      .post(`${config.API_URL}/v0/ui/website/multi-supplier-details/`)
      .set('Authorization', `JWT ${token}`)
      .send(data)
      .then((resp) => {
        this.setState({
          supplierDetails: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  };

  componentDidMount() {
    let { suppliers, campaign_name } = this.props.location.state;
    this.setState({ campaignName: campaign_name });
    if (suppliers && typeof suppliers[0] == 'string') {
      const data = {
        supplier_ids: suppliers,
        supplier_type_code: 'RS',
      };
      this.getSupplierDetails(data);
      this.setState({ columns: getSupplierColumnContactDetails() });
    } else {
      this.setState({ supplierDetails: suppliers });
      this.setState({ columns: getSupplierColumn() });
    }
  }

  render() {
    let { status } = this.props.location.state;
    status = status ? status.charAt(0).toUpperCase() + status.slice(1) : '';
    const heading = status
      ? `${this.state.campaignName} - ${status} Campaigns`
      : `${this.state.campaignName}`;
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
        {this.state.campaignName && (
          <h2
            style={{
              color: 'rgba(0, 119, 4, 0.66)',
              fontStyle: 'oblique',
            }}
          >
            {heading}
          </h2>
        )}
        {this.state.supplierDetails.length > 0 && (
          <InnerGrid
            columns={this.state.columns}
            data={this.state.supplierDetails}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue="List of Suppliers"
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierList;
