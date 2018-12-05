import React from 'react';
import PermissionModal from '../Modals/PermissionModal';

export default class PermissionList extends React.Component {
  constructor(props) {
    super();
    this.renderPermissionRow = this.renderPermissionRow.bind(this);
  }

  componentWillMount() {
    this.props.getPermissionList();
  }

  renderPermissionRow(permission, index) {
    return (
      <tr key={permission.id}>
        <td>{index + 1}</td>
        <td>{permission.user_id}</td>
        <td>Custom</td>
        <td>{permission.created_by}</td>
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
              {0 ? (
                settings.permissionList.map(this.renderPermissionRow)
              ) : (
                <tr>
                  <td colSpan="5">No permissions available!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PermissionModal {...this.props} />
      </div>
    );
  }
}
