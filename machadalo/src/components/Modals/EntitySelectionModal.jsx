import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

import '../Checklist/index.css';
import './index.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '5px 10px 10px',
    maxHeight: '550px',
    minHeight: '200px'
  }
};

export default class SelectAttributeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entityTypeOption: [],
      selectedEntityType: undefined
    };
    this.renderOptionRow = this.renderOptionRow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectEntityType = this.onSelectEntityType.bind(this);
  }

  componentWillMount() {
    if (this.props.attributeInfo.attributeType === 'ENTITY_TYPE') {
      this.props.getEntityTypeList();
    } else if (this.props.attributeInfo.attributeType === 'BASE_ENTITY_TYPE') {
      this.props.getBaseEntityTypeList();
    } else if (this.props.attributeInfo.attributeType === 'INVENTORY_TYPE') {
      this.props.getBaseInventory();
    } else if (this.props.attributeInfo.attributeType === 'INVENTORY') {
      this.props.getInventoryList();
    }

    this.setState({
      selectedEntityType: this.props.selectedModalEntityType
    });
  }

  componentWillUnmount() {
    this.setState({
      entityTypeOption: [],
      selectedEntityType: undefined
    });
  }

  componentDidUpdate() {
    let entityType;
    let listKey;
    let entityAttribute;
    let optionValueKey = 'id';
    if (this.props.attributeInfo.attributeType === 'ENTITY_TYPE') {
      entityType = 'entityType';
      listKey = 'entityTypeList';
      entityAttribute = 'entity_attributes';
    } else if (this.props.attributeInfo.attributeType === 'BASE_ENTITY_TYPE') {
      entityType = 'baseEntityType';
      listKey = 'baseEntityTypeList';
      entityAttribute = 'entity_attributes';
    } else if (this.props.attributeInfo.attributeType === 'INVENTORY_TYPE') {
      entityType = 'baseInventory';
      listKey = 'baseInventoryList';
      entityAttribute = 'base_attributes';
      optionValueKey = '_id';
    } else if (this.props.attributeInfo.attributeType === 'INVENTORY') {
      entityType = 'baseInventory';
      listKey = 'inventoryList';
      entityAttribute = 'inventory_attributes';
      optionValueKey = '_id';
    } else {
      // Unsupported attribute
    }

    if (
      this.state.entityTypeOption.length !==
      this.props[entityType][listKey].length
    ) {
      let entityTypeOption = [];
      this.props[entityType][listKey].forEach(entityType => {
        entityTypeOption.push({
          value: entityType[optionValueKey],
          label: entityType.name,
          attributes: entityType[entityAttribute].map(attribute => {
            if (attribute.hasOwnProperty('isChecked')) {
              return attribute;
            }
            let checkedAttribute = Object.assign({}, attribute);
            checkedAttribute.isChecked = true;
            return checkedAttribute;
          })
        });
      });
      this.setState({
        entityTypeOption
      });
    }
  }

  onSelectEntityType(selectedEntityType) {
    this.setState({
      selectedEntityType
    });
  }

  handleInputChange(event, option) {
    let { selectedEntityType } = this.state;
    selectedEntityType.attributes.forEach(attribute => {
      if (attribute.name === option.name) {
        attribute.isChecked = event.target.checked;
      }
    });
    this.setState({
      selectedEntityType
    });
  }

  onSubmit() {
    let { selectedEntityType } = this.state;

    this.props.onSubmit(selectedEntityType, this.props.attributeInfo);
  }

  renderOptionRow(option, optionIndex) {
    return option.type !== 'ENTITY_TYPE' &&
      option.type !== 'BASE_ENTITY_TYPE' &&
      option.type !== 'INVENTORY_TYPE' &&
      option.type !== 'INVENTORY' ? (
      <div className="form-control option-container" key={optionIndex}>
        <input
          type="checkbox"
          className="input-checkbox"
          checked={option.isChecked}
          onChange={event => this.handleInputChange(event, option)}
          disabled={option.isRequired}
        />
        {option.name}
      </div>
    ) : (
      <div />
    );
  }

  render() {
    let { attributeInfo } = this.props;
    let { selectedEntityType } = this.state;

    let entityType;
    if (attributeInfo.attributeType === 'ENTITY_TYPE') {
      entityType = 'Entity Type';
    } else if (attributeInfo.attributeType === 'BASE_ENTITY_TYPE') {
      entityType = 'Base Entity Type';
    } else if (attributeInfo.attributeType === 'INVENTORY_TYPE') {
      entityType = 'Base Inventory';
    } else if (attributeInfo.attributeType === 'INVENTORY') {
      entityType = 'Inventory';
    }

    return (
      <Modal
        isOpen={this.props.showOptionModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal-title">
          <h3>Select Attributes for {entityType}</h3>
        </div>
        <br />
        <div className="createform">
          <div className="createform__form">
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Select {entityType}</label>
                <Select
                  options={this.state.entityTypeOption}
                  value={this.state.selectedEntityType}
                  onChange={this.onSelectEntityType}
                />
              </div>
            </div>
            <div className="createform__form">
              {selectedEntityType
                ? selectedEntityType.attributes.map(this.renderOptionRow)
                : undefined}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => this.onSubmit(selectedEntityType)}
              >
                Submit
              </button>{' '}
              <button
                type="button"
                className="btn btn--danger"
                onClick={this.props.onCancel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
