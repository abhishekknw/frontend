import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import OptionModal from './../../Modals/OptionModal';
import { toastr } from 'react-redux-toastr';

const optionStyle = {
  fontSize: '12px',
  margin: '0',
  position: 'absolute',
  bottom: '-20px',
  textDecoration: 'underline',
  cursor: 'pointer',
  paddingBottom: '10px'
};

const AttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'MULTISELECT', label: 'Multi Select' }
];

// TODO: Move to constants
const BaseBookingAttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'MULTISELECT', label: 'Multi Select' }
];

// TODO: Move to constants
const EntityTypeAttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'INVENTORY', label: 'Inventory' },
  { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'ENTITY_TYPE', label: 'Entity Type' },
  { value: 'BASE_ENTITY_TYPE', label: 'Base Entity Type' }
];

// Get attribute type option from string
const getAttributeTypeOption = value => {
  for (let i = 0, l = AttributeTypes.length; i < l; i += 1) {
    if (AttributeTypes[i].value === value) {
      return AttributeTypes[i];
    }
  }

  return { value };
};

// Get base booking attribute option from base booking attribute
const getBaseBookingAttributeOption = value => {
  for (let i = 0, l = BaseBookingAttributeTypes.length; i < l; i += 1) {
    if (BaseBookingAttributeTypes[i].value === value) {
      return BaseBookingAttributeTypes[i];
    }
  }

  return { value };
};

// Get entity type attribute option from entity type
const getEntityTypeAttributeOption = value => {
  for (let i = 0, l = EntityTypeAttributeTypes.length; i < l; i += 1) {
    if (EntityTypeAttributeTypes[i].value === value) {
      return EntityTypeAttributeTypes[i];
    }
  }

  return { value };
};

// Get a new raw attribute
const getRawAttribute = () => {
  return {
    name: '',
    type: 'STRING',
    is_required: false
  };
};

const getOptionFromList = (list, id) => {
  for (let i = 0, l = list.length; i < l; i += 1) {
    if (id === list[i].id) {
      return list[i];
    }
  }

  return { id };
};

const validate = data => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = {
      message: 'Please enter a name for booking template'
    };
  }

  if (!data.base_booking_template_id) {
    errors.baseBookingId = {
      message: 'Please select a base booking template'
    };
  }

  if (!data.entity_type_id) {
    errors.entityTypeId = {
      message: 'Please select an entity type'
    };
  }

  return errors;
};

export default class CreateBookingTemplate extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    const { params } = match;
    const { bookingTemplateId } = params;
    const bookingTemplate = this.getBookingTemplateById({
      id: bookingTemplateId
    });
    let attributes = [
      {
        ...getRawAttribute()
      }
    ];

    if (bookingTemplateId && bookingTemplate && bookingTemplate.id) {
      // Find the booking template matching `bookingTemplateId`
      attributes = bookingTemplate.booking_attributes;
    }

    this.state = {
      isEditMode: !!bookingTemplateId,
      bookingTemplateId,
      name: bookingTemplate.name || '',
      attributes,
      baseBookingAttributes: [],
      baseBookingId: null,
      selectedBaseBooking: null,
      selectedEntityAttributes: [],
      entityTypeId: bookingTemplate.entity_type_id,
      selectedEntityType: null,
      errors: {},
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {}
    };

    this.onAddAttributeClick = this.onAddAttributeClick.bind(this);
    this.onBaseBookingChange = this.onBaseBookingChange.bind(this);
    this.onEntityTypeChange = this.onEntityTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleBaseBookingAttributeChange = this.handleBaseBookingAttributeChange.bind(
      this
    );
    this.handleEntityTypeAttributeChange = this.handleEntityTypeAttributeChange.bind(
      this
    );
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.renderBaseBookingAttributeRow = this.renderBaseBookingAttributeRow.bind(
      this
    );
    this.renderEntityTypeAttributeRow = this.renderEntityTypeAttributeRow.bind(
      this
    );
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
  }

  componentDidMount() {
    this.props.getBaseBookingList();
    this.props.getEntityTypeList();
  }

  componentDidUpdate(prevProps) {
    const { booking: prevBooking } = prevProps;
    const { booking: newBooking, history } = this.props;
    const {
      isCreatingBookingTemplate: prevIsCreatingBookingTemplate,
      isUpdatingBookingTemplate: prevIsUpdatingBookingTemplate
    } = prevBooking;
    const {
      isCreatingBookingTemplate: newIsCreatingBookingTemplate,
      postBookingTemplateSuccess,
      postBookingTemplateError,
      isUpdatingBookingTemplate: newIsUpdatingBookingTemplate,
      putBookingTemplateSuccess,
      putBookingTemplateError
    } = newBooking;

    if (
      prevIsCreatingBookingTemplate &&
      !newIsCreatingBookingTemplate &&
      postBookingTemplateSuccess
    ) {
      toastr.success('', 'Booking Template created successfully');
      history.push(`/r/booking/template/list`);
    } else if (
      prevIsCreatingBookingTemplate &&
      !newIsCreatingBookingTemplate &&
      postBookingTemplateError
    ) {
      toastr.error(
        '',
        'Failed to create Booking Template. Please try again later.'
      );
    }

    if (
      prevIsUpdatingBookingTemplate &&
      !newIsUpdatingBookingTemplate &&
      putBookingTemplateSuccess
    ) {
      toastr.success('', 'Booking Template updated successfully');
      history.push(`/r/booking/template/list`);
    } else if (
      prevIsUpdatingBookingTemplate &&
      !newIsUpdatingBookingTemplate &&
      putBookingTemplateError
    ) {
      toastr.error(
        '',
        'Failed to update Booking Template. Please try again later.'
      );
    }
  }

  onAddAttributeClick() {
    const attributes = [...this.state.attributes];

    attributes.push({
      ...getRawAttribute()
    });

    this.setState({
      attributes
    });
  }

  onBaseBookingChange(option) {
    const { errors } = this.state;

    if (errors.baseBookingId && option.id) {
      delete errors.baseBookingId;
    }

    this.setState({
      baseBookingId: option.id,
      selectedBaseBooking: { ...option },
      baseBookingAttributes: option.booking_attributes.map(item => ({
        ...item,
        selected: true,
        allowRequired: item.is_required
      })),
      entityTypeId: null,
      selectedEntityType: null,
      selectedEntityAttributes: [],
      errors
    });
  }

  onEntityTypeChange(option) {
    const { selectedBaseBooking, errors } = this.state;

    if (errors.entityTypeId && option.id) {
      delete errors.entityTypeId;
    }

    const requiredBaseBookingEntityAttriutesMap = {};
    if (selectedBaseBooking && selectedBaseBooking.id) {
      for (
        let i = 0, l = selectedBaseBooking.entity_attributes.length;
        i < l;
        i += 1
      ) {
        if (selectedBaseBooking.entity_attributes[i].is_required) {
          requiredBaseBookingEntityAttriutesMap[
            selectedBaseBooking.entity_attributes[i].name
          ] = selectedBaseBooking.entity_attributes[i];
        }
      }
    }

    this.setState({
      entityTypeId: option.id,
      selectedEntityType: { ...option },

      selectedEntityAttributes: option.entity_attributes.map(item => ({
        ...item,
        selected: true,
        // Disable attribute unselect, if an attribute is marked as required in booking template
        disabled: !!requiredBaseBookingEntityAttriutesMap[item.name],
        allowRequired: item.is_required
      })),
      errors
    });
  }

  onOpenOptionModal(options, attributeType, attribute, attrIndex) {
    this.setState({
      optionModalVisibility: true,
      columnOptions: options,
      attributeInfo: {
        attributeType,
        attribute,
        attrIndex
      }
    });
  }

  onCancelOptionModal() {
    this.setState({
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {}
    });
  }

  onSubmitOptionModal(options, attributeInfo) {
    const attributes = [...this.state.attributes];

    attributes[attributeInfo.attrIndex] = {
      ...attributes[attributeInfo.attrIndex],
      options
    };

    this.setState({
      attributes,
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {}
    });
  }

  onSubmit() {
    // Submit form data
    const {
      name,
      attributes,
      baseBookingId,
      baseBookingAttributes,
      entityTypeId,
      selectedEntityAttributes,
      isEditMode,
      bookingTemplateId
    } = this.state;
    const { postBookingTemplate, putBookingTemplate } = this.props;

    const data = {
      name,
      base_booking_template_id: baseBookingId,
      booking_attributes: attributes.concat(
        baseBookingAttributes
          .filter(item => item.selected)
          .map(item => ({
            name: item.name,
            is_required: item.is_required,
            type: item.type
          }))
      ),
      entity_type_id: entityTypeId,
      entity_attributes: selectedEntityAttributes
        .filter(item => item.selected)
        .map(item => ({ name: item.name, is_required: item.is_required }))
    };

    const errors = validate(data);

    if (Object.keys(errors).length) {
      this.setState({
        errors
      });
    } else {
      if (isEditMode) {
        putBookingTemplate({ id: bookingTemplateId, data });
      } else {
        postBookingTemplate({ data });
      }
    }
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

  handleInputChange(event) {
    const { errors } = this.state;

    if (errors[event.target.name] && event.target.value) {
      delete errors[event.target.name];
    }

    this.setState({
      [event.target.name]: event.target.value,
      errors
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = [...this.state.attributes];

    attributes[index] = attribute;

    this.setState({
      attributes
    });
  }

  handleBaseBookingAttributeChange(attribute, index) {
    const baseBookingAttributes = [...this.state.baseBookingAttributes];

    baseBookingAttributes[index] = attribute;

    this.setState({
      baseBookingAttributes
    });
  }

  handleEntityTypeAttributeChange(entity, index) {
    const selectedEntityAttributes = [...this.state.selectedEntityAttributes];

    selectedEntityAttributes[index] = entity;

    this.setState({
      selectedEntityAttributes
    });
  }

  renderAttributeRow(attribute, index) {
    const onNameChange = event => {
      const newAttribute = { ...attribute };

      newAttribute.name = event.target.value;

      this.handleAttributeChange(newAttribute, index);
    };

    const onTypeChange = option => {
      const newAttribute = { ...attribute };

      newAttribute.type = option.value;

      this.setState(
        {
          optionModalVisibility:
            newAttribute.type === 'DROPDOWN' ||
            newAttribute.type === 'MULTISELECT',
          attributeInfo: {
            attributeType: newAttribute.type,
            attribute: newAttribute,
            attrIndex: index
          }
        },
        () => {
          this.handleAttributeChange(newAttribute, index);
        }
      );
    };

    const onRequiredChange = event => {
      const newAttribute = { ...attribute };

      newAttribute.is_required = !!event.target.checked;

      this.handleAttributeChange(newAttribute, index);
    };

    return (
      <div className="attribute" key={index}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Name"
            value={attribute.name}
            onChange={onNameChange}
          />
        </div>
        <div className="form-control">
          <Select
            className="select"
            options={AttributeTypes}
            value={getAttributeTypeOption(attribute.type)}
            onChange={onTypeChange}
          />
          {attribute.type === 'DROPDOWN' || attribute.type === 'MULTISELECT' ? (
            <p
              className="show-option"
              style={optionStyle}
              onClick={() =>
                this.onOpenOptionModal(
                  attribute.options,
                  attribute.type,
                  attribute,
                  index
                )
              }
            >
              Show Options
            </p>
          ) : null}
        </div>
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            id={`attr-${index}-is-required`}
            className="input-checkbox"
            checked={attribute.is_required}
            onChange={onRequiredChange}
          />
          <label htmlFor={`attr-${index}-is-required`}>Required</label>
        </div>
      </div>
    );
  }

  renderBaseBookingAttributeRow(attribute, index) {
    const onSelectChange = event => {
      const newAttribute = { ...attribute };

      newAttribute.selected = !!event.target.checked;

      this.handleBaseBookingAttributeChange(newAttribute, index);
    };

    const onRequiredChange = event => {
      const newAttribute = { ...attribute };

      newAttribute.is_required = !!event.target.checked;

      this.handleBaseBookingAttributeChange(newAttribute, index);
    };

    const attributeOption = getBaseBookingAttributeOption(attribute.type);

    return (
      <div
        className={classnames('static-attribute', {
          'static-attribute--unselect': !attribute.selected
        })}
        key={index}
      >
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={attribute.selected}
            onChange={onSelectChange}
          />
        </div>

        <div className="form-control">
          <p>{attribute.name}</p>
        </div>

        <div className="form-control">
          <p>{attributeOption.label}</p>
        </div>

        {attribute.allowRequired ? (
          <div className="form-control form-control--row-vertical-center">
            <input
              type="checkbox"
              id={`static-attribute-${index}-is-required`}
              className="input-checkbox"
              checked={attribute.is_required}
              onChange={onRequiredChange}
              disabled={!attribute.allowRequired}
            />
            <label htmlFor={`static-attribute-${index}-is-required`}>
              Required
            </label>
          </div>
        ) : (
          <div className="form-control form-control--row-vertical-center">
            <p>N/A</p>
          </div>
        )}
      </div>
    );
  }

  renderEntityTypeAttributeRow(entity, index) {
    const onSelectChange = event => {
      const newEntity = { ...entity };

      newEntity.selected = !!event.target.checked;

      this.handleEntityTypeAttributeChange(newEntity, index);
    };

    const onRequiredChange = event => {
      const newEntity = { ...entity };

      newEntity.is_required = !!event.target.checked;

      this.handleEntityTypeAttributeChange(newEntity, index);
    };

    const attributeOption = getEntityTypeAttributeOption(entity.type);

    return (
      <div
        className={classnames('static-attribute', {
          'static-attribute--unselect': !entity.selected
        })}
        key={index}
      >
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={entity.selected}
            onChange={onSelectChange}
            disabled={entity.disabled}
          />
        </div>

        <div className="form-control">
          <p>{entity.name}</p>
        </div>

        <div className="form-control">
          <p>{attributeOption.label}</p>
        </div>

        {entity.allowRequired ? (
          <div className="form-control form-control--row-vertical-center">
            <input
              type="checkbox"
              id={`static-attribute-${index}-is-required`}
              className="input-checkbox"
              checked={entity.is_required}
              onChange={onRequiredChange}
              disabled={!entity.allowRequired}
            />
            <label htmlFor={`static-attribute-${index}-is-required`}>
              Required
            </label>
          </div>
        ) : (
          <div className="form-control form-control--row-vertical-center">
            <p>N/A</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { booking, entityType } = this.props;
    const { baseBookingList } = booking;
    let { entityTypeList } = entityType;
    const {
      baseBookingAttributes,
      selectedBaseBooking,
      selectedEntityAttributes,
      errors
    } = this.state;

    // Filter entity types list, based on selected base entity type in base booking
    if (
      selectedBaseBooking &&
      selectedBaseBooking.id &&
      selectedBaseBooking.base_entity_type_id
    ) {
      entityTypeList = entityTypeList.filter(
        item =>
          item.base_entity_type_id === selectedBaseBooking.base_entity_type_id
      );
    }

    return (
      <div className="booking-template__create create">
        <div className="create__title">
          <h3>Booking Template - Create</h3>
        </div>

        <div className="create__form">
          <form onSubmit={this.onSubmit}>
            <div className="create__form__body">
              <div className="form-control form-control--column">
                <label>*Enter Name For Booking Template</label>
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
              </div>
            </div>

            <div className="create__form__header">Base Booking</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.baseBookingId
                  })}
                  placeholder="Select Base Booking"
                  options={baseBookingList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={getOptionFromList(
                    baseBookingList,
                    this.state.baseBookingId
                  )}
                  onChange={this.onBaseBookingChange}
                />
                {errors.baseBookingId ? (
                  <p className="message message--error">
                    {errors.baseBookingId.message}
                  </p>
                ) : null}
              </div>

              {baseBookingAttributes && baseBookingAttributes.length ? (
                <div className="static-attribute static-attribute__header">
                  <div className="form-control">&nbsp;</div>

                  <div className="form-control">
                    <h4>Field</h4>
                  </div>

                  <div className="form-control">
                    <h4>Type</h4>
                  </div>

                  <div className="form-control">
                    <h4>Required</h4>
                  </div>
                </div>
              ) : null}

              {baseBookingAttributes && baseBookingAttributes.length
                ? baseBookingAttributes.map(this.renderBaseBookingAttributeRow)
                : null}
            </div>

            <div className="create__form__header">Entity Type</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.entityTypeId
                  })}
                  placeholder="Select Entity Type"
                  options={entityTypeList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={getOptionFromList(
                    entityTypeList,
                    this.state.entityTypeId
                  )}
                  onChange={this.onEntityTypeChange}
                />
                {errors.entityTypeId ? (
                  <p className="message message--error">
                    {errors.entityTypeId.message}
                  </p>
                ) : null}
              </div>

              {selectedEntityAttributes && selectedEntityAttributes.length ? (
                <div className="static-attribute static-attribute__header">
                  <div className="form-control">&nbsp;</div>

                  <div className="form-control">
                    <h4>Field</h4>
                  </div>

                  <div className="form-control">
                    <h4>Type</h4>
                  </div>

                  <div className="form-control">
                    <h4>Required</h4>
                  </div>
                </div>
              ) : null}

              {selectedEntityAttributes && selectedEntityAttributes.length
                ? selectedEntityAttributes.map(
                    this.renderEntityTypeAttributeRow
                  )
                : null}
            </div>

            <div className="create__form__header">
              Booking Template Attributes
            </div>

            <div className="create__form__body">
              {this.state.attributes.map(this.renderAttributeRow)}
            </div>

            <div className="create__form__actions">
              <button
                type="button"
                className="btn btn--danger"
                onClick={this.onAddAttributeClick}
              >
                Add Attribute
              </button>
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
        <OptionModal
          showOptionModal={this.state.optionModalVisibility}
          onCancel={this.onCancelOptionModal}
          onSubmit={this.onSubmitOptionModal}
          options={this.state.columnOptions}
          columnInfo={this.state.attributeInfo}
        />
      </div>
    );
  }
}
