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
    // Remove checklist
    const onRemove = () => {
      this.props.deleteSupplierChecklist({ checklistId: checklist.id });
    };

    return (
      <tr key={checklist.id}>
        <td>{index + 1}</td>
        <td>{checklist.checklist_name}</td>
        <td>
          <Link
            to={`/r/checklist/fill/${checklist.id}`}
            className="btn btn--danger"
          >
            Fill checklist
          </Link>
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {checklist.list.length ? (
                checklist.list.map(this.renderChecklistRow)
              ) : (
                <tr>
                  <td colSpan="4">
                    No checklists available. Create your first one now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="list__actions">
          {this.state.campaign && this.state.supplier ? (
            <Link
              to={`/r/checklist/create/${
                this.state.campaign.campaign.proposal_id
              }/${this.state.supplier.supplier_id}`}
              className="btn btn--danger"
            >
              Create
            </Link>
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}
