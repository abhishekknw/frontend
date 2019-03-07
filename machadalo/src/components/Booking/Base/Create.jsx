import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';

const AttributeTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'MULTISELECT', label: 'Multi Select' }
];

const EntityTypes = [
  { value: 'FLOAT', label: 'Float' },
  { value: 'STRING', label: 'Text' },
  { value: 'INVENTORY', label: 'Inventory' },
  { value: 'INVENTORY_TYPE', label: 'Base Inventory' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'EMAIL', label: 'Email' },
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

// Get base entity type option from entity type
const getEntityTypeOption = value => {
  for (let i = 0, l = EntityTypes.length; i < l; i += 1) {
    if (EntityTypes[i].value === value) {
      return EntityTypes[i];
    }
  }

  return { value };
};

// Get a new raw attribute
const getRawAttribute = () => {
  return {
    name: '',
    type: 'STRING',
    is_required: false
  };
};

const getBaseEntityTypeOption = (baseEntityTypeList, baseEntityTypeId) => {
  for (let i = 0, l = baseEntityTypeList.length; i < l; i += 1) {
    if (baseEntityTypeId === baseEntityTypeList[i].id) {
      return baseEntityTypeList[i];
    }
  }

  return { id: baseEntityTypeId };
};

const validate = data => {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = {
      message: 'Please enter a name for base booking'
    };
  }

  if (!data.base_entity_type_id) {
    errors.baseEntityTypeId = {
      message: 'Please select a base entity type'
    };
  }

  return errors;
};

export default class CreateBaseBooking extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      attributes: [
        {
          ...getRawAttribute()
        }
      ],
      entities: [],
      baseEntityTypeId: null,
      selectedBaseEntityType: null,
      errors: {}
    };

    this.onAddAttributeClick = this.onAddAttributeClick.bind(this);
    this.onBaseEntityTypeChange = this.onBaseEntityTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.handleEntityChange = this.handleEntityChange.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.renderEntityRow = this.renderEntityRow.bind(this);
  }

  componentDidMount() {
    this.props.getBaseEntityTypeList();
  }

  componentDidUpdate(prevProps) {
    const { baseEntityType: prevBaseEntityType } = prevProps;
    const { baseEntityType: newBaseEntityType } = this.props;

    if (
      !this.state.selectedBaseEntityType &&
      !prevBaseEntityType.currentBaseEntityType &&
      newBaseEntityType.currentBaseEntityType
    ) {
      this.setState({
        selectedBaseEntityType: newBaseEntityType.currentBaseEntityType,
        entities: newBaseEntityType.currentBaseEntityType.entity_attributes.map(
          item => ({
            ...item,
            selected: true,
            allowRequired: item.is_required
          })
        )
      });
    }
  }

  onAddAttributeClick() {
    const attributes = [...this.state.attributes];

    attributes.push({
      ...getRawAttribute()
    });

    this.setState({
      attributes
    });
  }

  onBaseEntityTypeChange(option) {
    this.setState(
      {
        baseEntityTypeId: option.id,
        selectedBaseEntityType: null
      },
      () => {
        this.props.getBaseEntityType(this.state.baseEntityTypeId);
      }
    );
  }

  onSubmit() {
    // TODO: Submit form data
    const { name, attributes, baseEntityTypeId, entities } = this.state;

    const data = {
      name,
      booking_attributes: attributes,
      base_entity_type_id: baseEntityTypeId,
      entity_attributes: entities
        .filter(item => item.selected)
        .map(item => ({ name: item.name, is_required: item.is_required }))
    };

    const errors = validate(data);
    console.log('validationResult: ', errors);

    if (Object.keys(errors).length) {
      this.setState({
        errors
      });
    } else {
      console.log('data', data);
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAttributeChange(attribute, index) {
    const attributes = [...this.state.attributes];

    attributes[index] = attribute;

    this.setState({
      attributes
    });
  }

  handleEntityChange(entity, index) {
    const entities = [...this.state.entities];

    entities[index] = entity;

    this.setState({
      entities
    });
  }

  renderAttributeRow(attribute, index) {
    const onNameChange = event => {
      const newAttribute = { ...attribute };

      newAttribute.name = event.target.value;

      this.handleAttributeChange(newAttribute, index);
    };

    const onTypeChange = option => {
      const newAttribute = { ...attribute };

      newAttribute.type = option.value;

      this.handleAttributeChange(newAttribute, index);
    };

    const onRequiredChange = event => {
      const newAttribute = { ...attribute };

      newAttribute.is_required = !!event.target.checked;

      this.handleAttributeChange(newAttribute, index);
    };

    return (
      <div className="attribute" key={index}>
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
            className="select"
            options={AttributeTypes}
            value={getAttributeTypeOption(attribute.type)}
            onChange={onTypeChange}
          />
        </div>
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            id={`attr-${index}-is-required`}
            className="input-checkbox"
            checked={attribute.is_required}
            onChange={onRequiredChange}
          />
          <label htmlFor={`attr-${index}-is-required`}>Required</label>
        </div>
      </div>
    );
  }

  renderEntityRow(entity, index) {
    const onSelectChange = event => {
      const newEntity = { ...entity };

      newEntity.selected = !!event.target.checked;

      this.handleEntityChange(newEntity, index);
    };

    const onRequiredChange = event => {
      const newEntity = { ...entity };

      newEntity.is_required = !!event.target.checked;

      this.handleEntityChange(newEntity, index);
    };

    const entityOption = getEntityTypeOption(entity.type);

    return (
      <div
        className={classnames('entity', {
          'entity--unselect': !entity.selected
        })}
        key={index}
      >
        <div className="form-control form-control--row-vertical-center">
          <input
            type="checkbox"
            className="input-checkbox"
            checked={entity.selected}
            onChange={onSelectChange}
          />
        </div>

        <div className="form-control">
          <p>{entity.name}</p>
        </div>

        <div className="form-control">
          <p>{entityOption.label}</p>
        </div>

        {entity.allowRequired ? (
          <div className="form-control form-control--row-vertical-center">
            <input
              type="checkbox"
              id={`entity-${index}-is-required`}
              className="input-checkbox"
              checked={entity.is_required}
              onChange={onRequiredChange}
              disabled={!entity.allowRequired}
            />
            <label htmlFor={`entity-${index}-is-required`}>Required</label>
          </div>
        ) : (
          <div className="form-control form-control--row-vertical-center">
            <p>N/A</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { baseEntityType } = this.props;
    const { baseEntityTypeList } = baseEntityType;

    const { entities, errors } = this.state;

    return (
      <div className="booking-base__create create">
        <div className="create__title">
          <h3>Base Booking - Create</h3>
        </div>

        <div className="create__form">
          <form onSubmit={this.onSubmit}>
            <div className="create__form__body">
              <div className="form-control form-control--column">
                <label>*Enter Name For Base Booking</label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  className={classnames({ error: errors.name })}
                />
                {errors.name ? (
                  <p className="message message--error">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="create__form__header">Attributes</div>

            <div className="create__form__body">
              {this.state.attributes.map(this.renderAttributeRow)}
            </div>

            <div className="create__form__actions">
              <button
                type="button"
                className="btn btn--danger"
                onClick={this.onAddAttributeClick}
              >
                Add Attribute
              </button>
            </div>

            <div className="create__form__header">Base Entity Type</div>

            <div className="create__form__body">
              <div className="form-control form-control--column">
                <Select
                  className={classnames('select', {
                    error: errors.baseEntityTypeId
                  })}
                  placeholder="Select Base Entity Type"
                  options={baseEntityTypeList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={getBaseEntityTypeOption(
                    baseEntityTypeList,
                    this.state.baseEntityTypeId
                  )}
                  onChange={this.onBaseEntityTypeChange}
                />
                {errors.baseEntityTypeId ? (
                  <p className="message message--error">
                    {errors.baseEntityTypeId.message}
                  </p>
                ) : null}
              </div>

              {entities && entities.length ? (
                <div className="entity entity__header">
                  <div className="form-control">&nbsp;</div>

                  <div className="form-control">
                    <h4>Field</h4>
                  </div>

                  <div className="form-control">
                    <h4>Type</h4>
                  </div>

                  <div className="form-control">
                    <h4>Required</h4>
                  </div>
                </div>
              ) : null}

              {entities && entities.length
                ? entities.map(this.renderEntityRow)
                : null}
            </div>
          </form>
        </div>

        <div className="create__actions">
          <button
            type="button"
            className="btn btn--danger"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
