import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ViewHashtagImagesModal from '../Modals/ViewHashtagImagesModal';

import CommentsModal from './../Modals/CommentsModal';
import PhaseModal from './../Modals/PhaseModal';
import FillAdditionalAttributeModal from './../Modals/AdditionalAttributesModal';

export default class ListBooking extends Component {
  constructor() {
    super();

    this.state = {
      searchFilter: '',
      selectedBooking: null,
      isCommentsModalVisible: false,
      isPhaseModalVisible: false,
      isViewHashtagImagesModalVisible: false,
      selectedAdditionalAttribute: {},
    };

    this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
    this.onCommentsChange = this.onCommentsChange.bind(this);
    this.onCommentsModalClose = this.onCommentsModalClose.bind(this);
    this.onManagePhaseClick = this.onManagePhaseClick.bind(this);
    this.onPhaseModalClose = this.onPhaseModalClose.bind(this);
    this.getFilteredList = this.getFilteredList.bind(this);
    this.renderBookingRow = this.renderBookingRow.bind(this);
    this.onViewImageClick = this.onViewImageClick.bind(this);
    this.onViewHashtagImagesModalClose = this.onViewHashtagImagesModalClose.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  componentDidMount() {
    this.props.getBookingList({ campaignId: this.getCampaignId() });
  }

  onSearchFilterChange(event) {
    this.setState({
      searchFilter: event.target.value,
    });
  }

  onCommentsChange(comments) {
    console.log('comments: ', comments);
    const { selectedBooking } = this.state;

    this.props.putBooking({
      id: selectedBooking.id,
      data: { ...selectedBooking, comments },
    });
  }

  onCommentsModalClose() {
    this.setState({
      isCommentsModalVisible: false,
      selectedBooking: null,
    });
  }

  onManagePhaseClick() {
    this.setState({
      isPhaseModalVisible: true,
    });
  }

  onPhaseModalClose() {
    this.setState({
      isPhaseModalVisible: false,
    });
  }

  getCampaignId() {
    const { match } = this.props;
    return match.params.campaignId;
  }

  onViewImageClick(item) {
    this.setState({
      isViewHashtagImagesModalVisible: true,
      selectedRow: item,
    });
  }

  onViewHashtagImagesModalClose() {
    this.setState({
      isViewHashtagImagesModalVisible: false,
    });
  }
  onFillAdditionalAttributeModalClose = () => {
    this.setState({
      isAdditionalAttributeModalVisible: false,
      selectedAdditionalAttribute: {},
      selectedBooking: null,
    });
  };
  onBack() {
    const { match } = this.props;
    this.props.history.push(`/r/booking/campaigns`);
  }

  getFilteredList(list) {
    return list;
  }

  renderBookingRow(booking) {
    const onComments = () => {
      this.setState({
        selectedBooking: booking,
        isCommentsModalVisible: true,
      });
    };

    const viewImageClick = () => {
      this.onViewImageClick(booking);
    };

    const onRemove = () => {
      if (window.confirm('Are you sure you want to remove this booking?')) {
        this.props.deleteBooking(booking);
      }
    };

    const onFillAdditionalAttributeModalClick = (attribute_type) => {
      this.setState({
        selectedBooking: booking,
        isAdditionalAttributeModalVisible: true,
        selectedAdditionalAttribute: booking['additional_attributes'][attribute_type],
        selectedFieldName: attribute_type,
      });
    };

    const { isViewHashtagImagesModalVisible, selectedBooking } = this.state;

    return (
      <tr key={booking.id}>
        {booking.supplier_attributes.map((attribute) => (
          <td>
            {attribute.type === 'STRING' ||
            attribute.type === 'FLOAT' ||
            attribute.type === 'EMAIL' ||
            attribute.type === 'DROPDOWN'
              ? attribute.value
              : attribute.type}
          </td>
        ))}
        {booking.booking_attributes.map((attribute) => (
          <td>
            {attribute.type === 'HASHTAG' && attribute.files ? (
              <button type="button" className="btn btn--danger" onClick={viewImageClick}>
                View Images ({attribute.files.length})
              </button>
            ) : (
              attribute.value
            )}
            {isViewHashtagImagesModalVisible && attribute.type === 'HASHTAG' && attribute.files ? (
              <ViewHashtagImagesModal
                onClose={this.onViewHashtagImagesModalClose}
                isVisible={isViewHashtagImagesModalVisible}
                item={attribute.files}
              />
            ) : null}
          </td>
        ))}
        <td>
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => onFillAdditionalAttributeModalClick('society_details')}
          >
            Society Details
          </button>
        </td>
        <td>
          {booking.additional_attributes.location_details &&
          booking.additional_attributes.location_details[2].value &&
          booking.additional_attributes.location_details[3].value ? (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('location_details')}
            >
              {booking.additional_attributes.location_details[2].value},
              {booking.additional_attributes.location_details[4].value}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('location_details')}
            >
              Location
            </button>
          )}
        </td>
        <td>
          {booking.additional_attributes.contact_details &&
          booking.additional_attributes.contact_details[3].value ? (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('contact_details')}
            >
              {booking.additional_attributes.contact_details[3].value}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('contact_details')}
            >
              Contact Details
            </button>
          )}
        </td>
        <td>
          {booking.additional_attributes.bank_details &&
          booking.additional_attributes.bank_details[2].value ? (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('bank_details')}
            >
              {booking.additional_attributes.bank_details[2].value}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('bank_details')}
            >
              Bank Details
            </button>
          )}
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onComments}>
            Internal Comments
          </button>
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={onComments}>
            External Comments
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
      isCommentsModalVisible,
      isPhaseModalVisible,
      isViewHashtagImagesModalVisible,
    } = this.state;
    const { booking } = this.props;
    const { bookingList } = booking;
    const list = this.getFilteredList(bookingList);
    let attributes = [];

    if (list && list.length) {
      attributes = list[0].supplier_attributes.concat(list[0].booking_attributes);
    }

    return (
      <div className="booking__list list">
        <div className="list__title">
          <h3>Booking - List</h3>
        </div>
        <button type="button" className="btn btn--danger" onClick={this.onBack}>
          <i className="fa fa-arrow-left" aria-hidden="true" />
          &nbsp; Back
        </button>
        <br />
        <br />

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
                {attributes.map((attribute) => (
                  <th>{attribute.name}</th>
                ))}
                <th>Society</th>
                <th>Location</th>
                <th>Contact Details</th>
                <th>Bank Details</th>
                <th>Comments</th>
                <th>Comment</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {list && list.length ? (
                list.map(this.renderBookingRow)
              ) : (
                <tr>
                  <td colSpan="5">No booking templates available. Create your first one now!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="list__actions">
          <Link to={`/r/booking/create/${this.getCampaignId()}`} className="btn btn--danger">
            Add
          </Link>
          <Link to={`/r/booking/plan/${this.getCampaignId()}`} className="btn btn--danger">
            Campaign Release and Audit Plan
          </Link>
          <button type="button" className="btn btn--danger" onClick={this.onManagePhaseClick}>
            Manage Phases
          </button>
        </div>

        {selectedBooking ? (
          <FillAdditionalAttributeModal
            key={this.state.selectedAdditionalAttribute}
            isVisible={this.state.isAdditionalAttributeModalVisible}
            attributes={this.state.selectedAdditionalAttribute}
            onClose={this.onFillAdditionalAttributeModalClose}
            isDisabled={true}
          />
        ) : null}

        {selectedBooking ? (
          <CommentsModal
            comments={selectedBooking.comments || {}}
            onChange={this.onCommentsChange}
            onClose={this.onCommentsModalClose}
            isVisible={isCommentsModalVisible}
            user={this.props.user.currentUser}
          />
        ) : null}

        <PhaseModal
          {...this.props}
          onClose={this.onPhaseModalClose}
          isVisible={isPhaseModalVisible}
          campaign={{ campaignId: this.getCampaignId() }}
        />
      </div>
    );
  }
}
