import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CommentsModal from './../Modals/CommentsModal';

export default class ListBooking extends Component {
  constructor() {
    super();

    this.state = {
      searchFilter: '',
      selectedBooking: null,
      isCommentsModalVisible: false
    };

    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.onCommentsChange = this.onCommentsChange.bind(this);
    this.onCommentsModalClose = this.onCommentsModalClose.bind(this);
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

  onCommentsChange(comments) {
    console.log('comments: ', comments);
    const { selectedBooking } = this.state;

    this.props.putBooking({
      id: selectedBooking.id,
      data: { ...selectedBooking, comments }
    });
  }

  onCommentsModalClose() {
    this.setState({
      isCommentsModalVisible: false,
      selectedBooking: null
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
    const onComments = () => {
      // TODO: Show Modal with comments list & add comment button
      this.setState({
        selectedBooking: booking,
        isCommentsModalVisible: true
      });
    };

    const onRemove = () => {
      if (window.confirm('Are you sure you want to remove this booking?')) {
        this.props.deleteBooking(booking);
      }
    };

    return (
      <tr key={booking.id}>
        {booking.booking_attributes.map(attribute => (
          <td>{attribute.value}</td>
        ))}
        {booking.entity_attributes.map(attribute => (
          <td>
            {attribute.type === 'STRING' ||
            attribute.type === 'FLOAT' ||
            attribute.type === 'EMAIL'
              ? attribute.value
              : attribute.type}
          </td>
        ))}
        <td>
          <button
            type="button"
            className="btn btn--danger"
            onClick={onComments}
          >
            Comments
          </button>
        </td>
        <td>
          <Link
            to={`/r/booking/edit/${this.getCampaignId()}/${booking.id}`}
            className="btn btn--danger"
          >
            Edit
          </Link>
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const {
      searchFilter,
      selectedBooking,
      isCommentsModalVisible
    } = this.state;
    const { booking } = this.props;
    const { bookingList } = booking;
    const list = this.getFilteredList(bookingList);
    let attributes = [];

    if (list && list.length) {
      attributes = list[0].booking_attributes.concat(list[0].entity_attributes);
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
          <button className="btn btn--danger" disabled>
            Campaign Release and Audit Plan
          </button>
          <button className="btn btn--danger" disabled>
            Manage Phases
          </button>
        </div>

        {selectedBooking ? (
          <CommentsModal
            comments={selectedBooking.comments || {}}
            onChange={this.onCommentsChange}
            onClose={this.onCommentsModalClose}
            isVisible={isCommentsModalVisible}
            user={this.props.user.currentUser}
          />
        ) : null}
      </div>
    );
  }
}
