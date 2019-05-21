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
  paddingBottom: '10px',
};

const AttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'MULTISELECT', label: 'Multi Select' },
];

const SupplierTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'INVENTORY', label: 'Inventory' },
  { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'BASE_SUPPLIER_TYPE', label: 'Base Supplier Type' },
];

// Get attribute type option from string
const getAttributeTypeOption = (value) => {
  for (let i = 0, l = AttributeTypes.length; i < l; i += 1) {
    if (AttributeTypes[i].value === value) {
      return AttributeTypes[i];
    }
  }

  return { value };
};

// Get base supplier type option from supplier type
const getSupplierTypeOption = (value) => {
  for (let i = 0, l = SupplierTypes.length; i < l; i += 1) {
    if (SupplierTypes[i].value === value) {
      return SupplierTypes[i];
    }
  }

  return { value };
};

// Get a new raw attribute
const getRawAttribute = () => {
  return {
    name: '',
    type: 'STRING',
    is_required: false,
  };
};

const getBaseSupplierTypeOption = (baseSupplierTypeList, baseSupplierTypeId) => {
  for (let i = 0, l = baseSupplierTypeList.length; i < l; i += 1) {
    if (baseSupplierTypeId === baseSupplierTypeList[i].id) {
      return baseSupplierTypeList[i];
    }
  }

  return { id: baseSupplierTypeId };
};

const validate = (data) => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = {
      message: 'Please enter a name for base booking',
    };
  }

  if (!data.base_supplier_type_id) {
    errors.baseSupplierTypeId = {
      message: 'Please select a base supplier type',
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
        ...getRawAttribute(),
      },
    ];
    let suppliers = [];

    if (baseBookingId && baseBooking && baseBooking.id) {
      // Find the base booking matching `baseBookingId`
      attributes = baseBooking.booking_attributes;
      suppliers = baseBooking.supplier_attributes.map((item) => ({
        ...item,
        selected: true,
        allowRequired: item.is_required,
      }));
    }

    this.state = {
      isEditMode: !!baseBookingId,
      baseBookingId,
      name: baseBooking.name || '',
      attributes,
      suppliers,
      baseSupplierTypeId: baseBooking.base_supplier_type_id,
      selectedBaseSupplierType: null,
      errors: {},
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {},
    };

    this.onAddAttributeClick = this.onAddAttributeClick.bind(this);
    this.onBaseSupplierTypeChange = this.onBaseSupplierTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleSupplierChange = this.handleSupplierChange.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.renderSupplierRow = this.renderSupplierRow.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
  }

  componentDidMount() {
    this.props.getBaseSupplierTypeList();
  }

  componentDidUpdate(prevProps) {
    const { baseSupplierType: prevBaseSupplierType, booking: prevBooking } = prevProps;
    const { baseSupplierType: newBaseSupplierType, booking: newBooking, history } = this.props;
    const {
      isCreatingBaseBooking: prevIsCreatingBaseBooking,
      isUpdatingBaseBooking: prevIsUpdatingBaseBooking,
    } = prevBooking;
    const {
      isCreatingBaseBooking: newIsCreatingBaseBooking,
      postBaseBookingSuccess,
      postBaseBookingError,
      isUpdatingBaseBooking: newIsUpdatingBaseBooking,
      putBaseBookingSuccess,
      putBaseBookingError,
    } = newBooking;

    if (
      !this.state.selectedBaseSupplierType &&
      !prevBaseSupplierType.currentBaseSupplierType &&
      newBaseSupplierType.currentBaseSupplierType
    ) {
      this.setState({
        selectedBaseSupplierType: newBaseSupplierType.currentBaseSupplierType,
        suppliers: newBaseSupplierType.currentBaseSupplierType.supplier_attributes.map((item) => ({
          ...item,
          selected: true,
          allowRequired: item.is_required,
        })),
      });
    }

    if (prevIsCreatingBaseBooking && !newIsCreatingBaseBooking && postBaseBookingSuccess) {
      toastr.success('', 'Base Booking created successfully');
      history.push(`/r/booking/base/list`);
    } else if (prevIsCreatingBaseBooking && !newIsCreatingBaseBooking && postBaseBookingError) {
      toastr.error('', 'Failed to create Base Booking. Please try again later.');
    }

    if (prevIsUpdatingBaseBooking && !newIsUpdatingBaseBooking && putBaseBookingSuccess) {
      toastr.success('', 'Base Booking updated successfully');
      history.push(`/r/booking/base/list`);
    } else if (prevIsUpdatingBaseBooking && !newIsUpdatingBaseBooking && putBaseBookingError) {
      toastr.error('', 'Failed to update Base Booking. Please try again later.');
    }
  }

  onAddAttributeClick() {
    const attributes = [...this.state.attributes];

    attributes.push({
      ...getRawAttribute(),
    });

    this.setState({
      attributes,
    });
  }

  onOpenOptionModal(options, attributeType, attribute, attrIndex) {
    this.setState({
      optionModalVisibility: true,
      columnOptions: options,
      attributeInfo: {
        attributeType,
        attribute,
        attrIndex,
      },
    });
  }

  onCancelOptionModal() {
    this.setState({
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {},
    });
  }

  onSubmitOptionModal(options, attributeInfo) {
    const attributes = [...this.state.attributes];

    attributes[attributeInfo.attrIndex] = {
      ...attributes[attributeInfo.attrIndex],
      options,
    };

    this.setState({
      attributes,
      optionModalVisibility: false,
      columnOptions: [''],
      attributeInfo: {},
    });
  }

  onBaseSupplierTypeChange(option) {
    const { errors } = this.state;

    if (errors.baseSupplierTypeId && option.id) {
      delete errors.baseSupplierTypeId;
    }

    this.setState(
      {
        baseSupplierTypeId: option.id,
        selectedBaseSupplierType: null,
        errors,
      },
      () => {
        this.props.getBaseSupplierType(this.state.baseSupplierTypeId);
      }
    );
  }

  onSubmit() {
    // Submit form data
    const {
      name,
      attributes,
      baseSupplierTypeId,
      suppliers,
      isEditMode,
      baseBookingId,
    } = this.state;
    const { putBaseBooking, postBaseBooking } = this.props;

    const data = {
      name,
      booking_attributes: attributes,
      base_supplier_type_id: baseSupplierTypeId,
      supplier_attributes: suppliers
        .filter((item) => item.selected)
        .map((item) => ({ name: item.name, is_required: item.is_required })),
    };

    const errors = validate(data);

    if (Object.keys(errors).length) {
      this.setState({
        errors,
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
      errors,
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = [...this.state.attributes];

    attributes[index] = attribute;

    this.setState({
      attributes,
    });
  }

  handleSupplierChange(supplier, index) {
    const suppliers = [...this.state.suppliers];

    suppliers[index] = supplier;

    this.setState({
      suppliers,
    });
  }

  renderAttributeRow(attribute, index) {
    const onNameChange = (event) => {
      const newAttribute = { ...attribute };

      newAttribute.name = event.target.value;

      this.handleAttributeChange(newAttribute, index);
    };

    const onTypeChange = (option) => {
      const newAttribute = { ...attribute };

      newAttribute.type = option.value;

      this.setState(
        {
          optionModalVisibility:
            newAttribute.type === 'DROPDOWN' || newAttribute.type === 'MULTISELECT',
          attributeInfo: {
            attributeType: newAttribute.type,
            attribute: newAttribute,
            attrIndex: index,
          },
        },
        () => {
          this.handleAttributeChange(newAttribute, index);
        }
      );
    };

    const onRequiredChange = (event) => {
      const newAttribute = { ...attribute };

      newAttribute.is_required = !!event.target.checked;

      this.handleAttributeChange(newAttribute, index);
    };

    return (
      <div className="attribute" key={index}>
        <div className="form-control">
          <input type="text" placeholder="Name" value={attribute.name} onChange={onNameChange} />
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

  renderSupplierRow(supplier, index) {
    const onSelectChange = (event) => {
      const newSupplier = { ...supplier };

      newSupplier.selected = !!event.target.checked;

      this.handleSupplierChange(newSupplier, index);
    };

    const onRequiredChange = (event) => {
      const newSupplier = { ...supplier };

      newSupplier.is_required = !!event.target.checked;

      this.handleSupplierChange(newSupplier, index);
    };

    const supplierOption = getSupplierTypeOption(supplier.type);

    return (
      <div
        className={classnames('supplier', {
          'supplier--unselect': !supplier.selected,
        })}
        key={index}
      >
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={supplier.selected}
            onChange={onSelectChange}
          />
        </div>

        <div className="form-control">
          <p>{supplier.name}</p>
        </div>

        <div className="form-control">
          <p>{supplierOption.label}</p>
        </div>

        {supplier.allowRequired ? (
          <div className="form-control form-control--row-vertical-center">
            <input
              type="checkbox"
              id={`supplier-${index}-is-required`}
              className="input-checkbox"
              checked={supplier.is_required}
              onChange={onRequiredChange}
              disabled={!supplier.allowRequired}
            />
            <label htmlFor={`supplier-${index}-is-required`}>Required</label>
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
    const { baseSupplierType } = this.props;
    const { baseSupplierTypeList } = baseSupplierType;

    const { suppliers, errors } = this.state;

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
                  <p className="message message--error">{errors.name.message}</p>
                ) : null}
              </div>
            </div>

            <div className="create__form__header">Base Booking Attributes</div>

            <div className="create__form__body">
              {this.state.attributes.map(this.renderAttributeRow)}
            </div>

            <div className="create__form__actions">
              <button type="button" className="btn btn--danger" onClick={this.onAddAttributeClick}>
                Add Attribute
              </button>
            </div>

            <div className="create__form__header">Base Supplier Type</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.baseSupplierTypeId,
                  })}
                  placeholder="Select Base Supplier Type"
                  options={baseSupplierTypeList}
                  getOptionValue={(option) => option.id}
                  getOptionLabel={(option) => option.name}
                  value={getBaseSupplierTypeOption(
                    baseSupplierTypeList,
                    this.state.baseSupplierTypeId
                  )}
                  onChange={this.onBaseSupplierTypeChange}
                />
                {errors.baseSupplierTypeId ? (
                  <p className="message message--error">{errors.baseSupplierTypeId.message}</p>
                ) : null}
              </div>

              {suppliers && suppliers.length ? (
                <div className="supplier supplier__header">
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

              {suppliers && suppliers.length ? suppliers.map(this.renderSupplierRow) : null}
            </div>
          </form>
        </div>

        <div className="create__actions">
          <button type="button" className="btn btn--danger" onClick={this.onSubmit}>
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
