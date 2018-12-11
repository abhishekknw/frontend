import React from 'react';
import PermissionModal from '../Modals/PermissionModal';
import { toastr } from 'react-redux-toastr';

export default class PermissionList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showPermissionModal: false,
      modalUserId: undefined,
      createPermission: false
    };
    this.renderPermissionRow = this.renderPermissionRow.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.closePermissionModal = this.closePermissionModal.bind(this);
    this.openCreatePermissionModal = this.openCreatePermissionModal.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentWillMount() {
    this.props.getPermissionList();
  }

  handleEditUser(userId) {
    this.setState({
      showPermissionModal: true,
      modalUserId: userId,
      createPermission: false
    });
  }

  handleDeleteUser(permissionId) {
    this.props.deleteUserPermission(permissionId, () => {
      toastr.success('', 'User Permission deleted successfully');
    });
  }

  closePermissionModal() {
    this.setState({
      showPermissionModal: false,
      modalUserId: undefined,
      createPermission: false
    });
  }

  openCreatePermissionModal() {
    this.setState({
      showPermissionModal: true,
      createPermission: true,
      modalUserId: undefined
    });
  }

  onModalSubmit(requestData) {
    this.setState({
      showPermissionModal: false,
      modalUserId: undefined,
      createPermission: false
    });
    if (this.state.createPermission) {
      this.props.createUserPermission([requestData], () => {
        toastr.success('', 'User Permission created successfully');
      });
    } else {
      this.props.updateUserPermission([requestData], () => {
        toastr.success('', 'User Permission updated successfully');
      });
    }
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
    let { settings } = this.props;

    return (
      <div className="list">
        <div className="list__title">
          <h3>Permission List</h3>
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
              {settings.permissionList.length ? (
                settings.permissionList.map(this.renderPermissionRow)
              ) : (
                <tr>
                  <td colSpan="5">No permissions available!</td>
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
