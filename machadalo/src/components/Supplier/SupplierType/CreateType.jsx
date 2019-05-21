import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../../Modals/OptionModal';
import SupplierSelectionModal from '../../Modals/SupplierSelectionModal';

const optionStyle = {
  fontSize: '12px',
  margin: '0',
  marginTop: '5px',
  textDecoration: 'underline',
  cursor: 'pointer',
  paddingBottom: '10px',
};

const AttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'INVENTORY', label: 'Inventory' },
  { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'SUPPLIER_TYPE', label: 'Supplier Type' },
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

export default class CreateType extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      supplier_attributes: [{ name: '', type: '', is_required: false }],
      baseSupplierTypeOption: [],
      selectedBaseSupplierType: {},
      showOptionModal: false,
      showSupplierSelectionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
      selectedModalSupplierType: undefined,
    };

    this.onAddAttribute = this.onAddAttribute.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelSupplierModal = this.onCancelSupplierModal.bind(this);
    this.onSubmitSupplierModal = this.onSubmitSupplierModal.bind(this);
    this.onOpenSupplierModal = this.onOpenSupplierModal.bind(this);
    this.onSelectBaseSupplierType = this.onSelectBaseSupplierType.bind(this);
  }

  componentWillMount() {
    this.props.getBaseSupplierTypeList();
  }

  componentDidUpdate() {
    if (
      this.state.baseSupplierTypeOption.length !==
      this.props.baseSupplierType.baseSupplierTypeList.length
    ) {
      let baseSupplierTypeOption = [];
      this.props.baseSupplierType.baseSupplierTypeList.forEach((baseSupplierType) => {
        baseSupplierTypeOption.push({
          value: baseSupplierType.id,
          label: baseSupplierType.name,
        });
      });
      this.setState({
        baseSupplierTypeOption,
      });
    }
  }

  onCancelOptionModal() {
    this.setState({
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
    });
  }

  onSubmitOptionModal(options, attributeInfo) {
    this.setState({
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      type: attributeInfo.attributeType,
      options: options,
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenOptionModal(options, attributeType, attribute, attrIndex) {
    this.setState({
      showOptionModal: true,
      attributeOptions: options,
      attributeInfo: {
        attributeType,
        attribute,
        attrIndex,
      },
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      name: this.state.name,
      base_supplier_type_id: this.state.selectedBaseSupplierType.value,
      supplier_attributes: this.state.supplier_attributes,
    };

    this.props.postSupplierType({ data }, () => {
      toastr.success('', 'Supplier Type created successfully');
      this.props.history.push('/r/supplier/type/list');
    });
  }

  onCancelSupplierModal() {
    this.setState({
      showSupplierSelectionModal: false,
      attributeInfo: {},
    });
  }

  onSubmitSupplierModal(value, attributeInfo) {
    this.setState({
      showSupplierSelectionModal: false,
      attributeInfo: {},
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      type: attributeInfo.attributeType,
      value,
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenSupplierModal(attributeType, attribute, attrIndex) {
    this.setState({
      showSupplierSelectionModal: true,
      selectedModalSupplierType: attribute.value,
      attributeInfo: {
        attributeType,
        attribute,
        attrIndex,
      },
    });
  }

  onAddAttribute() {
    const newAttributes = this.state.supplier_attributes.slice();

    newAttributes.push({
      name: '',
      type: '',
      is_required: false,
    });

    this.setState({
      supplier_attributes: newAttributes,
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = [...this.state.supplier_attributes];

    attributes[index] = {
      ...attribute,
    };

    this.setState({
      supplier_attributes: attributes,
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSelectBaseSupplierType(selectedBaseSupplierType) {
    let { baseSupplierTypeList } = this.props.baseSupplierType;
    baseSupplierTypeList.forEach((baseSupplierType) => {
      if (baseSupplierType.id === selectedBaseSupplierType.value) {
        this.setState({
          selectedBaseSupplierType,
          supplier_attributes: baseSupplierType.supplier_attributes,
        });
        return;
      }
    });
  }

  renderAttributeRow(attribute, attrIndex) {
    const isDisabled = attribute.hasOwnProperty('is_editable') && !attribute.is_editable;

    const onNameChange = (event) => {
      const newAttribute = Object.assign({}, attribute);

      newAttribute.name = event.target.value;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onTypeChange = (item) => {
      if (item.value === 'DROPDOWN') {
        this.setState({
          showOptionModal: true,
          columnOptions: [''],
          attributeInfo: {
            attributeType: item.value,
            attribute,
            attrIndex,
          },
        });
        return;
      } else if (
        item.value === 'SUPPLIER_TYPE' ||
        item.value === 'BASE_SUPPLIER_TYPE' ||
        item.value === 'INVENTORY_TYPE' ||
        item.value === 'INVENTORY'
      ) {
        this.setState({
          showSupplierSelectionModal: true,
          attributeInfo: {
            attributeType: item.value,
            attribute,
            attrIndex,
          },
        });
        return;
      }
      const newAttribute = Object.assign({}, attribute);

      newAttribute.type = item.value;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onRequiredChange = (event) => {
      const newAttribute = Object.assign({}, attribute);

      newAttribute.is_required = !!event.target.checked;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    return (
      <div className="createform__form__row" key={`row-${attrIndex}`}>
        <div className="createform__form__inline">
          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              value={attribute.name}
              onChange={onNameChange}
              disabled={isDisabled}
            />
          </div>

          <div className="form-control">
            <Select
              options={AttributeTypes}
              classNamePrefix="form-select"
              value={getAttributeTypeOption(attribute.type)}
              onChange={onTypeChange}
              isDisabled={isDisabled}
            />

            {attribute.type === 'DROPDOWN' ? (
              <p
                className="show-option"
                style={optionStyle}
                onClick={() =>
                  this.onOpenOptionModal(attribute.options, attribute.type, attribute, attrIndex)
                }
              >
                Show Options
              </p>
            ) : (
              ''
            )}
            {attribute.type === 'SUPPLIER_TYPE' ||
            attribute.type === 'BASE_SUPPLIER_TYPE' ||
            attribute.type === 'INVENTORY_TYPE' ||
            attribute.type === 'INVENTORY' ? (
              <p
                className="show-option"
                style={optionStyle}
                onClick={() => this.onOpenSupplierModal(attribute.type, attribute, attrIndex)}
              >
                Show Attributes
              </p>
            ) : (
              ''
            )}
          </div>
          <br />

          <div className="form-control required-field">
            <div>Is it required?</div>
            <input
              type="checkbox"
              className="input-checkbox"
              checked={attribute.is_required}
              onChange={onRequiredChange}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Create Supplier Type </h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Name For Supplier Type</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Select Base Supplier Type</label>
                <Select
                  options={this.state.baseSupplierTypeOption}
                  value={this.state.selectedBaseSupplierType}
                  onChange={this.onSelectBaseSupplierType}
                />
              </div>
            </div>

            <div className="createform__form__header">Attributes</div>

            <div>{this.state.supplier_attributes.map(this.renderAttributeRow)}</div>

            <div className="createform__form__inline">
              <div className="createform__form__action">
                <button type="button" className="btn btn--danger" onClick={this.onAddAttribute}>
                  Add Attribute
                </button>
              </div>

              <div className="createform__form__action">
                <button type="submit" className="btn btn--danger">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <OptionModal
          showOptionModal={this.state.showOptionModal}
          onCancel={this.onCancelOptionModal}
          onSubmit={this.onSubmitOptionModal}
          options={this.state.attributeOptions}
          columnInfo={this.state.attributeInfo}
        />
        {this.state.showSupplierSelectionModal ? (
          <SupplierSelectionModal
            {...this.props}
            showOptionModal={this.state.showSupplierSelectionModal}
            onCancel={this.onCancelSupplierModal}
            onSubmit={this.onSubmitSupplierModal}
            attributeInfo={this.state.attributeInfo}
            selectedModalSupplierType={this.state.selectedModalSupplierType}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}
