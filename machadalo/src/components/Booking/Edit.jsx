import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

const getFilteredEntityList = (list, entityTypeId) => {
  if (entityTypeId) {
    return list.filter(entity => entity.entity_type_id === entityTypeId);
  } else {
    return list;
  }
};

export default class EditBooking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      bookingTemplateId: '',
      bookingTemplate: {},
      entity: {},
      entityTypeId: '',
      attributes: []
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.onBookingTemplateChange = this.onBookingTemplateChange.bind(this);
    this.onEntityChange = this.onEntityChange.bind(this);
    this.renderBookingAttributeRow = this.renderBookingAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getBookingTemplateList();
    this.props.getEntityList();
  }

  componentDidUpdate(prevProps) {
    const { booking: prevBooking } = prevProps;
    const { booking: newBooking, history } = this.props;
    const { isUpdatingBooking: prevIsUpdatingBooking } = prevBooking;
    const {
      postBookingSuccess,
      postBookingError,
      isUpdatingBooking: newIsUpdatingBooking
    } = newBooking;

    if (prevIsUpdatingBooking && !newIsUpdatingBooking && postBookingSuccess) {
      toastr.success('', 'Booking updated successfully');
      history.push(`/r/booking/campaigns`);
    } else if (
      prevIsUpdatingBooking &&
      !newIsUpdatingBooking &&
      postBookingError
    ) {
      toastr.error('', 'Failed to update  Booking. Please try again later.');
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
      entityTypeId: template.entity_type_id
    });
  }

  onEntityChange(entity) {
    this.setState({
      entity: entity
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = [...this.state.attributes];

    attributes[index] = attribute;

    this.setState({
      attributes
    });
  }

  onSubmit() {
    const {
      bookingTemplateId,
      bookingTemplate,
      entity,
      attributes
    } = this.state;

    const { match } = this.props;

    const data = {
      booking_template_id: bookingTemplateId,
      entity_id: entity.id,
      campaign_id: match.params.campaignId,
      organisation_id: bookingTemplate.organisation_id,
      booking_attributes: attributes
    };

    this.props.postBooking({ data });
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
    }

    return (
      <div className={classnames('entity')} key={index}>
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

  render() {
    const { errors, bookingTemplate } = this.state;
    const { booking, entity } = this.props;
    const { entityList } = entity;
    const { bookingTemplateList } = booking;
    const { booking_attributes } = bookingTemplate;
    const filterEntityList = getFilteredEntityList(
      entityList,
      this.state.entityTypeId
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

              {booking_attributes && booking_attributes.length ? (
                <div className="entity entity__header">
                  <div className="form-control">&nbsp;</div>
                  <div className="form-control">
                    <h4>Field</h4>
                  </div>

                  <div className="form-control">
                    <h4>Type</h4>
                  </div>
                </div>
              ) : null}

              {booking_attributes && booking_attributes.length
                ? booking_attributes.map(this.renderBookingAttributeRow)
                : null}
            </div>

            <div className="create__form__header">Select Entity</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.entity
                  })}
                  options={filterEntityList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={this.state.entity}
                  onChange={this.onEntityChange}
                />
                {errors.entity ? (
                  <p className="message message--error">
                    {errors.entity.message}
                  </p>
                ) : null}
              </div>
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
