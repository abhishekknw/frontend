// List of checklists
import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderChecklistRow = this.renderChecklistRow.bind(this);
  }

  componentDidMount() {
    let campaignProposalId = this.props.match.params.campaignId;
    let supplierId = this.props.match.params.supplierId;
    this.props.getCurrentCampaign(campaignProposalId);
    this.props.getCurrentSupplier(supplierId);
    this.props.getSupplierChecklists({
      campaignId: campaignProposalId,
      supplierId: supplierId
    });
  }

  renderChecklistRow(checklist, index) {
    // Remove checklist
    const onRemove = () => {
      this.props.deleteSupplierChecklist({ checklistId: checklist.id });
    };

    return (
      <tr key={checklist.checklist_id}>
        <td>{index + 1}</td>
        <td>{checklist.checklist_name}</td>
        <td>
          <Link
            to={`/r/checklist/fill/${checklist.checklist_id}`}
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
    const { supplier, campaign, checklist } = this.props;

    return (
      <div className="list">
        <div className="list__title">
          <h3>
            Checklists for supplier{' '}
            {supplier.currentSupplier ? supplier.currentSupplier.name : ''}
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
          {campaign.currentCampaign && supplier.currentSupplier ? (
            <Link
              to={`/r/checklist/create/${this.props.match.params.campaignId}/${
                this.props.match.params.supplierId
              }`}
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
