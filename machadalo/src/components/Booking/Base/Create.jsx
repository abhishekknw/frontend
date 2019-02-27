import React from 'react';
import Select from 'react-select';

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

// Get a new raw attribute
const getRawAttribute = () => {
  return {
    name: '',
    type: 'STRING',
    is_required: false
  };
};

const getBaseEntityTypeOption = (baseEntityTypeList, baseEntityType) => {
  for (let i = 0, l = baseEntityTypeList.length; i < l; i += 1) {
    if (baseEntityType === baseEntityTypeList[i].id) {
      return baseEntityTypeList[i];
    }
  }

  return { id: baseEntityType };
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
      baseEntityType: null
    };

    this.onAddAttributeClick = this.onAddAttributeClick.bind(this);
    this.onBaseEntityTypeChange = this.onBaseEntityTypeChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
  }

  componentDidMount() {
    this.props.getBaseEntityTypeList();
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
    this.setState({
      baseEntityType: option.id
    });
  }

  onSubmit() {
    // TODO: Submit form data
    const { name, attributes, baseEntityType } = this.state;

    const data = {
      name,
      booking_attributes: attributes,
      base_entity_type_id: baseEntityType
    };

    console.log('data', data);
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
            value={attribute.is_required}
            onChange={onRequiredChange}
          />
          <label htmlFor={`attr-${index}-is-required`}>Required</label>
        </div>
      </div>
    );
  }

  render() {
    const { baseEntityType } = this.props;
    const { baseEntityTypeList } = baseEntityType;

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
                />
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
              <div className="form-control">
                <Select
                  className="select"
                  placeholder="Select Base Entity Type"
                  options={baseEntityTypeList}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={getBaseEntityTypeOption(
                    baseEntityTypeList,
                    this.state.baseEntityType
                  )}
                  onChange={this.onBaseEntityTypeChange}
                />
              </div>
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
