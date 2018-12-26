import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderEntityTypeRow = this.renderEntityTypeRow.bind(this);
  }

  componentWillMount() {
    this.props.getEntityTypeList();
  }

  renderEntityTypeRow(entityType, index) {
    const onRemove = () => {
      this.props.deleteEntityType(entityType.id, () => {
        toastr.error('', 'Entity Type deleted successfully');
      });
    };

    return (
      <tr key={entityType.id}>
        <td>{index + 1}</td>
        <td>{entityType.name}</td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </td>
        <td>
          <Link
            to={`/r/entity/type/edit/${entityType.id}`}
            className="btn btn--danger"
          >
            Edit Entity Type
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    let { entityTypeList } = this.props.entity;
    return (
      <div className="list">
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
              {entityTypeList.length ? (
                entityTypeList.map(this.renderEntityTypeRow)
              ) : (
                <tr>
                  <td colSpan="5">
                    No entity types available. Create your first one now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
