import React from 'react';
import { Link } from 'react-router-dom';

export default class Suppliers extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    let campaign;
    for (let i = 0, l = this.props.campaign.list.length; i < l; i += 1) {
      if (
        this.props.campaign.list[i].campaign.proposal_id ==
        match.params.campaignId
      ) {
        campaign = this.props.campaign.list[i];
        break;
      }
    }

    this.state = {
      campaign
    };

    this.renderSupplierRow = this.renderSupplierRow.bind(this);
  }

  componentDidMount() {
    if (this.state.campaign) {
      this.props.getSuppliersList({
        campaignProposalId: this.state.campaign.campaign.proposal_id
      });
    }
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
            to={`/r/checklist/create/${
              this.state.campaign.campaign.proposal_id
            }/${supplier.supplier_id}`}
            className="btn btn--danger"
          >
            Create checklist
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { supplier } = this.props;

    return (
      <div className="list">
        <div className="list__title">
          <h3>
            Suppliers of Campaign{' '}
            {this.state.campaign ? this.state.campaign.campaign.name : ''}
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
            <tbody>{supplier.list.map(this.renderSupplierRow)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
