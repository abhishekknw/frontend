import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './index.css';

const ChecklistFieldTypes = [
  { value: 'TEXT', label: 'Textbox' },
  { value: 'BOOLEAN', label: 'Checkbox' }
];

export default class CreateChecklistTemplate extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    let campaign;
    for (let i = 0, l = this.props.campaign.list.length; i < l; i += 1) {
      if (
        this.props.campaign.list[i].campaign.proposal_id ===
        match.params.campaignId
      ) {
        campaign = this.props.campaign.list[i];
        break;
      }
    }

    this.state = {
      campaign,
      checklist_name: '',
      checklist_columns: [
        {
          key_name: '',
          key_type: '',
          order_id: 1
        }
      ]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderChecklistColumnAddForm = this.renderChecklistColumnAddForm.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChange(column, index) {
    const checklistColumns = this.state.checklist_columns.slice();

    checklistColumns.splice(index, 1, column);

    this.setState({
      checklist_columns: checklistColumns
    });
  }

  onAdd() {
    const checklistColumns = this.state.checklist_columns.slice();

    checklistColumns.push({
      key_name: '',
      key_type: '',
      order_id: checklistColumns.length + 1
    });

    this.setState({
      checklist_columns: checklistColumns
    });
  }

  onRemove(index) {
    const checklistColumns = this.state.checklist_columns.slice();

    checklistColumns.splice(index, 1);

    if (!checklistColumns.length) {
      checklistColumns.push({
        key_name: '',
        key_type: '',
        order_id: 1
      });
    }

    this.setState({
      checklist_columns: checklistColumns
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const data = {
      checklist_name: this.state.checklist_name,
      checklist_columns: this.state.checklist_columns.map(item =>
        Object.assign({}, item, {
          key_type: item.key_type.value
        })
      ),
      supplier_id: this.props.match.params.supplierId,
      checklist_type: 'supplier'
    };
    // Send request to create template
    this.props.postChecklistTemplate({
      campaignId: this.state.campaign.campaign.proposal_id,
      data
    });
  }

  renderChecklistColumnAddForm(column, index) {
    let newColumn = Object.assign({}, column);

    const onNameChange = event => {
      newColumn = Object.assign({}, newColumn, {
        key_name: event.target.value
      });

      this.handleChange(newColumn, index);
    };

    const onTypeChange = item => {
      newColumn = Object.assign({}, newColumn, {
        key_type: item
      });

      this.handleChange(newColumn, index);
    };

    const onRemove = () => {
      this.onRemove(index);
    };

    return (
      <div className="createform__form__inline" key={index}>
        <div className="form-control">
          <label>Field Name</label>
          <input type="text" value={column.key_name} onChange={onNameChange} />
        </div>
        <div className="form-control">
          <label>Field Type</label>
          <Select
            options={ChecklistFieldTypes}
            classNamePrefix="form-select"
            value={column.key_type}
            onChange={onTypeChange}
          />
        </div>
        <div className="form-action">
          <button type="button" className="btn btn--danger" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="createform">
        <div className="createform__title">
          <h3>Create/Edit Checklist Form</h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Enter Name For Checklist Form</label>
                <input
                  type="text"
                  name="checklist_name"
                  value={this.state.checklist_name}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            {this.state.checklist_columns.map(
              this.renderChecklistColumnAddForm
            )}
            <div className="createform__form__inline">
              <div className="createform__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onAdd}
                >
                  Add
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
      </div>
    );
  }
}

CreateChecklistTemplate.defaultProps = {
  postChecklistTemplate: () => {}
};

CreateChecklistTemplate.propTypes = {
  postChecklistTemplate: PropTypes.func
};
