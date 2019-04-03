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

const EntityTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'INVENTORY', label: 'Inventory' },
  { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
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

// Get base entity type option from entity type
const getEntityTypeOption = value => {
  for (let i = 0, l = EntityTypes.length; i < l; i += 1) {
    if (EntityTypes[i].value === value) {
      return EntityTypes[i];
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

const getBaseEntityTypeOption = (baseEntityTypeList, baseEntityTypeId) => {
  for (let i = 0, l = baseEntityTypeList.length; i < l; i += 1) {
    if (baseEntityTypeId === baseEntityTypeList[i].id) {
      return baseEntityTypeList[i];
    }
  }

  return { id: baseEntityTypeId };
};

const validate = data => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = {
      message: 'Please enter a name for base booking'
    };
  }

  if (!data.base_entity_type_id) {
    errors.baseEntityTypeId = {
      message: 'Please select a base entity type'
    };
  }

  return errors;
};

export default class CreateBaseBooking extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;
    const { params } = match;
    const { baseBookingId } = params;
    const baseBooking = this.getBaseBookingById({ id: baseBookingId });
    let attributes = [
      {
        ...getRawAttribute()
      }
    ];
    let entities = [];

    if (baseBookingId && baseBooking && baseBooking.id) {
      // Find the base booking matching `baseBookingId`
      attributes = baseBooking.booking_attributes;
      entities = baseBooking.entity_attributes.map(item => ({
        ...item,
        selected: true,
        allowRequired: item.is_required
      }));
    }

    this.state = {
      isEditMode: !!baseBookingId,
      baseBookingId,
      name: baseBooking.name || '',
      attributes,
      entities,
      baseEntityTypeId: baseBooking.base_entity_type_id,
      selectedBaseEntityType: null,
      errors: {},
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {}
    };

    this.onAddAttributeClick = this.onAddAttributeClick.bind(this);
    this.onBaseEntityTypeChange = this.onBaseEntityTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleEntityChange = this.handleEntityChange.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.renderEntityRow = this.renderEntityRow.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
  }

  componentDidMount() {
    this.props.getBaseEntityTypeList();
  }

  componentDidUpdate(prevProps) {
    const {
      baseEntityType: prevBaseEntityType,
      booking: prevBooking
    } = prevProps;
    const {
      baseEntityType: newBaseEntityType,
      booking: newBooking,
      history
    } = this.props;
    const {
      isCreatingBaseBooking: prevIsCreatingBaseBooking,
      isUpdatingBaseBooking: prevIsUpdatingBaseBooking
    } = prevBooking;
    const {
      isCreatingBaseBooking: newIsCreatingBaseBooking,
      postBaseBookingSuccess,
      postBaseBookingError,
      isUpdatingBaseBooking: newIsUpdatingBaseBooking,
      putBaseBookingSuccess,
      putBaseBookingError
    } = newBooking;

    if (
      !this.state.selectedBaseEntityType &&
      !prevBaseEntityType.currentBaseEntityType &&
      newBaseEntityType.currentBaseEntityType
    ) {
      this.setState({
        selectedBaseEntityType: newBaseEntityType.currentBaseEntityType,
        entities: newBaseEntityType.currentBaseEntityType.entity_attributes.map(
          item => ({
            ...item,
            selected: true,
            allowRequired: item.is_required
          })
        )
      });
    }

    if (
      prevIsCreatingBaseBooking &&
      !newIsCreatingBaseBooking &&
      postBaseBookingSuccess
    ) {
      toastr.success('', 'Base Booking created successfully');
      history.push(`/r/booking/base/list`);
    } else if (
      prevIsCreatingBaseBooking &&
      !newIsCreatingBaseBooking &&
      postBaseBookingError
    ) {
      toastr.error(
        '',
        'Failed to create Base Booking. Please try again later.'
      );
    }

    if (
      prevIsUpdatingBaseBooking &&
      !newIsUpdatingBaseBooking &&
      putBaseBookingSuccess
    ) {
      toastr.success('', 'Base Booking updated successfully');
      history.push(`/r/booking/base/list`);
    } else if (
      prevIsUpdatingBaseBooking &&
      !newIsUpdatingBaseBooking &&
      putBaseBookingError
    ) {
      toastr.error(
        '',
        'Failed to update Base Booking. Please try again later.'
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

  onBaseEntityTypeChange(option) {
    const { errors } = this.state;

    if (errors.baseEntityTypeId && option.id) {
      delete errors.baseEntityTypeId;
    }

    this.setState(
      {
        baseEntityTypeId: option.id,
        selectedBaseEntityType: null,
        errors
      },
      () => {
        this.props.getBaseEntityType(this.state.baseEntityTypeId);
      }
    );
  }

  onSubmit() {
    // Submit form data
    const {
      name,
      attributes,
      baseEntityTypeId,
      entities,
      isEditMode,
      baseBookingId
    } = this.state;
    const { putBaseBooking, postBaseBooking } = this.props;

    const data = {
      name,
      booking_attributes: attributes,
      base_entity_type_id: baseEntityTypeId,
      entity_attributes: entities
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
        putBaseBooking({ id: baseBookingId, data });
      } else {
        postBaseBooking({ data });
      }
    }
  }

  getBaseBookingById({ id }) {
    const { booking } = this.props;
    const { baseBookingList } = booking;

    for (let i = 0, l = baseBookingList.length; i < l; i += 1) {
      if (baseBookingList[i].id === id) {
        return baseBookingList[i];
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

  handleEntityChange(entity, index) {
    const entities = [...this.state.entities];

    entities[index] = entity;

    this.setState({
      entities
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
                  attribute.attrIndex
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

  renderEntityRow(entity, index) {
    const onSelectChange = event => {
      const newEntity = { ...entity };

      newEntity.selected = !!event.target.checked;

      this.handleEntityChange(newEntity, index);
    };

    const onRequiredChange = event => {
      const newEntity = { ...entity };

      newEntity.is_required = !!event.target.checked;

      this.handleEntityChange(newEntity, index);
    };

    const entityOption = getEntityTypeOption(entity.type);

    return (
      <div
        className={classnames('entity', {
          'entity--unselect': !entity.selected
        })}
        key={index}
      >
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={entity.selected}
            onChange={onSelectChange}
          />
        </div>

        <div className="form-control">
          <p>{entity.name}</p>
        </div>

        <div className="form-control">
          <p>{entityOption.label}</p>
        </div>

        {entity.allowRequired ? (
          <div className="form-control form-control--row-vertical-center">
            <input
              type="checkbox"
              id={`entity-${index}-is-required`}
              className="input-checkbox"
              checked={entity.is_required}
              onChange={onRequiredChange}
              disabled={!entity.allowRequired}
            />
            <label htmlFor={`entity-${index}-is-required`}>Required</label>
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
    const { baseEntityType } = this.props;
    const { baseEntityTypeList } = baseEntityType;

    const { entities, errors } = this.state;

    return (
      <div className="booking-base__create create">
        <div className="create__title">
          <h3>Base Booking - Create</h3>
        </div>

        <div className="create__form">
          <form onSubmit={this.onSubmit}>
            <div className="create__form__body">
              <div className="form-control form-control--column">
                <label>*Enter Name For Base Booking</label>
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

            <div className="create__form__header">Base Booking Attributes</div>

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

            <div className="create__form__header">Base Entity Type</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.baseEntityTypeId
                  })}
                  placeholder="Select Base Entity Type"
                  options={baseEntityTypeList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={getBaseEntityTypeOption(
                    baseEntityTypeList,
                    this.state.baseEntityTypeId
                  )}
                  onChange={this.onBaseEntityTypeChange}
                />
                {errors.baseEntityTypeId ? (
                  <p className="message message--error">
                    {errors.baseEntityTypeId.message}
                  </p>
                ) : null}
              </div>

              {entities && entities.length ? (
                <div className="entity entity__header">
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

              {entities && entities.length
                ? entities.map(this.renderEntityRow)
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
