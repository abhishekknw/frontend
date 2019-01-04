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
    let entityType =
      this.props.attributeInfo.attributeType === 'ENTITY_TYPE'
        ? 'entityType'
        : 'baseEntityType';
    if (
      this.state.entityTypeOption.length !==
      this.props[entityType][entityType + 'List'].length
    ) {
      let entityTypeOption = [];
      this.props[entityType][entityType + 'List'].forEach(entityType => {
        entityTypeOption.push({
          value: entityType.id,
          label: entityType.name,
          entity_attributes: entityType.entity_attributes.map(
            entity_attribute => {
              if (entity_attribute.hasOwnProperty('isChecked')) {
                return entity_attribute;
              }
              let attribute = Object.assign({}, entity_attribute);
              attribute.isChecked = true;
              return attribute;
            }
          )
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

    this.props.onSubmit(selectedEntityType, this.props.attributeInfo);
  }

  renderOptionRow(option, optionIndex) {
    return (
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
    );
  }

  render() {
    let { attributeInfo } = this.props;
    let { selectedEntityType } = this.state;
    return (
      <Modal
        isOpen={this.props.showOptionModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="modal-title">
          <h3>
            Select Attributes for{' '}
            {attributeInfo.attributeType === 'ENTITY_TYPE'
              ? 'Entity Type'
              : ' Base Entity Type'}
          </h3>
        </div>
        <br />
        <div className="createform">
          <div className="createform__form">
            <div className="createform__form__inline">
              <div className="form-control">
                <label>
                  *Select{' '}
                  {attributeInfo.attributeType === 'ENTITY_TYPE'
                    ? 'Entity Type'
                    : ' Base Entity Type'}
                </label>
                <Select
                  options={this.state.entityTypeOption}
                  value={this.state.selectedEntityType}
                  onChange={this.onSelectEntityType}
                />
              </div>
            </div>
            <div className="createform__form__inline">
              {selectedEntityType
                ? selectedEntityType.entity_attributes.map(this.renderOptionRow)
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
