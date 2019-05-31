import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilter: '',
    };

    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.getFilteredList = this.getFilteredList.bind(this);
    this.renderSupplierRow = this.renderSupplierRow.bind(this);
  }

  componentWillMount() {
    this.props.getSupplierList();
  }

  onSearchFilterChange(event) {
    this.setState({
      searchFilter: event.target.value,
    });
  }

  getFilteredList(list) {
    return list.filter(
      (item) =>
        item.name
          .toLowerCase()
          .replace(/[^0-9a-z]/gi, '')
          .indexOf(this.state.searchFilter.toLowerCase().replace(/[^0-9a-z]/gi, '')) !== -1
    );
  }

  renderSupplierRow(supplier, index) {
    const onRemove = () => {
      this.props.deleteSupplier(supplier.id, () => {
        toastr.error('', 'Supplier deleted successfully');
      });
    };

    return (
      <tr key={supplier.id}>
        <td>{index + 1}</td>
        <td>{supplier.name}</td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </td>
        <td>
          <Link to={`/r/supplier/edit/${supplier.id}`} className="btn btn--danger">
            Edit Supplier
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { searchFilter } = this.state;
    const { supplierList } = this.props.supplier;
    const list = this.getFilteredList(supplierList);

    return (
      <div className="supplier-list">
        <div className="list">
          <div className="list__title">
            <h3>Supplier List</h3>
          </div>
          <div className="list__filter">
            <input
              type="text"
              placeholder="Search..."
              value={searchFilter}
              onChange={this.onSearchFilterChange}
            />
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
                {list.length ? (
                  list.map(this.renderSupplierRow)
                ) : (
                  <tr>
                    <td colSpan="5">No supplier types available. Create your first one now!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="list__actions">
          <Link to={'/r/supplier/create'} className="btn btn--danger">
            Create Supplier
          </Link>
        </div>
      </div>
    );
  }
}
