import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import mapSort from 'mapsort';

import CommentsModal from './../Modals/CommentsModal';
import PhaseModal from './../Modals/PhaseModal';
import ViewHashtagImagesModal from '../Modals/ViewHashtagImagesModal';
import FillAdditionalAttributeModal from './../Modals/AdditionalAttributesModal';

let optionTypes = [
  { value: 'supplier', label: 'Supplier' },
  { value: 'area', label: 'Area' },
  { value: 'subarea', label: 'SubArea' },
];

let dropdownOptions = {};

const getOption = (value) => {
  for (let i = 0, l = optionTypes.length; i < l; i += 1) {
    if (optionTypes[i] === value) {
      return optionTypes[i];
    }
  }

  return { value };
};

const getSorterByOrder = (order) => {
  if (order === 'asc') {
    return (a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }

      return 0;
    };
  }

  return (a, b) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }

    return 0;
  };
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
      selectedOption: optionTypes[0].value,
      selectedDropdownOption: '',
      isSearchInputVisible: true,
      sortOptions: {
        column: 'supplier',
        order: 'asc',
      },
      filterOptionTypes: [],
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
    this.onDropDownOptionTypeChange = this.onDropDownOptionTypeChange.bind(this);
    this.setOptionTypes = this.setOptionTypes.bind(this);
    this.getFilterOptions = this.getFilterOptions.bind(this);
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

  getFilterOptions() {
    return optionTypes;
  }
  setOptionTypes(attributes) {
    attributes.forEach((element) => {
      if (element.type === 'DROPDOWN') {
        optionTypes.push({
          label: element.name,
          value: element.name,
        });
        dropdownOptions[element.name] = [];
        element.options.forEach((option) => {
          dropdownOptions[element.name].push({
            label: option,
            value: option,
          });
        });
      }
    });

    this.setState({
      filterOptionTypes: optionTypes,
    });
  }

  getFilteredList(list) {
    if (this.state.searchFilter && this.state.selectedOption) {
      let result = [];
      let attribute = this.state.selectedOption;

      switch (attribute) {
        case 'supplier':
          list.forEach((element) => {
            if (
              element.supplier_name.toLowerCase().includes(this.state.searchFilter.toLowerCase())
            ) {
              result.push(element);
            }
          });
          break;

        case 'area':
          list.forEach((element) => {
            let flag = true;
            if (element.additional_attributes.hasOwnProperty('location_details')) {
              if (
                element.additional_attributes.location_details[2].value
                  .toLowerCase()
                  .includes(this.state.searchFilter.toLowerCase())
              ) {
                result.push(element);
              }
            }
          });
          break;

        case 'subarea':
          list.forEach((element) => {
            let flag = true;
            if (element.additional_attributes.hasOwnProperty('location_details')) {
              if (
                element.additional_attributes.location_details[3].value
                  .toLowerCase()
                  .includes(this.state.searchFilter.toLowerCase())
              ) {
                result.push(element);
              }
            }
          });
          break;
        default:
          return list;
          break;
      }
      return result;
    } else if (this.state.selectedDropdownOption) {
      let result = [];
      let attributes = list[0].supplier_attributes.concat(list[0].booking_attributes);
      let items = [];

      attributes.forEach((element) => {
        items.push(element.name);
      });

      let index = items.indexOf(this.state.selectedOption);
      list.forEach((element) => {
        let attributes = element.supplier_attributes.concat(element.booking_attributes);

        if (
          attributes[index].hasOwnProperty('value') &&
          attributes[index].value === this.state.selectedDropdownOption
        ) {
          result.push(element);
        }
      });
      return result;
    }

    return list;
  }

  getSortedList = (list) => {
    const { sortOptions } = this.state;
    console.log('sortOptions: ', sortOptions);
    const newList = [...list];

    switch (sortOptions.column) {
      case 'supplier':
        return mapSort(
          newList,
          (element) => element.supplier_name.toLowerCase(),
          getSorterByOrder(sortOptions.order)
        );

      case 'flat_count':
        return mapSort(
          newList,
          (element) => {
            if (
              element.additional_attributes &&
              element.additional_attributes.society_details &&
              element.additional_attributes.society_details[0]
            ) {
              return element.additional_attributes.society_details[0].value;
            }

            return 0;
          },
          getSorterByOrder(sortOptions.order)
        );

      case 'area':
        return mapSort(
          newList,
          (element) => {
            if (
              element.additional_attributes &&
              element.additional_attributes.location_details &&
              element.additional_attributes.location_details[2]
            ) {
              return element.additional_attributes.location_details[2].value;
            }

            return '';
          },
          getSorterByOrder(sortOptions.order)
        );

      default:
        const bookingAttributes =
          newList && newList[0] ? newList[0].booking_attributes.map((attr) => attr.name) : [];
        const bookingAttributesMatchIndex = bookingAttributes.indexOf(sortOptions.column);
        if (bookingAttributesMatchIndex !== -1) {
          return mapSort(
            newList,
            (element) => {
              if (
                element.booking_attributes &&
                element.booking_attributes[bookingAttributesMatchIndex]
              ) {
                return element.booking_attributes[bookingAttributesMatchIndex].value;
              }

              return '';
            },
            getSorterByOrder(sortOptions.order)
          );
        }

        const supplierAttributes =
          newList && newList[0] ? newList[0].supplier_attributes.map((attr) => attr.name) : [];
        const supplierAttributesMatchIndex = supplierAttributes.indexOf(sortOptions.column);
        if (supplierAttributesMatchIndex !== -1) {
          return mapSort(
            newList,
            (element) => {
              if (
                element.supplier_attributes &&
                element.supplier_attributes[supplierAttributesMatchIndex]
              ) {
                return element.supplier_attributes[supplierAttributesMatchIndex].value;
              }

              return '';
            },
            getSorterByOrder(sortOptions.order)
          );
        }

        return newList;
    }
  };

  onOptionTypeChange(option) {
    if (dropdownOptions.hasOwnProperty(option.label)) {
      this.setState({
        selectedOption: option.value,
        isSearchInputVisible: false,
        selectedDropdownOption: undefined,
      });
    } else {
      this.setState({
        selectedOption: option.value,
        isSearchInputVisible: true,
        selectedDropdownOption: undefined,
      });
    }
  }

  onDropDownOptionTypeChange(option) {
    this.setState({
      selectedDropdownOption: option.value,
      searchFilter: undefined,
    });
  }

  setSortOrder = (column) => {
    this.setState((prevState) => {
      let order = 'asc';

      // If sorting on same column as before, just swap the sort order
      if (prevState.sortOptions.column === column) {
        order = prevState.sortOptions.order === 'asc' ? 'desc' : 'asc';
      }

      return {
        sortOptions: {
          column,
          order,
        },
      };
    });
  };

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
        <td>{booking.supplier_name}</td>
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
              {booking.additional_attributes.location_details[3].value
                ? booking.additional_attributes.location_details[3].value
                : ''}
              ,
              {booking.additional_attributes.location_details[2].value
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
              onClick={() => onFillAdditionalAttributeModalClick('bank_details')}
            >
              {booking.additional_attributes.bank_details[2].value
                ? booking.additional_attributes.bank_details[2].value
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

  renderSortIcon = (column) => {
    const { sortOptions } = this.state;
    if (column !== sortOptions.column) return null;

    return (
      <i
        className={classnames('fa', 'sort', {
          'fa-sort-asc': sortOptions.order === 'asc',
          'fa-sort-desc': sortOptions.order === 'desc',
        })}
      />
    );
  };

  render() {
    const {
      searchFilter,
      selectedBooking,
      isCommentsModalVisible,
      isPhaseModalVisible,
      isViewHashtagImagesModalVisible,
      commentType,
      isSearchInputVisible,
      selectedOption,
      filterOptionTypes,
    } = this.state;
    const { booking } = this.props;
    const { bookingList } = booking;
    let list = this.getFilteredList(bookingList);
    list = this.getSortedList(list);

    let attributes = [];
    let campaignName = '';
    const { campaign } = this.props;
    let campaignId = this.getCampaignId();
    if (campaign && campaign.objectById && campaign.objectById[campaignId]) {
      campaignName = campaign.objectById[campaignId].campaign.name;
    }

    if (list && list.length) {
      attributes = list[0].supplier_attributes.concat(list[0].booking_attributes);
      if (optionTypes.length < 4) {
        this.setOptionTypes(attributes);
      }
    }
    let dropdownOptionsTypes = dropdownOptions;

    return (
      <div className="booking__list list">
        <div className="list__title">
          <h3>Booking - Plan ({campaignName})</h3>
        </div>
        <button type="button" className="btn btn--danger" onClick={this.onBack}>
          <i className="fa fa-arrow-left" aria-hidden="true" />
          &nbsp; Back
        </button>
        <br />
        <br />

        <div className="list__filter">
          <div>
            <Select
              options={filterOptionTypes}
              className="select"
              value={this.selectedOption}
              onChange={this.onOptionTypeChange}
              defaultValue={optionTypes[0]}
            />
          </div>
          <div>
            {isSearchInputVisible ? (
              <input
                type="text"
                placeholder="Search..."
                value={searchFilter}
                onChange={this.onSearchFilterChange}
              />
            ) : (
              <Select
                options={dropdownOptionsTypes[selectedOption]}
                className="select"
                value={this.selectedDropdownOption}
                onChange={this.onDropDownOptionTypeChange}
              />
            )}
          </div>
        </div>

        <div className="list__table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th onClick={() => this.setSortOrder('supplier')}>
                  Supplier Name
                  {this.renderSortIcon('supplier')}
                </th>
                {attributes.map((attribute) => (
                  <th onClick={() => this.setSortOrder(attribute.name)}>
                    {attribute.name}
                    {this.renderSortIcon(attribute.name)}
                  </th>
                ))}

                {list && list[0] && list[0].additional_attributes ? (
                  Object.keys(list[0].additional_attributes).indexOf('society_details') > -1 ? (
                    <th onClick={() => this.setSortOrder('flat_count')}>
                      Society Details
                      {this.renderSortIcon('flat_count')}
                    </th>
                  ) : null
                ) : null}

                {list && list[0] && list[0].additional_attributes ? (
                  Object.keys(list[0].additional_attributes).indexOf('location_details') > -1 ? (
                    <th onClick={() => this.setSortOrder('area')}>
                      Location
                      {this.renderSortIcon('area')}
                    </th>
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
