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
  paddingBottom: '10px'
};

const AttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'INVENTORY', label: 'Inventory' },
  { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'BASE_SUPPLIER_TYPE', label: 'Base Supplier Type' }
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

export default class EditBaseSupplierType extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',

      supplier_attributes: [
        { name: '', type: '', is_required: false, is_editable: true }
      ],
      currentBaseSupplierType: undefined,
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
      showSupplierSelectionModal: false,
      selectedModalSupplierType: undefined
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
  }

  componentWillMount() {
    this.props.getBaseSupplierType(this.props.match.params.baseSupplierTypeId);
  }

  componentDidUpdate() {
    if (
      (this.state.currentBaseSupplierType === undefined &&
        this.props.baseSupplierType.currentBaseSupplierType) ||
      (this.state.currentBaseSupplierType &&
        this.props.baseSupplierType.currentBaseSupplierType &&
        this.state.currentBaseSupplierType.id !==
          this.props.baseSupplierType.currentBaseSupplierType.id)
    ) {
      this.setState({
        currentBaseSupplierType: this.props.baseSupplierType
          .currentBaseSupplierType,
        supplier_attributes: this.props.baseSupplierType.currentBaseSupplierType
          .supplier_attributes,
        name: this.props.baseSupplierType.currentBaseSupplierType.name
      });
    }
  }

  onCancelOptionModal() {
    this.setState({
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {}
    });
  }

  onSubmitOptionModal(options, attributeInfo) {
    this.setState({
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {}
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      type: attributeInfo.attributeType,
      options: options
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
        attrIndex
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      name: this.state.name,
      supplier_attributes: this.state.supplier_attributes
    };

    this.props.updateBaseSupplierType(
      {
        data,
        baseSupplierTypeId: this.props.match.params.baseSupplierTypeId
      },
      () => {
        toastr.success('', 'Base Supplier Type updated successfully');
        this.props.history.push('/r/supplier/base-type/list');
      }
    );
  }

  onCancelSupplierModal() {
    this.setState({
      showSupplierSelectionModal: false,
      attributeInfo: {}
    });
  }

  onSubmitSupplierModal(value, attributeInfo) {
    this.setState({
      showSupplierSelectionModal: false,
      attributeInfo: {}
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      type: attributeInfo.attributeType,
      value
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
        attrIndex
      }
    });
  }

  onAddAttribute() {
    const newAttributes = this.state.supplier_attributes.slice();

    newAttributes.push({
      name: '',
      type: '',
      is_required: false,
      is_editable: true
    });

    this.setState({
      supplier_attributes: newAttributes
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = this.state.supplier_attributes.slice();

    attributes.splice(index, 1, attribute);

    this.setState({
      supplier_attributes: attributes
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  renderAttributeRow(attribute, attrIndex) {
    const onNameChange = event => {
      const newAttribute = Object.assign({}, attribute);

      newAttribute.name = event.target.value;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onTypeChange = item => {
      if (item.value === 'DROPDOWN') {
        this.setState({
          showOptionModal: true,
          columnOptions: [''],
          attributeInfo: {
            attributeType: item.value,
            attribute,
            attrIndex
          }
        });
      } else if (
        item.value === 'BASE_SUPPLIER_TYPE' ||
        item.value === 'INVENTORY_TYPE' ||
        item.value === 'INVENTORY'
      ) {
        this.setState({
          showSupplierSelectionModal: true,
          attributeInfo: {
            attributeType: item.value,
            attribute,
            attrIndex
          }
        });
        return;
      }
      const newAttribute = Object.assign({}, attribute);

      newAttribute.type = item.value;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onRequiredChange = event => {
      const newAttribute = {
        ...attribute,
        is_required: !!event.target.checked
      };

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onEditableChange = event => {
      const newAttribute = {
        ...attribute,
        is_editable: !!event.target.checked
      };

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
            />
          </div>

          <div className="form-control">
            <Select
              options={AttributeTypes}
              classNamePrefix="form-select"
              value={getAttributeTypeOption(attribute.type)}
              onChange={onTypeChange}
            />

            {attribute.type === 'DROPDOWN' ? (
              <p
                className="show-option"
                style={optionStyle}
                onClick={() =>
                  this.onOpenOptionModal(
                    attribute.options,
                    attribute.type,
                    attribute,
                    attrIndex
                  )
                }
              >
                Show Options
              </p>
            ) : (
              ''
            )}
            {attribute.type === 'BASE_SUPPLIER_TYPE' ||
            attribute.type === 'INVENTORY_TYPE' ||
            attribute.type === 'INVENTORY' ? (
              <p
                className="show-option"
                style={optionStyle}
                onClick={() =>
                  this.onOpenSupplierModal(attribute.type, attribute, attrIndex)
                }
              >
                Show Attributes
              </p>
            ) : (
              ''
            )}
          </div>

          <div className="form-control required-field">
            <div>Is it required?</div>
            <input
              type="checkbox"
              className="input-checkbox"
              checked={attribute.is_required}
              onChange={onRequiredChange}
            />
          </div>
          <div className="form-control required-field">
            <div>Is it editable?</div>
            <input
              type="checkbox"
              className="input-checkbox"
              checked={attribute.is_editable}
              onChange={onEditableChange}
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
          <h3>Edit Base Supplier Type </h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Name For Base Supplier Type</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="createform__form__header">Attributes</div>

            <div>
              {this.state.supplier_attributes.map(this.renderAttributeRow)}
            </div>

            <div className="createform__form__inline">
              <div className="createform__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onAddAttribute}
                >
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