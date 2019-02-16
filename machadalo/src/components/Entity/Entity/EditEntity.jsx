import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../../Modals/OptionModal';
import FillEntityModal from '../../Modals/FillEntityModal';

const customeStyles = {
  input: () => ({
    height: '24px'
  })
};

export default class EditEntity extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      entity_attributes: [{ name: '', type: '', is_required: false }],
      currentEntity: undefined,
      attributeValue: [],
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {},
      showFillEntityModal: false
    };

    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
    this.onCancelFillEntityModal = this.onCancelFillEntityModal.bind(this);
    this.onSubmitFillEntityModal = this.onSubmitFillEntityModal.bind(this);
    this.onOpenFillEntityModal = this.onOpenFillEntityModal.bind(this);
  }

  componentWillMount() {
    this.props.getEntity(this.props.match.params.entityId);
  }

  componentDidUpdate() {
    if (
      (this.state.currentEntity === undefined &&
        this.props.entity.currentEntity) ||
      (this.state.currentEntity &&
        this.props.entity.currentEntity &&
        this.state.currentEntity.id !== this.props.entity.currentEntity.id)
    ) {
      this.setState({
        currentEntity: this.props.entity.currentEntity,
        entity_attributes: this.props.entity.currentEntity.entity_attributes,
        name: this.props.entity.currentEntity.name
      });
    }
  }

  onCancelFillEntityModal() {
    this.setState({
      showFillEntityModal: false,
      currentModalEntityType: undefined
    });
  }

  onSubmitFillEntityModal(currentModalEntityType, attributeInfo) {
    this.setState({
      showFillEntityModal: false,
      currentModalEntityType: undefined,
      attributeValueInfo: {}
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      value: currentModalEntityType
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenFillEntityModal(currentModalEntityType, attribute, attrIndex) {
    this.setState({
      showFillEntityModal: true,
      currentModalEntityType,
      attributeValueInfo: {
        attribute,
        attrIndex
      }
    });
  }

  onCancelOptionModal() {
    this.setState({
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {}
    });
  }

  onSubmitOptionModal(options, attributeInfo) {
    this.setState({
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {}
    });

    let newAttributes = Object.assign({}, attributeInfo.attribute, {
      value: options
    });
    this.handleAttributeChange(newAttributes, attributeInfo.attrIndex);
  }

  onOpenOptionModal(options, attribute, attrIndex) {
    this.setState({
      showOptionModal: true,
      attributeValueOptions: options,
      attributeValueInfo: {
        attribute,
        attrIndex
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      name: this.state.name,
      is_custom: false,
      entity_type_id: this.props.entity.currentEntity.entity_type_id,
      entity_attributes: this.state.entity_attributes
    };
    this.props.updateEntity(
      { data, entityId: this.props.match.params.entityId },
      () => {
        toastr.success('', 'Entity updated successfully');
        this.props.history.push('/r/entity/list');
      }
    );
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

  renderInputField(attribute, attrIndex) {
    const onValueChange = event => {
      const newAttribute = Object.assign({}, attribute);

      if (event.target.type === 'number') {
        newAttribute.value = parseFloat(event.target.value);
      } else {
        newAttribute.value = event.target.value;
      }

      this.handleAttributeChange(newAttribute, attrIndex);
    };

    const onDropDownAttributeValueChange = newValue => {
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
        attribute.options.forEach(option => {
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
              this.onOpenFillEntityModal(
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
            onClick={() =>
              this.onOpenFillEntityModal(attribute.value, attribute, attrIndex)
            }
          >
            {attribute.value && attribute.value.attributes[0].value
              ? 'Show Inventory List'
              : 'Create Inventory List'}
          </button>
        );

      case 'ENTITY_TYPE':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() =>
              this.onOpenFillEntityModal(attribute.value, attribute, attrIndex)
            }
          >
            {attribute.value && attribute.value.attributes[0].value
              ? 'Show Entity Type Data'
              : 'Create Entity Type Data'}
          </button>
        );
      case 'BASE_ENTITY_TYPE':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() =>
              this.onOpenFillEntityModal(attribute.value, attribute, attrIndex)
            }
          >
            {attribute.value && attribute.value.attributes[0].value
              ? 'Show Base Entity Type Data'
              : 'Create Base Entity Type Data'}
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

          <div className="form-control">
            {this.renderInputField(attribute, attrIndex)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Edit Entity </h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Name For Entity</label>
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

        {this.state.showFillEntityModal ? (
          <FillEntityModal
            showOptionModal={this.state.showFillEntityModal}
            onCancel={this.onCancelFillEntityModal}
            onSubmit={this.onSubmitFillEntityModal}
            columnInfo={this.state.attributeValueInfo}
            selectedEntityType={this.state.currentModalEntityType}
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}
