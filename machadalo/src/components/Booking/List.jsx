import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ViewHashtagImagesModal from '../Modals/ViewHashtagImagesModal';
import Select from 'react-select';

import CommentsModal from './../Modals/CommentsModal';
import PhaseModal from './../Modals/PhaseModal';
import FillAdditionalAttributeModal from './../Modals/AdditionalAttributesModal';
import { element } from 'prop-types';

const optionTypes = [
  { value: 'supplier_attributes', label: 'Supplier' },
  { value: 'additional_attributes', label: 'Area' },
];

const getOption = (value) => {
  for (let i = 0, l = optionTypes.length; i < l; i += 1) {
    if (optionTypes[i] === value) {
      return optionTypes[i];
    }
  }

  return { value };
};

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
      commentType: '',
      campaignName: '',
      selectedOption: optionTypes[0],
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
    this.onOptionTypeChange = this.onOptionTypeChange.bind(this);
    this.sort = this.sort.bind(this);
  }

  componentDidMount() {
    this.props.getBookingList({ campaignId: this.getCampaignId() });
    this.props.getCampaignsList();
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
    console.log(this.state.searchFilter, this.state.selectedOption);
    if (this.state.searchFilter && this.state.selectedOption) {
      let result = [];
      let attribute = this.state.selectedOption.value;

      switch (attribute) {
        case 'supplier_attributes':
          list.forEach((element) => {
            let flag = true;
            console.log(element[attribute], attribute);
            if (element.hasOwnProperty(attribute)) {
              element[attribute].forEach((item) => {
                if (flag) {
                  if (item.hasOwnProperty('value')) {
                    console.log(item);
                    if (typeof item.value == 'string') {
                      if (
                        item.value.toLowerCase().includes(this.state.searchFilter.toLowerCase())
                      ) {
                        result.push(element);
                        flag = false;
                      }
                    }
                  }
                }
              });
            }
          });
          break;

        case 'additional_attributes':
          list.forEach((element) => {
            let flag = true;
            console.log(element[attribute], attribute);
            if (element.additional_attributes.hasOwnProperty('location_details')) {
              element.additional_attributes.location_details.forEach((item) => {
                if (flag) {
                  if (item.hasOwnProperty('value')) {
                    console.log(item);
                    if (typeof item.value == 'string') {
                      if (
                        item.value.toLowerCase().includes(this.state.searchFilter.toLowerCase())
                      ) {
                        result.push(element);
                        flag = false;
                      }
                    }
                  }
                }
              });
            }
          });
          break;
        default:
          return list;
          break;
      }
      return result;
    }
    return list;
  }

  sort(attribute, attrType, list) {
    {
      this.props.booking.bookingList.sort((a, b) => {
        a = a.supplier_attributes[0].value.toLowerCase();
        b = b.supplier_attributes[0].value.toLowerCase();
        console.log(a, b);

        return a < b;
      });

      this.setState({});
    }
  }

  onOptionTypeChange(value) {
    console.log('hello', value);
    this.setState({
      selectedOption: value,
    });
    console.log(this.state.selectedOption);
  }

  renderBookingRow(booking) {
    const onComments = (type) => {
      this.setState({
        selectedBooking: booking,
        isCommentsModalVisible: true,
        commentType: type,
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
      if (
        booking &&
        booking['additional_attributes'] &&
        booking['additional_attributes'][attribute_type]
      ) {
        this.setState({
          selectedBooking: booking,
          isAdditionalAttributeModalVisible: true,
          selectedAdditionalAttribute: booking['additional_attributes'][attribute_type],
          selectedFieldName: attribute_type,
        });
      }
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
        {booking &&
        booking.additional_attributes &&
        booking.additional_attributes.society_details ? (
          <td>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('society_details')}
            >
              {booking.additional_attributes.society_details[0]
                ? booking.additional_attributes.society_details[0].value
                : 'Society Details'}
            </button>
          </td>
        ) : null}
        {booking &&
        booking.additional_attributes &&
        booking.additional_attributes.location_details ? (
          <td>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('location_details')}
            >
              {booking.additional_attributes.location_details[2].value &&
              booking.additional_attributes.location_details[4].value
                ? booking.additional_attributes.location_details[2].value
                : 'Location Details'}
            </button>
          </td>
        ) : null}

        {booking &&
        booking.additional_attributes &&
        booking.additional_attributes.contact_details ? (
          <td>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('contact_details')}
            >
              {booking.additional_attributes.contact_details[3].value
                ? booking.additional_attributes.contact_details[3].value
                : 'Contact Details'}
            </button>
          </td>
        ) : null}

        {booking && booking.additional_attributes && booking.additional_attributes.bank_details ? (
          <td>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onFillAdditionalAttributeModalClick('contact_details')}
            >
              {booking.additional_attributes.bank_details[2].value
                ? booking.additional_attributes.contact_details[2].value
                : 'Bank Details'}
            </button>
          </td>
        ) : null}

        <td>
          <button type="button" className="btn btn--danger" onClick={() => onComments('INTERNAL')}>
            Internal Comments
          </button>
        </td>
        <td>
          <button type="button" className="btn btn--danger" onClick={() => onComments('EXTERNAL')}>
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
      commentType,
    } = this.state;
    const { booking } = this.props;
    const { bookingList } = booking;
    const list = this.getFilteredList(bookingList);
    console.log(list);

    let attributes = [];
    let campaignName = '';
    const { campaign } = this.props;
    let campaignId = this.getCampaignId();
    if (campaign && campaign.objectById && campaign.objectById[campaignId]) {
      campaignName = campaign.objectById[campaignId].campaign.name;
    }

    if (list && list.length) {
      attributes = list[0].supplier_attributes.concat(list[0].booking_attributes);
    }

    // const list = this.sort(attribute, attrType);
    console.log(campaignName);

    return (
      <div className="booking__list list">
        <div className="list__title">
          <h3>
            {' '}
            Booking - Plan(
            {campaignName})
          </h3>
        </div>
        <button type="button" className="btn btn--danger" onClick={this.onBack}>
          <i className="fa fa-arrow-left" aria-hidden="true" />
          &nbsp; Back
        </button>
        <br />
        <br />

        <div className="list-search">
          <div className="form-control">
            <Select
              options={optionTypes}
              className="select"
              value={this.selectedOption}
              onChange={this.onOptionTypeChange}
              defaultValue={optionTypes[0]}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search..."
              value={searchFilter}
              onChange={this.onSearchFilterChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                {attributes.map((attribute) => (
                  <th onClick={() => this.sort(attribute, 'supplier_attributes', list)}>
                    {attribute.name}
                  </th>
                ))}

                {list && list[0] && list[0].additional_attributes ? (
                  Object.keys(list[0].additional_attributes).indexOf('society_details') > -1 ? (
                    <th>Society Details</th>
                  ) : null
                ) : null}

                {list && list[0] && list[0].additional_attributes ? (
                  Object.keys(list[0].additional_attributes).indexOf('location_details') > -1 ? (
                    <th>Location</th>
                  ) : null
                ) : null}

                {list && list[0] && list[0].additional_attributes ? (
                  Object.keys(list[0].additional_attributes).indexOf('contact_details') > -1 ? (
                    <th>Contact Details</th>
                  ) : null
                ) : null}

                {list && list[0] && list[0].additional_attributes ? (
                  Object.keys(list[0].additional_attributes).indexOf('bank_details') > -1 ? (
                    <th>Bank Details</th>
                  ) : null
                ) : null}

                <th>Comments</th>
                <th>Comments</th>
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
            commentType={commentType}
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
