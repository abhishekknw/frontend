import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListBaseBooking extends Component {
  render() {
    return (
      <div className="booking-base__list list">
        <div className="list__title">
          <h3>Bookings - Base</h3>
        </div>

        <div className="list__filter">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">
                  No base bookings available. Create your first one now!
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="list__actions">
          <Link to="/r/booking/base/create" className="btn btn--danger">
            Create
          </Link>
        </div>
      </div>
    );
  }
}
