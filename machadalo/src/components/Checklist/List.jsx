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
    if (supplierId) {
      this.props.getCurrentSupplier(supplierId);
      this.props.getSupplierChecklists({
        campaignId: campaignProposalId,
        supplierId: supplierId
      });
    } else {
      this.props.getCampaignChecklists({
        campaignId: campaignProposalId
      });
    }
  }

  renderChecklistRow(checklist, index) {
    // Remove checklist
    const onRemove = () => {
      this.props.deleteChecklist({
        checklistId: checklist.checklist_info.checklist_id
      });
    };

    return (
      <tr key={checklist.checklist_info.checklist_id}>
        <td>{index + 1}</td>
        <td>{checklist.checklist_info.checklist_name}</td>
        <td>
          <Link
            to={`/r/checklist/fill/${checklist.checklist_info.checklist_id}`}
            className="btn btn--danger"
          >
            Fill Checklist
          </Link>
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </td>
        <td>
          <Link
            to={`/r/checklist/edit/${checklist.checklist_info.checklist_id}`}
            className="btn btn--danger"
          >
            Edit Checklist
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { supplier, campaign, checklist } = this.props;

    let supplierChecklistFlag = true;
    let headingText = 'Checklists for ',
      checklistCreateUrl,
      showCreateButton = false;

    if (!this.props.match.params.supplierId) {
      supplierChecklistFlag = false;
    }

    if (supplierChecklistFlag) {
      headingText +=
        'Supplier ' +
        (supplier.currentSupplier ? supplier.currentSupplier.name : '');

      checklistCreateUrl = `/r/checklist/create/${
        this.props.match.params.campaignId
      }/${this.props.match.params.supplierId}`;
      if (campaign.currentCampaign && supplier.currentSupplier) {
        showCreateButton = true;
      }
    } else {
      headingText +=
        'Campaign ' +
        (campaign.currentCampaign
          ? campaign.currentCampaign.campaign.name
          : '');

      checklistCreateUrl = `/r/checklist/create/${
        this.props.match.params.campaignId
      }`;
      if (campaign.currentCampaign) {
        showCreateButton = true;
      }
    }

    return (
      <div className="list">
        <div className="list__title">
          <h3>{headingText}</h3>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {checklist.list.length ? (
                checklist.list.map(this.renderChecklistRow)
              ) : (
                <tr>
                  <td colSpan="5">
                    No checklists available. Create your first one now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="list__actions">
          {showCreateButton ? (
            <Link to={checklistCreateUrl} className="btn btn--danger">
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
