import React from 'react';
import Select from 'react-select';

import { toastr } from 'react-redux-toastr';
import OptionModal from '../../Modals/OptionModal';
import FillSupplierModal from '../../Modals/FillSupplierModal';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import moment from 'moment';

const customeStyles = {
  input: () => ({
    height: '24px',
  }),
};

export default class CreateSupplier extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      supplier_attributes: [{ name: '', type: '', is_required: false }],
      supplierTypeOption: [],
      selectedSupplierType: {},
      attributeValue: [],
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {},
      showFillSupplierModal: false,
      currentModalSupplierType: undefined,
    };

    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectSupplierType = this.onSelectSupplierType.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelFillSupplierModal = this.onCancelFillSupplierModal.bind(this);
    this.onSubmitFillSupplierModal = this.onSubmitFillSupplierModal.bind(this);
    this.onOpenFillSupplierModal = this.onOpenFillSupplierModal.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillMount() {
    this.props.getSupplierTypeList();
  }

  componentDidUpdate() {
    if (this.state.supplierTypeOption.length !== this.props.supplierType.supplierTypeList.length) {
      let supplierTypeOption = [];
      this.props.supplierType.supplierTypeList.forEach((supplierType) => {
        supplierTypeOption.push({
          value: supplierType.id,
          label: supplierType.name,
        });
      });
      this.setState({
        supplierTypeOption,
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
    console.log(attribute);
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
      supplier_type_id: this.state.selectedSupplierType.value,
      supplier_attributes: this.state.supplier_attributes,
    };
    console.log(data);
    this.props.postSupplier({ data }, () => {
      toastr.success('', 'Supplier created successfully');
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

  handleDateChange(date, index) {
    const { supplier_attributes } = this.state;
    supplier_attributes[index].value = date.format('YYYY-MM-DD');
    this.setState({
      supplier_attributes,
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
            onClick={() => this.onOpenFillSupplierModal(attribute.value, attribute, attrIndex)}
          >
            {attribute.value && attribute.value.attributes[0].value
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
      case 'DATETIME':
        return (
          <DatetimePickerTrigger
            moment={moment(attribute.value)}
            onChange={(e) => this.handleDateChange(e, attrIndex)}
          >
            <input type="text" value={attribute.value} readOnly />
          </DatetimePickerTrigger>
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

  onSelectSupplierType(selectedSupplierType) {
    let { supplierTypeList } = this.props.supplierType;
    supplierTypeList.forEach((supplierType) => {
      if (supplierType.id === selectedSupplierType.value) {
        this.setState({
          selectedSupplierType,
          supplier_attributes: supplierType.supplier_attributes,
        });
        return;
      }
    });
  }

  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Create Supplier </h3>
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

            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Select Supplier Type</label>
                <Select
                  options={this.state.supplierTypeOption}
                  value={this.state.selectedSupplierType}
                  onChange={this.onSelectSupplierType}
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
