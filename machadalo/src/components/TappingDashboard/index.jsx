import React from 'react';
import './index.css';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderTappingDashboardList = this.renderTappingDashboardList.bind(this);
  }

  componentWillMount() {
    this.props.getTappingDetails();
  }

  renderTappingDashboardList(row, index) {
    return (
      <tr key={row.id}>
        <td>{index + 1}</td>
        <td>{row.name}</td>
        <td>{row.location_details.done}</td>
        <td>{row.contact_details.done}</td>
        <td>{row.total}</td>
      </tr>
    );
  }

  render() {
    const { tappingList } = this.props.tapping;
    console.log('tappingList', tappingList);
    const tappingData = tappingList.data;
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Tapping Dashboard</h3>
        </div>
        <div className="list">
          <div className="list__table">
            <table cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Location Details</th>
                  <th>Contact Details</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tappingData.length ? (
                  tappingData.map(this.renderTappingDashboardList)
                ) : (
                  <tr>
                    <td colSpan="5">No tapping details available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
