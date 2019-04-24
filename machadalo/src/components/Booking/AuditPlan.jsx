import React from 'react';

const getConsolidatedList = list => {
  const listMap = {};

  for (let i = 0, l = list.length; i < l; i += 1) {
    listMap[`${list[i].supplier_id}-${list[i].inventory_name}`] = list[i];
  }

  return Object.values(listMap);
};

export default class AuditPlan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      supplierById: {},
      searchFilter: ''
    };

    this.getCampaignId = this.getCampaignId.bind(this);
    this.renderAuditPlanRow = this.renderAuditPlanRow.bind(this);
    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
  }

  componentDidMount() {
    const { getCampaignInventoryList, getSupplierList } = this.props;
    getCampaignInventoryList({ campaignId: this.getCampaignId() });
    getSupplierList();
  }

  componentDidUpdate(prevProps) {
    const { supplier: prevSupplier } = prevProps;
    const { supplier: newSupplier } = this.props;

    if (
      prevSupplier.isFetchingSupplierList &&
      !newSupplier.isFetchingSupplierList
    ) {
      const { supplierList } = newSupplier;
      const supplierById = {};

      for (let i = 0, l = supplierList.length; i < l; i += 1) {
        supplierById[supplierList[i].id] = supplierList[i];
      }

      this.setState({
        supplierById
      });
    }
  }

  onSearchFilterChange(event) {
    this.setState({
      searchFilter: event.target.value
    });
  }

  getCampaignId() {
    const { match } = this.props;
    return match.params.campaignId;
  }

  renderAuditPlanRow(plan) {
    let supplierName = '';
    if (this.state.supplierById[plan.supplier_id]) {
      supplierName = this.state.supplierById[plan.supplier_id].name;
    }

    return (
      <tr key={plan.id}>
        <td>1</td>
        <td>{plan.inventory_name}</td>
        <td>{supplierName}</td>
        <td>
          <button type="button" className="btn btn--danger">
            Manage Date
          </button>
        </td>
      </tr>
    );
  }

  render() {
    console.log('props', this.props);

    const { booking } = this.props;
    const { campaignInventoryList } = booking;
    const { searchFilter } = this.state;

    const list = getConsolidatedList(campaignInventoryList);

    return (
      <div className="booking-base__create audit-plan">
        <div className="audit-plan__title">
          <h3>Campaign Release and Audit Plan</h3>
        </div>

        <div className="audit-plan__filter">
          <input
            type="text"
            placeholder="Search..."
            value={searchFilter}
            onChange={this.onSearchFilterChange}
          />
        </div>

        <div className="audit-plan__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Inventory</th>
                <th>Supplier Name</th>
                <th>Activity Date</th>
              </tr>
            </thead>
            <tbody>
              {list && list.length ? (
                list.map(this.renderAuditPlanRow)
              ) : (
                <tr>
                  <td colSpan="5">No releases available!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
