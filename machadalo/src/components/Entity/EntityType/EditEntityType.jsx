import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../../Modals/OptionModal';
import EntitySelectionModal from '../../Modals/EntitySelectionModal';

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
  { value: 'INVENTORY_TYPE', label: 'Inventory list' },
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

export default class EditEntityType extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',

      entity_attributes: [{ name: '', type: '', is_required: false }],
      base_entity_type_id: undefined,
      currentEntityType: undefined,
      showEntitySelectionModal: false,
      showOptionModal: false,
      attributeOptions: [''],
      attributeInfo: {},
      selectedModalEntityType: undefined
    };

    this.onAddAttribute = this.onAddAttribute.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelEntityModal = this.onCancelEntityModal.bind(this);
    this.onSubmitEntityModal = this.onSubmitEntityModal.bind(this);
    this.onOpenEntityModal = this.onOpenEntityModal.bind(this);
  }

  componentWillMount() {
    this.props.getEntityType(this.props.match.params.entityTypeId);
  }

  componentDidUpdate() {
    if (
      (this.state.currentEntityType === undefined &&
        this.props.entityType.currentEntityType) ||
      (this.state.currentEntityType &&
        this.props.entityType.currentEntityType &&
        this.state.currentEntityType.id !==
          this.props.entityType.currentEntityType.id)
    ) {
      this.setState({
        currentEntityType: this.props.entityType.currentEntityType,
        entity_attributes: this.props.entityType.currentEntityType
          .entity_attributes,
        name: this.props.entityType.currentEntityType.name,
        base_entity_type_id: this.props.entityType.currentEntityType
          .base_entity_type_id
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
      base_entity_type_id: this.state.base_entity_type_id,
      entity_attributes: this.state.entity_attributes
    };

    this.props.updateEntityType(
      {
        data,
        entityTypeId: this.props.match.params.entityTypeId
      },
      () => {
        toastr.success('', 'Entity Type updated successfully');
        this.props.history.push('/r/entity/type/list');
      }
    );
  }

  onCancelEntityModal() {
    this.setState({
      showEntitySelectionModal: false,
      attributeInfo: {}
    });
  }

  onSubmitEntityModal(value, attributeInfo) {
    this.setState({
      showEntitySelectionModal: false,
      attributeInfo: {}
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      type: attributeInfo.attributeType,
      value
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenEntityModal(attributeType, attribute, attrIndex) {
    this.setState({
      showEntitySelectionModal: true,
      selectedModalEntityType: attribute.value,
      attributeInfo: {
        attributeType,
        attribute,
        attrIndex
      }
    });
  }

  onAddAttribute() {
    const newAttributes = this.state.entity_attributes.slice();

    newAttributes.push({
      name: '',
      type: '',
      is_required: false
    });

    this.setState({
      entity_attributes: newAttributes
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = this.state.entity_attributes.slice();

    attributes.splice(index, 1, attribute);

    this.setState({
      entity_attributes: attributes
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
        item.value === 'ENTITY_TYPE' ||
        item.value === 'BASE_ENTITY_TYPE' ||
        item.value === 'INVENTORY_TYPE'
      ) {
        this.setState({
          showEntitySelectionModal: true,
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
            {attribute.type === 'ENTITY_TYPE' ||
            attribute.type === 'BASE_ENTITY_TYPE' ||
            attribute.type === 'INVENTORY_TYPE' ? (
              <p
                className="show-option"
                style={optionStyle}
                onClick={() =>
                  this.onOpenEntityModal(
                    attribute.type,
                    attribute,
                    attribute.attrIndex
                  )
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
          <h3>Edit Entity Type </h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Name For Entity Type</label>
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
              {this.state.entity_attributes.map(this.renderAttributeRow)}
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
        {this.state.showEntitySelectionModal ? (
          <EntitySelectionModal
            {...this.props}
            showOptionModal={this.state.showEntitySelectionModal}
            onCancel={this.onCancelEntityModal}
            onSubmit={this.onSubmitEntityModal}
            attributeInfo={this.state.attributeInfo}
            selectedModalEntityType={this.state.selectedModalEntityType}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}
