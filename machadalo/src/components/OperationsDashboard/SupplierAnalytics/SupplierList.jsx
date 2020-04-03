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
      isCampaign: true,
      name: '',
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
      name,
      is_multiple_contact_name,
      is_multiple_contact_number,
      is_contact_name,
      is_contact_number,
      isCampaign,
    } = this.props.location.state;
    if (isCampaign === false) this.setState({ isCampaign });
    this.setState({ name });
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
    let path = `/r/operations-dashboard/entity`;
    let headerValue = `List of ${this.state.name} (${type})`;
    let title = `Entity `;
    const heading = status
      ? `${this.state.name} (${status.toUpperCase()})`
      : `${this.state.name} (${type})`;
    if (this.state.isCampaign) {
      path = `/r/operations-dashboard`;
      title = 'Campaign Name';
      headerValue = 'List of Entities';
    }

    return (
      <div className="bootstrap-iso">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.props.history.push(path)}
          style={{ marginTop: '10px', backgroundColor: '#e84478', borderColor: '#e84478' }}
        >
          <i className="fa fa-arrow-left" aria-hidden="true" />
          &nbsp; Back
        </button>
        {this.state.isCampaign && (
          <div style={{ fontStyle: 'oblique', textAlign: 'center' }}>
            <h5
              style={{
                color: '#6d6d6d',
              }}
            >
              {title} :
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
            headerValue={headerValue}
            backgroundColor="#c7c7c7c9"
          />
        )}
      </div>
    );
  }
}

export default SupplierList;
