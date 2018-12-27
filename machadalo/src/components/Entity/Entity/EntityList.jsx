import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderEntityRow = this.renderEntityRow.bind(this);
  }

  componentWillMount() {
    this.props.getEntityList();
  }

  renderEntityRow(entity, index) {
    const onRemove = () => {
      this.props.deleteEntity(entity.id, () => {
        toastr.error('', 'Entity deleted successfully');
      });
    };

    return (
      <tr key={entity.id}>
        <td>{index + 1}</td>
        <td>{entity.name}</td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </td>
        <td>
          <Link to={`/r/entity/edit/${entity.id}`} className="btn btn--danger">
            Edit Entity
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    let { entityList } = this.props.entity;
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Entity/Entity Type List</h3>
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
                {entityList.length ? (
                  entityList.map(this.renderEntityRow)
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
        <div className="list__actions">
          <Link to={'/r/entity/create'} className="btn btn--danger">
            Create Entity
          </Link>
        </div>
      </div>
    );
  }
}
