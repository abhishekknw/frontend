import React from 'react';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../../Modals/OptionModal';

const customeStyles = {
  input: () => ({
    height: '24px'
  })
};

export default class CreateEntity extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      entity_attributes: [{ name: '', type: '', is_required: false }],
      entityTypeOption: [],
      selectedEntityType: {},
      attributeValue: [],
      showOptionModal: false,
      attributeValueOptions: [''],
      attributeValueInfo: {}
    };

    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectEntityType = this.onSelectEntityType.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
  }

  componentWillMount() {
    this.props.getEntityTypeList();
  }

  componentDidUpdate() {
    if (
      this.state.entityTypeOption.length !==
      this.props.entityType.entityTypeList.length
    ) {
      let entityTypeOption = [];
      this.props.entityType.entityTypeList.forEach(entityType => {
        entityTypeOption.push({
          value: entityType.id,
          label: entityType.name
        });
      });
      this.setState({
        entityTypeOption
      });
    }
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
      entity_type_id: this.state.selectedEntityType.value,
      entity_attributes: this.state.entity_attributes
    };
    this.props.postEntity({ data }, () => {
      toastr.success('', 'Entity created successfully');
      this.props.history.push('/r/entity/list');
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
      case 'INVENTORYLIST':
        return (
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => this.onOpenOptionModal([''], attribute, attrIndex)}
          >
            {attribute.value && attribute.value.length
              ? 'Show Inventory List'
              : 'Create  Inventory List'}
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

  onSelectEntityType(selectedEntityType) {
    let { entityTypeList } = this.props.entityType;
    entityTypeList.forEach(entityType => {
      if (entityType.id === selectedEntityType.value) {
        this.setState({
          selectedEntityType,
          entity_attributes: entityType.entity_attributes
        });
        return;
      }
    });
  }

  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Create Entity </h3>
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

            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Select Entity Type</label>
                <Select
                  options={this.state.entityTypeOption}
                  value={this.state.selectedEntityType}
                  onChange={this.onSelectEntityType}
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
      </div>
    );
  }
}
