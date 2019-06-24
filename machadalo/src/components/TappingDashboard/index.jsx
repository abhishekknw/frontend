import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
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
      </tr>
    );
  }

  render() {
    const { tappingList } = this.props.tapping;
    const { tappingData } = tappingList;
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5">No tapping details available.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
