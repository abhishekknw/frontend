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
        <td>{row.city}</td>
        <td>{row.number_of_society}</td>
        <td>{row.flats.filled}</td>
        <td>{row.flats.not_filled}</td>
        <td>{row.contact_details.name.filled}</td>
        <td>{row.contact_details.name.not_filled}</td>
        <td>{row.contact_details.number.filled}</td>
        <td>{row.contact_details.number.not_filled}</td>
        <td>{row.hashtag_images.permission_box.filled}</td>
        <td>{row.hashtag_images.permission_box.not_filled}</td>
        <td>{row.hashtag_images.receipt.filled}</td>
        <td>{row.hashtag_images.receipt.not_filled}</td>
        <td>{row.comments.filled}</td>
        <td>{row.comments.not_filled}</td>
        <td>{row.inventory.flier_allowed.yes}</td>
        <td>{row.inventory.flier_allowed.no}</td>
        <td>{row.inventory.poster_allowed.yes}</td>
        <td>{row.inventory.poster_allowed.no}</td>
        <td>{row.inventory.stall_allowed.yes}</td>
        <td>{row.inventory.stall_allowed.no}</td>
        <td>{row.inventory.standee_allowed.yes}</td>
        <td>{row.inventory.standee_allowed.no}</td>
        <td>{row.inventory.banner_allowed.yes}</td>
        <td>{row.inventory.banner_allowed.no}</td>
      </tr>
    );
  }

  render() {
    const { tappingData } = this.props.tappingDetails;
    const { data } = tappingData;
    let listData = [];
    if (data) {
      Object.keys(data).map((key) => {
        listData.push(data[key]);
      });
    }
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
                  <th>Name of Campaign</th>
                  <th>City</th>
                  <th>Number of Society</th>
                  <th colspan="2" className="double-column">
                    Flat Count
                  </th>
                  <th colspan="2" className="double-column">
                    Contact Name
                  </th>
                  <th colspan="2" className="double-column">
                    Contact Number
                  </th>
                  <th colspan="2" className="double-column">
                    Permission Letter
                  </th>
                  <th colspan="2" className="double-column">
                    Receipt
                  </th>
                  <th colspan="2" className="double-column">
                    Comments
                  </th>
                  <th colspan="2" className="double-column">
                    Fliers Allowed
                  </th>
                  <th colspan="2" className="double-column">
                    Poster Allowed
                  </th>
                  <th colspan="2" className="double-column">
                    Stall Allowed
                  </th>
                  <th colspan="2" className="double-column">
                    Standee Allowed
                  </th>
                  <th colspan="2" className="double-column">
                    Banner Allowed
                  </th>
                </tr>
                <tr>
                  <th />
                  <th />
                  <th />
                  <th />
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>Filled</th>
                  <th>Not Filled</th>
                  <th>Yes</th>
                  <th>No</th>
                  <th>Yes</th>
                  <th>No</th>
                  <th>Yes</th>
                  <th>No</th>
                  <th>Yes</th>
                  <th>No</th>
                  <th>Yes</th>
                  <th>No</th>
                </tr>
              </thead>
              <tbody>
                {listData.length ? (
                  listData.map(this.renderTappingDashboardList)
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
