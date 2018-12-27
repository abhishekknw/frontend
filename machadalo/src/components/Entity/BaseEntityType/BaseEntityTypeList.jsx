import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderBaseEntityTypeRow = this.renderBaseEntityTypeRow.bind(this);
  }

  componentWillMount() {
    this.props.getBaseEntityTypeList();
  }

  renderBaseEntityTypeRow(baseEntityType, index) {
    const onRemove = () => {
      this.props.deleteBaseEntityType(baseEntityType.id, () => {
        toastr.error('', 'Base Entity Type deleted successfully');
      });
    };

    return (
      <tr key={baseEntityType.id}>
        <td>{index + 1}</td>
        <td>{baseEntityType.name}</td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </td>
        <td>
          <Link
            to={`/r/entity/base-type/edit/${baseEntityType.id}`}
            className="btn btn--danger"
          >
            Edit Entity Type
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    let { baseEntityTypeList } = this.props.baseEntityType;
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Entity Type List</h3>
        </div>
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
                {baseEntityTypeList.length ? (
                  baseEntityTypeList.map(this.renderBaseEntityTypeRow)
                ) : (
                  <tr>
                    <td colSpan="5">
                      No base entity types available. Create your first one now!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="list__actions">
          <Link to={'/r/entity/base-type/create'} className="btn btn--danger">
            Create Base Entity Type
          </Link>
        </div>
      </div>
    );
  }
}
