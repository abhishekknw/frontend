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

const customSelectStyles = {
  input: () => ({
    height: '24px'
  })
};

export default class FillEntityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEntityType: undefined
    };
    this.renderAttributeRow = this.renderAttributeRow.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectEntityType = this.onSelectEntityType.bind(this);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
    this.renderInputField = this.renderInputField.bind(this);
  }

  componentWillMount() {
    this.setState({
      selectedEntityType: this.props.selectedEntityType
    });
  }

  componentWillUnmount() {
    this.setState({
      selectedEntityType: undefined
    });
  }

  onSelectEntityType(selectedEntityType) {
    this.setState({
      selectedEntityType
    });
  }

  handleInputChange(event, option) {
    let { selectedEntityType } = this.state;
    selectedEntityType.entity_attributes.forEach(attribute => {
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

    this.props.onSubmit(selectedEntityType, this.props.columnInfo);
  }

  renderAttributeRow(attribute, attrIndex) {
    if (attribute.isChecked === false) {
      return;
    }
    return (
      <div className="createform__form__row" key={`row-${attrIndex}`}>
        <div className="createform__form__inline entity-modal-input">
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

  handleAttributeChange(attribute, index) {
    const selectedEntityType = Object.assign({}, this.state.selectedEntityType);

    selectedEntityType.entity_attributes.splice(index, 1, attribute);

    this.setState({
      selectedEntityType
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
            styles={customSelectStyles}
            options={attributeValueOptions}
            value={{ label: attribute.value, value: attribute.value }}
            onChange={onDropDownAttributeValueChange}
          />
        );
      default:
        return;
    }
  }

  render() {
    let { columnInfo } = this.props;
    let { selectedEntityType } = this.state;
    return (
      <Modal
        isOpen={this.props.showOptionModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal-title">
          <h3>
            Fill Attributes for{' '}
            {selectedEntityType.type === 'ENTITY_TYPE'
              ? 'Entity Type'
              : ' Base Entity Type'}
          </h3>
        </div>
        <br />
        <div className="">
          <div className="createform">
            <div className="createform__form">
              <div className="createform__form__inline">
                <div className="title">
                  {columnInfo.attribute.type +
                    ': ' +
                    this.state.selectedEntityType.label}
                </div>
              </div>
              <div className="createform__form">
                {selectedEntityType
                  ? selectedEntityType.entity_attributes.map(
                      this.renderAttributeRow
                    )
                  : undefined}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() => this.onSubmit(selectedEntityType, columnInfo)}
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
        </div>
      </Modal>
    );
  }
}
