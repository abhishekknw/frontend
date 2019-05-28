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
  // { value: 'INVENTORY', label: 'Inventory' },
  // { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
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

const getOption = (options, value, { optionValueKey }) => {
  if (!options || !options.length) return {};

  for (let i = 0, l = options.length; i < l; i += 1) {
    if (options[i][optionValueKey] === value) {
      return options[i];
    }
  }

  return {};
};

export default class CreateType extends React.Component {
  constructor(props) {
    super(props);

    const supplierTypeId = this.getSupplierTypeId();

    this.state = {
      isEditMode: !!supplierTypeId,
      supplierTypeId,
      name: '',
      supplier_attributes: [{ name: '', type: '', is_required: false }],
      baseSupplierTypeOption: [],
      selectedBaseSupplierType: {},
      showOptionModal: false,
      showSupplierSelectionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
      selectedModalSupplierType: undefined,
      inventory_list: [],
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
    this.renderInventoryRow = this.renderInventoryRow.bind(this);
    this.onInventoryChange = this.onInventoryChange.bind(this);
    this.onAddInventory = this.onAddInventory.bind(this);
  }

  componentDidMount() {
    this.props.getBaseSupplierTypeList();
    this.props.getInventoryList();
    this.props.getSupplierType(this.props.match.params.supplierTypeId);
  }

  componentDidUpdate(prevProps) {
    const { supplierType: prevSupplierType } = prevProps;
    const { baseSupplierType: newBaseSupplierType, supplierType: newSupplierType } = this.props;
    const newState = {};

    if (
      this.state.baseSupplierTypeOption.length !== newBaseSupplierType.baseSupplierTypeList.length
    ) {
      let baseSupplierTypeOption = [];
      newBaseSupplierType.baseSupplierTypeList.forEach((baseSupplierType) => {
        baseSupplierTypeOption.push({
          value: baseSupplierType.id,
          label: baseSupplierType.name,
        });
      });

      newState.baseSupplierTypeOption = baseSupplierTypeOption;

      if (newSupplierType.currentSupplierType) {
        newState.selectedBaseSupplierType = getOption(
          baseSupplierTypeOption,
          newSupplierType.currentSupplierType.base_supplier_type_id,
          { optionValueKey: 'value' }
        );
      }
    }

    if (
      this.state.isEditMode &&
      !prevSupplierType.currentSupplierType &&
      newSupplierType.currentSupplierType
    ) {
      newState.name = newSupplierType.currentSupplierType.name;
      newState.selectedBaseSupplierType = getOption(
        this.state.baseSupplierTypeOption,
        newSupplierType.currentSupplierType.base_supplier_type_id,
        { optionValueKey: 'value' }
      );
      newState.supplier_attributes = newSupplierType.currentSupplierType.supplier_attributes;
      newState.inventory_list = newSupplierType.currentSupplierType.inventory_list;
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
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

    const { isEditMode, supplierTypeId } = this.state;
    const { history } = this.props;

    let data = {
      name: this.state.name,
      base_supplier_type_id: this.state.selectedBaseSupplierType.value,
      supplier_attributes: this.state.supplier_attributes,
      inventory_list: this.state.inventory_list,
    };

    if (isEditMode) {
      this.props.updateSupplierType(
        {
          data,
          supplierTypeId,
        },
        () => {
          toastr.success('', 'Supplier Type updated successfully');
          history.push('/r/supplier/type/list');
        }
      );
    } else {
      this.props.postSupplierType({ data }, () => {
        toastr.success('', 'Supplier Type created successfully');
        this.props.history.push('/r/supplier/type/list');
      });
    }
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

  onInventoryChange(selectedInventory) {
    this.setState({
      selectedInventory,
    });
  }

  onAddInventory() {
    const { inventory_list, selectedInventory } = this.state;

    inventory_list.push(selectedInventory);

    this.setState({
      inventory_list,
      selectedInventory: null,
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

  getSupplierTypeId = () => {
    const { match } = this.props;
    return match.params.supplierTypeId;
  };

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

  onSelectSupplierType(selectedSupplierType) {
    this.setState({
      selectedSupplierType,
    });
  }

  renderInventoryRow(inventory, index) {
    const onAttributeChange = (attribute, attributeIndex, event) => {
      const newInventory = { ...inventory };
      newInventory.inventory_attributes[attributeIndex].value = !!event.target.checked;

      const newInventoryList = this.state.inventory_list.slice();
      newInventoryList[index] = newInventory;

      this.setState({
        inventory_list: newInventoryList,
      });
    };

    const onInventoryRemove = () => {
      const newInventoryList = this.state.inventory_list.slice();
      newInventoryList.splice(index, 1);

      this.setState({
        inventory_list: newInventoryList,
      });
    };

    return (
      <div className="inventory-row" key={inventory.name}>
        <div key={inventory._id} className="inventory-row__heading">
          {inventory.name}
        </div>
        <div className="inventory-row__items">
          {inventory.inventory_attributes.map((attribute, index) => (
            <div className="item" key={attribute.name}>
              <input
                type="checkbox"
                className="input-checkbox"
                checked={attribute.value || attribute.is_required}
                onChange={onAttributeChange.bind(this, attribute, index)}
                disabled={attribute.is_required}
              />
              {attribute.name}
            </div>
          ))}
        </div>
        <div className="inventory-row__action">
          <button type="button" className="btn btn--link" onClick={onInventoryRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { baseInventory } = this.props;
    const { isEditMode, inventory_list } = this.state;

    const usedInventoryIds = inventory_list.map((item) => item._id);
    const inventoryList = baseInventory.inventoryList.filter(
      (item) => usedInventoryIds.indexOf(item._id) === -1
    );

    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Supplier Type - {isEditMode ? 'Edit' : 'Create'}</h3>
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
            </div>

            <div className="createform__form__header">Inventory</div>

            <div>{this.state.inventory_list.map(this.renderInventoryRow)}</div>

            <div className="createform__form__row">
              <div className="createform__form__inline">
                <div className="form-control">
                  <Select
                    options={inventoryList}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={this.state.selectedInventory}
                    onChange={this.onInventoryChange}
                  />
                </div>
              </div>
            </div>

            <div className="createform__form__inline">
              <div className="createform__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onAddInventory}
                  disabled={!this.state.selectedInventory}
                >
                  Add Inventory
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
