// List of checklists
import React from 'react';
import { Link } from 'react-router-dom';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.renderBaseInventoryRow = this.renderBaseInventoryRow.bind(this);
  }

  componentDidMount() {
    this.props.getBaseInventory();
  }

  renderBaseInventoryRow(baseInventory, index) {
    console.log(baseInventory, index);
    return (
      <tr key={baseInventory._id}>
        <td>{index + 1}</td>
        <td>{baseInventory.name}</td>
        <td>
          <button
            type="button"
            className="btn btn--danger"
            // onClick={onRemove}
          >
            Remove
          </button>
        </td>
        <td>
          <button
            type="button"
            to={`/r/inventory/edit/${baseInventory._id}`}
            className="btn btn--danger"
          >
            Edit Checklist
          </button>
        </td>
      </tr>
    );
  }
  render() {
    const { baseInventory } = this.props;
    console.log(baseInventory);
    console.log(baseInventory.list.length);
    let headingText = 'All Organisation Base Inventories';
    let emptyBaseInventoryListText =
      'No base inventory available. Create your first one now!';
    let baseInventoryCreateUrl = `/r/inventory/create/`;
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
              </tr>
            </thead>
            <tbody>
              {baseInventory.list.length ? (
                baseInventory.list.map(this.renderBaseInventoryRow)
              ) : (
                <tr>
                  <td colSpan="5">{emptyBaseInventoryListText}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="list__actions">
          <Link to={baseInventoryCreateUrl} className="btn btn--danger">
            Create
          </Link>
        </div>
      </div>
    );
  }
}
