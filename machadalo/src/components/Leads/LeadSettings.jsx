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
      createPermission: false,
      dataInfo: [],
      userPermissionId: undefined
    };
    this.renderPermissionRow = this.renderPermissionRow.bind(this);
    this.openCreatePermissionModal = this.openCreatePermissionModal.bind(this);
    this.closePermissionModal = this.closePermissionModal.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getLeadPermissionList();
  }
  componentDidUpdate(prevProps) {
    if (
      (!prevProps.leads.leadUserPermission.length &&
        this.props.leads.leadUserPermission.length) ||
      prevProps.leads.currentUserPermissionId !==
        this.props.leads.currentUserPermissionId
    ) {
      let dataInfo = this.props.leads.leadUserPermission;
      this.setState({
        dataInfo,
        userPermissionId: this.props.leads.currentUserPermissionId
      });
    }
  }
  handleEditUser(userId) {
    this.props.getLeadUserPermission(userId);
    this.setState({
      showPermissionModal: true,
      modalUserId: userId,
      createPermission: false
    });
  }
  handleDeleteUser(permissionId) {
    this.props.deleteLeadsUserPermission(permissionId, () => {
      toastr.success('', 'User Lead Permission deleted successfully');
    });
  }
  openCreatePermissionModal() {
    this.props.getAllLeadsFormData();
    this.setState({
      showPermissionModal: true,
      createPermission: true
    });
  }
  onModalSubmit(state) {
    let requestData = {
      id: undefined,
      leads_permissions: {
        campaigns: {},
        leads_forms: {}
      },
      user_id: undefined
    };
    if (!this.state.createPermission) {
      requestData.id = this.state.userPermissionId;
      requestData.user_id = this.state.modalUserId;
    } else {
      requestData.user_id = state.selectedUser.value;
    }
    state.data.data.forEach(campaignData => {
      if (
        campaignData.type === 'campaign' &&
        campaignData.permission !== 'None'
      ) {
        if (campaignData.permission === 'Edit') {
          requestData.leads_permissions.campaigns[campaignData.entityId] = [
            'EDIT',
            'VIEW',
            'DELETE',
            'FILL',
            'FREEZE',
            'UNFREEZE'
          ];
        } else {
          requestData.leads_permissions.campaigns[campaignData.entityId] = [
            'VIEW',
            'FILL',
            'FREEZE'
          ];
        }
      }
      if (campaignData.data.length) {
        campaignData.data.forEach(leadFormData => {
          if (
            leadFormData.type === 'lead_form' &&
            leadFormData.permission !== 'None'
          ) {
            if (leadFormData.permission === 'Edit') {
              requestData.leads_permissions.leads_forms[
                leadFormData.entityId
              ] = ['EDIT', 'VIEW', 'DELETE', 'FILL'];
            } else {
              requestData.leads_permissions.leads_forms[
                leadFormData.entityId
              ] = ['VIEW', 'FILL'];
            }
          }
        });
      }
    });

    this.setState({
      showPermissionModal: false,
      modalUserId: undefined,
      createPermission: false
    });
    if (this.state.createPermission) {
      this.props.createLeadsUserPermission([requestData], () => {
        toastr.success('', 'User Lead Permission created successfully');
      });
    } else {
      this.props.updateLeadsUserPermission([requestData], () => {
        toastr.success('', 'User Lead Permission updated successfully');
      });
    }
  }

  closePermissionModal() {
    this.setState({
      showPermissionModal: false,
      createPermission: false
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
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.handleEditUser(permission.user_id.id)}
          >
            Edit
          </button>{' '}
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.handleDeleteUser(permission.id)}
          >
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
