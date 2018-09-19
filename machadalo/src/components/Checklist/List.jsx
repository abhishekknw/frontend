// List of checklists
import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    let campaign;
    for (let i = 0, l = this.props.campaign.list.length; i < l; i += 1) {
      if (
        this.props.campaign.list[i].campaign.proposal_id ===
        match.params.campaignId
      ) {
        campaign = this.props.campaign.list[i];
        break;
      }
    }

    let supplier;
    for (let i = 0, l = this.props.supplier.list.length; i < l; i += 1) {
      if (this.props.supplier.list[i].supplier_id === match.params.supplierId) {
        supplier = this.props.supplier.list[i];
        break;
      }
    }

    console.log('campaign', campaign);
    console.log('supplier', supplier);

    this.state = {
      campaign,
      supplier
    };

    this.renderChecklistRow = this.renderChecklistRow.bind(this);
  }

  componentDidMount() {
    if (this.state.campaign && this.state.supplier) {
      this.props.getSupplierChecklists({
        campaignId: this.state.campaign.campaign.proposal_id,
        supplierId: this.state.supplier.supplier_id
      });
    }
  }

  renderChecklistRow(checklist, index) {
    return (
      <tr key={checklist.id}>
        <td>{index + 1}</td>
        <td>{checklist.name}</td>
        <td>
          <Link
            to={`/r/checklist/create/${
              this.state.campaign.campaign.proposal_id
            }/${this.state.supplier.supplier_id}`}
            className="btn btn--danger"
          >
            Create checklist
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { checklist } = this.props;

    return (
      <div className="list">
        <div className="list__title">
          <h3>
            Checklists for supplier{' '}
            {this.state.supplier ? this.state.supplier.name : ''}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{checklist.list.map(this.renderChecklistRow)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
