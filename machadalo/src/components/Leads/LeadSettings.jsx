import React from 'react';
import PermissionModal from '../Modals/PermissionModal';
import { toastr } from 'react-redux-toastr';

import '../Checklist/index.css';

export default class LeadSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPermissionModal: false,
      modalUserId: undefined,
      createPermission: false
    };
    this.renderPermissionRow = this.renderPermissionRow.bind(this);
    this.openCreatePermissionModal = this.openCreatePermissionModal.bind(this);
  }
  componentWillMount() {
    this.props.getLeadPermissionList();
  }
  openCreatePermissionModal() {
    this.setState({
      showPermissionModal: true,
      createPermission: true
    });
  }
  renderPermissionRow(permission, index) {
    return (
      <tr key={permission.id}>
        <td>{index + 1}</td>
        <td>
          {permission.user_id.first_name + ' ' + permission.user_id.last_name}
        </td>
        <td>Custom</td>
        <td>
          {permission.created_by.first_name +
            ' ' +
            permission.created_by.last_name}
        </td>
        <td>
          <button type="button" className="btn btn--danger">
            Edit
          </button>{' '}
          <button type="button" className="btn btn--danger">
            Remove
          </button>
        </td>
      </tr>
    );
  }
  render() {
    let { leads } = this.props;
    return (
      <div className="list">
        <div className="list__title">
          <h3>Lead Permission List</h3>
        </div>
        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Permission</th>
                <th>Created by</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.leadPermissionList.length ? (
                leads.leadPermissionList.map(this.renderPermissionRow)
              ) : (
                <tr>
                  <td colSpan="5">No leads permissions available!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="list__actions">
          <button
            type="button"
            className="btn btn--danger"
            onClick={this.openCreatePermissionModal}
          >
            Create
          </button>
        </div>
        {this.state.showPermissionModal ? (
          <PermissionModal
            {...this.props}
            {...this.state}
            onClose={this.closePermissionModal}
            onSubmit={this.onModalSubmit}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}
