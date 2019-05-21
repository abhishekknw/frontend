import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../../Modals/OptionModal';
import FillSupplierModal from '../../Modals/FillSupplierModal';

const customeStyles = {
  input: () => ({
    height: '24px',
  }),
};

export default class EditSupplier extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      supplier_attributes: [{ name: '', type: '', is_required: false }],
      currentSupplier: undefined,
      attributeValue: [],
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {},
      showFillSupplierModal: false,
    };

    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelFillSupplierModal = this.onCancelFillSupplierModal.bind(this);
    this.onSubmitFillSupplierModal = this.onSubmitFillSupplierModal.bind(this);
    this.onOpenFillSupplierModal = this.onOpenFillSupplierModal.bind(this);
  }

  componentWillMount() {
    this.props.getSupplier(this.props.match.params.supplierId);
  }

  componentDidUpdate() {
    if (
      (this.state.currentSupplier === undefined && this.props.supplier.currentSupplier) ||
      (this.state.currentSupplier &&
        this.props.supplier.currentSupplier &&
        this.state.currentSupplier.id !== this.props.supplier.currentSupplier.id)
    ) {
      this.setState({
        currentSupplier: this.props.supplier.currentSupplier,
        supplier_attributes: this.props.supplier.currentSupplier.supplier_attributes,
        name: this.props.supplier.currentSupplier.name,
      });
    }
  }

  onCancelFillSupplierModal() {
    this.setState({
      showFillSupplierModal: false,
      currentModalSupplierType: undefined,
    });
  }

  onSubmitFillSupplierModal(currentModalSupplierType, attributeInfo) {
    this.setState({
      showFillSupplierModal: false,
      currentModalSupplierType: undefined,
      attributeValueInfo: {},
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      value: currentModalSupplierType,
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenFillSupplierModal(currentModalSupplierType, attribute, attrIndex) {
    this.setState({
      showFillSupplierModal: true,
      currentModalSupplierType,
      attributeValueInfo: {
        attribute,
        attrIndex,
      },
    });
  }

  onCancelOptionModal() {
    this.setState({
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {},
    });
  }

  onSubmitOptionModal(options, attributeInfo) {
    this.setState({
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {},
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      value: options,
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenOptionModal(options, attribute, attrIndex) {
    this.setState({
      showOptionModal: true,
      attributeValueOptions: options,
      attributeValueInfo: {
        attribute,
        attrIndex,
      },
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      name: this.state.name,
      is_custom: false,
      supplier_type_id: this.props.supplier.currentSupplier.supplier_type_id,
      supplier_attributes: this.state.supplier_attributes,
    };
    this.props.updateSupplier({ data, supplierId: this.props.match.params.supplierId }, () => {
      toastr.success('', 'Supplier updated successfully');
      this.props.history.push('/r/supplier/list');
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = this.state.supplier_attributes.slice();

    attributes.splice(index, 1, attribute);

    this.setState({
      supplier_attributes: attributes,
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  renderInputField(attribute, attrIndex) {
    const onValueChange = (event) => {
      const newAttribute = Object.assign({}, attribute);

      if (event.target.type === 'number') {
        newAttribute.value = parseFloat(event.target.value);
      } else {
        newAttribute.value = event.target.value;
      }

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onDropDownAttributeValueChange = (newValue) => {
      const newAttribute = Object.assign({}, attribute);

      newAttribute.value = newValue.value;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    switch (attribute.type) {
      case 'FLOAT':
        return (
          <input
            type="number"
            placeholder="Attribute Value"
            value={attribute.value}
            onChange={onValueChange}
          />
        );
      case 'STRING':
        return (
          <input
            type="text"
            placeholder="Attribute Value"
            value={attribute.value}
            onChange={onValueChange}
          />
        );
      case 'EMAIL':
        return (
          <input
            type="email"
            placeholder="Attribute Value"
            value={attribute.value}
            onChange={onValueChange}
          />
        );
      case 'DROPDOWN':
        let attributeValueOptions = [];
        attribute.options.forEach((option) => {
          attributeValueOptions.push({ label: option, value: option });
        });
        return (
          <Select
            styles={customeStyles}
            options={attributeValueOptions}
            value={{ label: attribute.value, value: attribute.value }}
            onChange={onDropDownAttributeValueChange}
          />
        );
      case 'INVENTORY_TYPE':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() =>
              this.onOpenFillSupplierModal(
                attribute.value ? attribute.value : [''],
                attribute,
                attrIndex
              )
            }
          >
            {attribute.value && attribute.value.length
              ? 'Show Base Inventory List'
              : 'Create Base Inventory List'}
          </button>
        );

      case 'INVENTORY':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.onOpenFillSupplierModal(attribute.value, attribute, attrIndex)}
          >
            {attribute.value && attribute.value.attributes[0].value
              ? 'Show Inventory List'
              : 'Create Inventory List'}
          </button>
        );

      case 'SUPPLIER_TYPE':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.onOpenFillSupplierModal(attribute.value, attribute, attrIndex)}
          >
            {attribute.value && attribute.value.attributes[0].value
              ? 'Show Supplier Type Data'
              : 'Create Supplier Type Data'}
          </button>
        );
      case 'BASE_SUPPLIER_TYPE':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.onOpenFillSupplierModal(attribute.value, attribute, attrIndex)}
          >
            {attribute.value && attribute.value.attributes[0].value
              ? 'Show Base Supplier Type Data'
              : 'Create Base Supplier Type Data'}
          </button>
        );
      default:
        return;
    }
  }

  renderAttributeRow(attribute, attrIndex) {
    return (
      <div className="createform__form__row" key={`row-${attrIndex}`}>
        <div className="createform__form__inline">
          <div className="form-control">
            <input type="text" value={attribute.name} disabled />
          </div>

          <div className="form-control">{this.renderInputField(attribute, attrIndex)}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Edit Supplier </h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Name For Supplier</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="createform__form__header">Attributes</div>

            <div>{this.state.supplier_attributes.map(this.renderAttributeRow)}</div>

            <div className="createform__form__inline">
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
          options={this.state.attributeValueOptions}
          columnInfo={this.state.attributeValueInfo}
        />

        {this.state.showFillSupplierModal ? (
          <FillSupplierModal
            showOptionModal={this.state.showFillSupplierModal}
            onCancel={this.onCancelFillSupplierModal}
            onSubmit={this.onSubmitFillSupplierModal}
            columnInfo={this.state.attributeValueInfo}
            selectedSupplierType={this.state.currentModalSupplierType}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}
