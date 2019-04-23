import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

const getFilteredSupplierList = (list, SupplierId) => {
  if (SupplierId) {
    return list.filter(Supplier => Supplier.Supplier_type_id === SupplierId);
  } else {
    return list;
  }
};

const getInventoryAttributes = Supplier => {
  if (
    Supplier &&
    Supplier.Supplier_attributes &&
    Supplier.Supplier_attributes.length
  ) {
    return Supplier.Supplier_attributes.filter(
      item => item.type === 'INVENTORY'
    ).map(item => ({ ...item.value, count: 1 }));
  }

  return [];
};

export default class EditBooking extends React.Component {
  constructor(props) {
    super(props);

    const bookingId = this.getBookingId();
    const booking = this.getBookingById({
      id: bookingId
    });

    let attributes = [];
    let bookingTemplate = {};
    let Supplier = {};
    let inventories = [];
    if (bookingId && booking && booking.id) {
      attributes = booking.booking_attributes;
      bookingTemplate = this.getBookingTemplateById({
        id: booking.booking_template_id
      });
      Supplier = this.getSupplierById({ id: booking.Supplier_id });
      inventories = getInventoryAttributes(Supplier);
    }

    this.state = {
      isEditMode: !!bookingId,
      bookingId,
      errors: {},
      bookingTemplateId: booking.booking_template_id,
      bookingTemplate,
      Supplier,
      SupplierId: booking.Supplier_id,
      attributes,
      inventories
    };

    this.onBookingTemplateChange = this.onBookingTemplateChange.bind(this);
    this.onSupplierChange = this.onSupplierChange.bind(this);
    this.renderBookingAttributeRow = this.renderBookingAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.renderInventoryRow = this.renderInventoryRow.bind(this);
    this.handleInventoryChange = this.handleInventoryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getBookingTemplateList();
    this.props.getSupplierList();
    this.props.getBookingList({ campaignId: this.getCampaignId() });
  }

  componentDidUpdate(prevProps) {
    const { booking: prevBooking, Supplier: prevSupplier } = prevProps;
    const { booking: newBooking, Supplier: newSupplier, history } = this.props;

    if (
      prevBooking.isCreatingBooking &&
      !newBooking.isCreatingBooking &&
      newBooking.postBookingSuccess
    ) {
      toastr.success('', 'Booking created successfully');
      history.push(`/r/booking/list/${this.getCampaignId()}`);
    } else if (
      prevBooking.isCreatingBooking &&
      !newBooking.isCreatingBooking &&
      newBooking.putBookingError
    ) {
      toastr.error('', 'Failed to create booking. Please try again later.');
    } else if (
      prevBooking.isUpdatingBooking &&
      !newBooking.isUpdatingBooking &&
      newBooking.putBookingSuccess
    ) {
      toastr.success('', 'Booking updated successfully');
      history.push(`/r/booking/list/${this.getCampaignId()}`);
    } else if (
      prevBooking.isUpdatingBooking &&
      !newBooking.isUpdatingBooking &&
      newBooking.putBookingError
    ) {
      toastr.error('', 'Failed to update Booking. Please try again later.');
    }

    if (
      (prevBooking.isFetchingBookingTemplate &&
        !newBooking.isFetchingBookingTemplate) ||
      (prevSupplier.isFetchingSupplierList &&
        !newSupplier.isFetchingSupplierList) ||
      (prevBooking.isFetchingBooking && !newBooking.isFetchingBooking)
    ) {
      const bookingId = this.getBookingId();
      const booking = this.getBookingById({
        id: bookingId
      });

      let attributes = [];
      let bookingTemplate = {};
      let Supplier = {};
      let inventories = [];
      if (bookingId && booking && booking.id) {
        attributes = booking.booking_attributes;
        bookingTemplate = this.getBookingTemplateById({
          id: booking.booking_template_id
        });
        Supplier = this.getSupplierById({ id: booking.Supplier_id });
        inventories = getInventoryAttributes(Supplier);
      }

      this.setState({
        isEditMode: !!bookingId,
        bookingId,
        bookingTemplateId: booking.booking_template_id,
        bookingTemplate,
        Supplier,
        SupplierId: booking.Supplier_id,
        attributes,
        inventories
      });
    }
  }

  // handleInputChange(name) {
  //   this.setState({
  //     name
  //   });
  // }

  onBookingTemplateChange(template) {
    this.setState({
      bookingTemplate: template,
      bookingTemplateId: template.id,
      SupplierId: template.Supplier_type_id,
      attributes: template.booking_attributes
    });
  }

  onSupplierChange(Supplier) {
    this.setState({
      Supplier: Supplier,
      inventories: getInventoryAttributes(Supplier)
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = [...this.state.attributes];

    attributes[index] = attribute;

    this.setState({
      attributes
    });
  }

  handleInventoryChange(inventory, index) {
    const inventories = [...this.state.inventories];

    inventories[index] = inventory;

    this.setState({
      inventories
    });
  }

  onSubmit() {
    const {
      bookingTemplateId,
      bookingTemplate,
      Supplier,
      attributes,
      isEditMode,
      bookingId,
      inventories
    } = this.state;
    const { postBooking, putBooking } = this.props;

    const data = {
      booking_template_id: bookingTemplateId,
      Supplier_id: Supplier.id,
      campaign_id: this.getCampaignId(),
      organisation_id: bookingTemplate.organisation_id,
      booking_attributes: attributes,
      booking_data: inventories
    };

    if (isEditMode) {
      putBooking({ id: bookingId, data });
    } else {
      postBooking({ data });
    }
  }

  getCampaignId() {
    const { match } = this.props;
    return match.params.campaignId;
  }

  getBookingId() {
    const { match } = this.props;
    return match.params.bookingId;
  }

  getBookingById({ id }) {
    const { booking } = this.props;
    const { bookingList } = booking;

    for (let i = 0, l = bookingList.length; i < l; i += 1) {
      if (bookingList[i].id === id) {
        return bookingList[i];
      }
    }

    return {};
  }

  getBookingTemplateById({ id }) {
    const { booking } = this.props;
    const { bookingTemplateList } = booking;

    for (let i = 0, l = bookingTemplateList.length; i < l; i += 1) {
      if (bookingTemplateList[i].id === id) {
        return bookingTemplateList[i];
      }
    }

    return {};
  }

  getSupplierById({ id }) {
    const { Supplier } = this.props;
    const { SupplierList } = Supplier;

    for (let i = 0, l = SupplierList.length; i < l; i += 1) {
      if (SupplierList[i].id === id) {
        return SupplierList[i];
      }
    }

    return {};
  }

  renderBookingAttributeRow(attribute, index) {
    const handleAttributeInputChange = event => {
      const newAttribute = { ...attribute };

      if (
        newAttribute.type === 'DROPDOWN' ||
        newAttribute.type === 'MULTISELECT'
      ) {
        newAttribute.value = event.value;
      } else {
        newAttribute.value = event.target.value;
      }

      this.handleAttributeChange(newAttribute, index);
    };

    let typeInput = null;

    switch (attribute.type) {
      case 'FLOAT':
        typeInput = (
          <input
            type="number"
            onChange={handleAttributeInputChange}
            value={attribute.value}
          />
        );
        break;

      case 'STRING':
        typeInput = (
          <input
            type="text"
            onChange={handleAttributeInputChange}
            value={attribute.value}
          />
        );
        break;

      case 'DROPDOWN':
        typeInput = (
          <Select
            className={classnames('select')}
            options={attribute.options.map(option => ({
              label: option,
              value: option
            }))}
            getOptionValue={option => option.label}
            getOptionLabel={option => option.value}
            onChange={handleAttributeInputChange}
            value={attribute.value}
          />
        );
        break;

      case 'EMAIL':
        typeInput = (
          <input
            type="email"
            onChange={handleAttributeInputChange}
            value={attribute.value}
          />
        );
        break;

      case 'MULTISELECT':
        typeInput = (
          <Select
            className={classnames('select')}
            options={attribute.options}
            getOptionValue={option => option}
            getOptionLabel={option => option}
            onChange={handleAttributeInputChange}
            value={attribute.value}
          />
        );
        break;

      default:
        console.log('Unsupported attribute type');
        break;
    }

    return (
      <div className="Supplier" key={index}>
        <div className="form-control">&nbsp;</div>
        <div className="form-control">
          <p>
            {attribute.name}
            {attribute.is_required ? (
              <span style={{ color: '#e2402e' }}>*</span>
            ) : null}
          </p>
        </div>

        <div className="form-control">{typeInput}</div>
      </div>
    );
  }

  renderInventoryRow(inventory, index) {
    const onCountChange = event => {
      if (
        event.target.value &&
        !isNaN(+event.target.value) &&
        +event.target.value >= 0
      ) {
        const newInventory = { ...inventory, count: +event.target.value };

        this.handleInventoryChange(newInventory, index);
      }
    };

    return (
      <div className="Supplier" key={index}>
        <div className="form-control">&nbsp;</div>
        <div className="form-control">
          <p>{inventory.label}</p>
        </div>

        <div className="form-control">
          <input
            type="number"
            onChange={onCountChange}
            value={inventory.count}
          />
        </div>
      </div>
    );
  }

  render() {
    const { errors, attributes, inventories } = this.state;
    const { booking, Supplier } = this.props;
    const { SupplierList } = Supplier;
    const { bookingTemplateList } = booking;
    const filterSupplierList = getFilteredSupplierList(
      SupplierList,
      this.state.SupplierId
    );

    return (
      <div className="booking-base__create create">
        <div className="create__title">
          <h3>Booking - Edit</h3>
        </div>

        <div className="create__form">
          <form onSubmit={this.onSubmit}>
            <div className="create__form__body">
              {/*<div className="form-control form-control--column">
                <label>*Enter Name For Booking</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  className={classnames({ error: errors.name })}
                />
                {errors.name ? (
                  <p className="message message--error">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>*/}
            </div>

            <div className="create__form__header">Select Booking Template</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.bookingTemplateId
                  })}
                  options={bookingTemplateList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={this.state.bookingTemplate}
                  onChange={this.onBookingTemplateChange}
                />
                {errors.bookingTemplateId ? (
                  <p className="message message--error">
                    {errors.bookingTemplateId.message}
                  </p>
                ) : null}
              </div>

              {attributes && attributes.length ? (
                <div className="Supplier Supplier__header">
                  <div className="form-control">&nbsp;</div>
                  <div className="form-control">
                    <h4>Field</h4>
                  </div>

                  <div className="form-control">
                    <h4>Type</h4>
                  </div>
                </div>
              ) : null}

              {attributes && attributes.length
                ? attributes.map(this.renderBookingAttributeRow)
                : null}
            </div>

            <div className="create__form__header">Select Supplier</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.Supplier
                  })}
                  options={filterSupplierList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={this.state.Supplier}
                  onChange={this.onSupplierChange}
                />
                {errors.Supplier ? (
                  <p className="message message--error">
                    {errors.Supplier.message}
                  </p>
                ) : null}
              </div>

              {inventories && inventories.length ? (
                <div className="Supplier Supplier__header">
                  <div className="form-control">&nbsp;</div>
                  <div className="form-control">
                    <h4>Inventory</h4>
                  </div>

                  <div className="form-control">
                    <h4>Count</h4>
                  </div>
                </div>
              ) : null}

              {inventories && inventories.length
                ? inventories.map(this.renderInventoryRow)
                : null}
            </div>
          </form>
        </div>

        <div className="create__actions">
          <button
            type="button"
            className="btn btn--danger"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
