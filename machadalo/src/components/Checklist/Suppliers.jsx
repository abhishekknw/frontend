import React from 'react';
import { Link } from 'react-router-dom';

export default class Suppliers extends React.Component {
  constructor(props) {
    super(props);

    this.renderSupplierRow = this.renderSupplierRow.bind(this);
  }

  componentDidMount() {
    let campaignProposalId = this.props.match.params.campaignId;
    this.props.getCurrentCampaign(campaignProposalId);
    this.props.getSuppliersList({ campaignProposalId });
  }

  renderSupplierRow(supplier, index) {
    return (
      <tr key={supplier.supplier_id}>
        <td>{index + 1}</td>
        <td>{supplier.name}</td>
        <td>{supplier.area}</td>
        <td>{supplier.subarea}</td>
        <td>
          {supplier.address1} {supplier.address2}
        </td>
        <td>
          <Link
            to={`/r/checklist/list/${this.props.match.params.campaignId}/${
              supplier.supplier_id
            }`}
            className="btn btn--danger"
          >
            View checklists
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { supplier, campaign } = this.props;

    return (
      <div className="list">
        <div className="list__title">
          <h3>
            Suppliers of Campaign{' '}
            {campaign.currentCampaign
              ? campaign.currentCampaign.campaign.name
              : ''}
          </h3>
        </div>
        <div className="list__filter">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Area</th>
                <th>Sub-area</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {supplier.list.map(this.renderSupplierRow.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
