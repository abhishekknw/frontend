import React from 'react';
import Select from 'react-select';
import ViewImageModal from '../Modals/ViewImagesModal';

const getFilteredList = (list, assignmentList) => {
  const filteredList = list
    .map((item) => [
      ...assignmentList[item].RELEASE,
      ...assignmentList[item].AUDIT,
      ...assignmentList[item].CLOSURE,
    ])
    .reduce((acc, item) => acc.concat(item), []);

  return filteredList;
};

const ActivityTypes = [
  { value: 'RELEASE', label: 'Release' },
  { value: 'AUDIT', label: 'Audit' },
  { value: 'CLOSURE', label: 'Closure' },
  { value: 'ALL', label: 'All' },
];

export default class ManageImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      supplierById: {},
      searchFilter: '',
      userById: '',
      isViewImageModalVisible: false,
    };

    this.getCampaignId = this.getCampaignId.bind(this);
    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.renderListRow = this.renderListRow.bind(this);
    this.onViewImageClick = this.onViewImageClick.bind(this);
    this.onUploadImageClick = this.onUploadImageClick.bind(this);
    this.onViewImageModalClose = this.onViewImageModalClose.bind(this);
  }

  componentDidMount() {
    const {
      getSupplierList,
      getAssignmentList,
      getCampaignInventoryList,
      getUsersList,
    } = this.props;
    getSupplierList();
    getCampaignInventoryList({ campaignId: this.getCampaignId() });
    getAssignmentList({ campaignId: this.getCampaignId() });

    getUsersList();
  }

  componentDidUpdate(prevProps) {
    const { supplier: prevSupplier, user: prevUser } = prevProps;
    const { supplier: newSupplier, user: newUser } = this.props;

    if (prevSupplier.isFetchingSupplierList && !newSupplier.isFetchingSupplierList) {
      const { supplierList } = newSupplier;
      const supplierById = {};

      for (let i = 0, l = supplierList.length; i < l; i += 1) {
        supplierById[supplierList[i].id] = supplierList[i];
      }

      this.setState({
        supplierById,
      });
    }

    if (prevUser.isFetchingUserList && !newUser.isFetchingUserList) {
      const { userList } = newUser;
      const userById = {};

      for (let i = 0, l = userList.length; i < l; i += 1) {
        userById[userList[i].id] = userList[i];
      }

      this.setState({
        userById,
      });
    }
  }

  onSearchFilterChange(event) {
    this.setState({
      searchFilter: event.target.value,
    });
  }

  onSupplierChange() {}

  onActivityTypeChange() {}

  getCampaignId() {
    const { match } = this.props;
    return match.params.campaignId;
  }

  onViewImageClick() {
    this.setState({
      isViewImageModalVisible: true,
    });
  }

  onUploadImageClick() {}

  onViewImageModalClose() {
    this.setState({
      isViewImageModalVisible: false,
    });
  }

  renderListRow(item) {
    const { supplierById, userById } = this.state;
    let supplierName = '';
    let userName = '';
    const viewImageClick = () => {
      this.onViewImageClick(item);
    };

    const uploadImageClick = () => {
      this.onUploadImageClick(item);
    };

    if (supplierById[item.supplier_id]) {
      supplierName = supplierById[item.supplier_id].name;
    }

    if (userById[item.assigned_to_id]) {
      userName = userById[item.assigned_to_id].username;
    }

    return (
      <tr key={item.id}>
        <td>{supplierName}</td>
        <td>{item.inventory_name}</td>
        <td>{item.activity_type}</td>
        <td>{item.activity_date}</td>
        <td>{userName}</td>
        <td>
          <button type="button" className="btn btn--danger" onClick={viewImageClick}>
            View Images
          </button>
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={uploadImageClick}>
            Upload Image
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { booking, supplier, match } = this.props;
    const supplierId = match.params.supplierId;
    const { assignmentList } = booking;
    const { supplierById, isViewImageModalVisible } = this.state;

    const assignmentListKeys = Object.keys(assignmentList);
    const list = getFilteredList(assignmentListKeys, assignmentList);
    console.log('list: ', list);

    return (
      <div className="booking-base__create manage-image">
        <div className="manage-image__title">
          <h3>Manage Image</h3>
        </div>

        <div className="manage-image__filters">
          <div className="form-control">
            <Select
              className="select"
              options={supplier.supplierList}
              getOptionValue={(option) => option.id}
              getOptionLabel={(option) => option.name}
              value={supplierById[supplierId]}
              onChange={this.onSupplierChange}
              placeholder="Select Supplier"
            />
          </div>
          <div className="form-control">
            <Select
              className="select"
              options={ActivityTypes}
              onChange={this.onActivityTypeChange}
              placeholder="Select Activity Type"
            />
          </div>
        </div>

        <div className="manage-image__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Inventory Type</th>
                <th>Activity Type</th>
                <th>Activity date</th>
                <th>Assigned User</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list && list.length ? (
                list.map(this.renderListRow)
              ) : (
                <tr>
                  <td colSpan="5">No releases available!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {isViewImageModalVisible ? (
          <ViewImageModal
            onClose={this.onViewImageModalClose}
            isVisible={isViewImageModalVisible}
          />
        ) : null}
      </div>
    );
  }
}
