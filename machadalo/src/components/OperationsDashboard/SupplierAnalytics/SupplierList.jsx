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
    let {
      suppliers,
      campaign_name,
      is_multiple_contact_name,
      is_multiple_contact_number,
      is_contact_name,
      is_contact_number,
    } = this.props.location.state;
    this.setState({ campaignName: campaign_name });
    if (suppliers && typeof suppliers[0] == 'string') {
      const data = {
        supplier_ids: suppliers,
        supplier_type_code: 'RS',
        is_multiple_contact_name: is_multiple_contact_name || false,
        is_multiple_contact_number: is_multiple_contact_number || false,
        is_contact_name: is_contact_name || false,
        is_contact_number: is_contact_number || false,
      };
      this.getSupplierDetails(data);
      this.setState({ columns: getSupplierColumnContactDetails() });
    } else {
      this.setState({ supplierDetails: suppliers });
      this.setState({ columns: getSupplierColumn() });
    }
  }

  render() {
    let { status, type } = this.props.location.state;
    status = status ? status.charAt(0).toUpperCase() + status.slice(1) : '';
    const heading = status
      ? `${this.state.campaignName} (${status.toUpperCase()})`
      : `${this.state.campaignName} (${type})`;
    return (
      <div className="bootstrap-iso">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.history.push(`/r/operations-dashboard`)}
          style={{ marginTop: '10px', backgroundColor: '#e84478', borderColor: '#e84478' }}
        >
          <i className="fa fa-arrow-left" aria-hidden="true" />
          &nbsp; Back
        </button>
        {this.state.campaignName && (
          <div style={{ fontStyle: 'oblique', textAlign: 'center' }}>
            <h5
              style={{
                color: '#6d6d6d',
              }}
            >
              Campaign Name :
            </h5>
            <h5
              style={{
                color: 'rgb(0, 114, 196)',
              }}
            >
              {heading}
            </h5>
          </div>
        )}
        {this.state.supplierDetails.length > 0 && (
          <InnerGrid
            columns={this.state.columns}
            data={this.state.supplierDetails}
            exportCsv={true}
            search={true}
            pagination={true}
            headerValue="List of Entities"
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierList;
