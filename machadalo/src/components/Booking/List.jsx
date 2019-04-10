import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListBooking extends Component {
  constructor() {
    super();

    this.state = {
      searchFilter: ''
    };

    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.getFilteredList = this.getFilteredList.bind(this);
    this.renderBookingRow = this.renderBookingRow.bind(this);
  }

  componentDidMount() {
    this.props.getBookingList({ campaignId: this.getCampaignId() });
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

  getFilteredList(list) {
    return list;
  }

  renderBookingRow(booking) {
    return (
      <tr key={booking.id}>
        {booking.booking_attributes.map(attribute => (
          <td>{attribute.value}</td>
        ))}
        <td>
          <Link
            to={`/r/booking/edit/${this.getCampaignId()}/${booking.id}`}
            className="btn btn--danger"
          >
            Edit
          </Link>
        </td>
        <td>
          <Link
            to={`/r/booking/remove/${this.getCampaignId()}/${booking.id}`}
            className="btn btn--danger"
          >
            Remove
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    const { searchFilter } = this.state;
    const { booking } = this.props;
    const { bookingList } = booking;
    const list = this.getFilteredList(bookingList);
    let attributes = [];

    if (list && list.length) {
      attributes = list[0].booking_attributes;
    }

    return (
      <div className="booking__list list">
        <div className="list__title">
          <h3>Bookings - List</h3>
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
                {attributes.map(attribute => (
                  <th>{attribute.name}</th>
                ))}
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list && list.length ? (
                list.map(this.renderBookingRow)
              ) : (
                <tr>
                  <td colSpan="5">
                    No booking templates available. Create your first one now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="list__actions">
          <Link
            to={`/r/booking/create/${this.getCampaignId()}`}
            className="btn btn--danger"
          >
            Create
          </Link>
          <Link
            to={`/r/booking/create/${this.getCampaignId()}`}
            className="btn btn--danger"
          >
            Campaign Release and Audit Plan
          </Link>
          <Link
            to={`/r/booking/create/${this.getCampaignId()}`}
            className="btn btn--danger"
          >
            Manage Phases
          </Link>
        </div>
      </div>
    );
  }
}
