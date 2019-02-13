import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../../Modals/OptionModal';

const optionStyle = {
  fontSize: '12px',
  marginBottom: '-24px',
  textDecoration: 'underline',
  cursor: 'pointer',
  paddingBottom: '10px'
};

const AttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' }
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

// Get base inventory options list
const getBaseInventoryOptions = baseInventory => {
  if (baseInventory && baseInventory.length) {
    return baseInventory.map(item => ({ label: item.name, value: item._id }));
  }

  return [];
};

// Get base inventory option by value
const getBaseInventoryOptionByValue = (
  baseInventoryOptions,
  baseInventoryId
) => {
  for (let i = 0, l = baseInventoryOptions.length; i < l; i += 1) {
    if (baseInventoryOptions[i].value === baseInventoryId) {
      return baseInventoryOptions[i];
    }
  }

  return {};
};

// Get inventory by id
const getInventoryById = (inventoryList, inventoryId) => {
  for (let i = 0, l = inventoryList.length; i < l; i += 1) {
    if (inventoryList[i]._id === inventoryId) {
      return inventoryList[i];
    }
  }

  return {};
};

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    let { match } = this.props;
    const { inventoryList } = this.props.baseInventory;
    const baseInventoryOptions = getBaseInventoryOptions(
      this.props.baseInventory.baseInventoryList
    );
    let mode = 'create'; // Options: create | edit
    let inventoryId;
    let inventoryName = '';
    let selectedBaseInventory = {};
    let inventoryAttributes = [{ name: '', type: '', is_required: false }];

    if (match.params && match.params.inventoryId) {
      mode = 'edit';
      inventoryId = match.params.inventoryId;
      const inventory = getInventoryById(inventoryList, inventoryId);

      if (inventory && Object.keys(inventory).length) {
        inventoryName = inventory.name;
        inventoryAttributes = inventory.inventory_attributes;
        selectedBaseInventory = getBaseInventoryOptionByValue(
          baseInventoryOptions,
          inventory.base_inventory
        );
      }
    }

    this.state = {
      name: inventoryName,
      inventory_attributes: inventoryAttributes,
      baseInventoryOptions,
      selectedBaseInventory,
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
      mode,
      inventoryId
    };

    this.onAddAttribute = this.onAddAttribute.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onBaseInventoryChange = this.onBaseInventoryChange.bind(this);
  }

  componentDidMount() {
    this.props.getBaseInventory();

    if (this.state.mode === 'edit') {
      this.props.getInventoryList();
    }
  }

  componentDidUpdate(prevProps) {
    const newState = {};

    const { inventoryList, baseInventoryList } = this.props.baseInventory;
    const oldInventoryList = prevProps.baseInventory.inventoryList;

    if (
      this.state.baseInventoryOptions.length !== baseInventoryList.length ||
      (oldInventoryList &&
        inventoryList &&
        oldInventoryList.length !== inventoryList.length)
    ) {
      newState.baseInventoryOptions = getBaseInventoryOptions(
        this.props.baseInventory.baseInventoryList
      );

      const inventory = getInventoryById(inventoryList, this.state.inventoryId);
      if (Object.keys(inventory).length) {
        newState.name = inventory.name;
        newState.inventory_attributes = inventory.inventory_attributes;
        newState.selectedBaseInventory = getBaseInventoryOptionByValue(
          newState.baseInventoryOptions,
          inventory.base_inventory
        );
      }
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
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
      base_inventory: this.state.selectedBaseInventory.value,
      inventory_attributes: this.state.inventory_attributes
    };

    if (this.state.mode === 'create') {
      this.props.postInventory({ data }, () => {
        toastr.success('', 'Inventory created successfully');
        this.props.history.push('/r/inventory/list');
      });
    } else if (this.state.mode === 'edit') {
      this.props.putInventory(
        { inventoryId: this.state.inventoryId, data },
        () => {
          toastr.success('', 'Inventory updated successfully');
          this.props.history.push('/r/inventory/list');
        }
      );
    } else {
      console.log('Error: Unsupported mode!');
    }
  }

  onAddAttribute() {
    const newAttributes = this.state.inventory_attributes.slice();

    newAttributes.push({
      name: '',
      type: '',
      is_required: false
    });

    this.setState({
      inventory_attributes: newAttributes
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = this.state.inventory_attributes.slice();

    attributes.splice(index, 1, attribute);

    this.setState({
      inventory_attributes: attributes
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onBaseInventoryChange(selectedBaseInventory) {
    let { baseInventoryList } = this.props.baseInventory;

    for (let i = 0, l = baseInventoryList.length; i < l; i += 1) {
      if (selectedBaseInventory.value === baseInventoryList[i]._id) {
        this.setState({
          selectedBaseInventory,
          inventory_attributes: baseInventoryList[i].base_attributes
        });

        break;
      }
    }
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
        return;
      }

      const newAttribute = Object.assign({}, attribute);

      newAttribute.type = item.value;

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onRequiredChange = event => {
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
                    attribute.attrIndex
                  )
                }
              >
                Show Options
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
              value={attribute.is_required}
              onChange={onRequiredChange}
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
          <h3>Create Inventory</h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Inventory Name</label>
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
                <label>*Select Base Inventory</label>
                <Select
                  options={this.state.baseInventoryOptions}
                  value={this.state.selectedBaseInventory}
                  onChange={this.onBaseInventoryChange}
                  isDisabled={this.state.mode === 'edit'}
                />
              </div>
            </div>

            <div className="createform__form__header">Attributes</div>

            <div>
              {this.state.inventory_attributes.map(this.renderAttributeRow)}
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
      </div>
    );
  }
}