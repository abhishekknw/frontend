import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './index.css';

const MAX_COLUMNS = 5;
const ColumnTypes = [
  { value: 'TEXT', label: 'Textbox' },
  { value: 'BOOLEAN', label: 'Checkbox' },
  { value: 'DATE', label: 'Date' }
];

// Get column option from string
const getColumnOption = value => {
  for (let i = 0, l = ColumnTypes.length; i < l; i += 1) {
    if (ColumnTypes[i].value === value) {
      return ColumnTypes[i];
    }
  }

  return { value };
};

const getDefaultColumns = () => {
  return [
    {
      column_name: '',
      column_type: getColumnOption('TEXT'),
      order_id: 1
    },
    {
      column_name: '',
      column_type: getColumnOption('BOOLEAN'),
      order_id: 2
    }
  ];
};

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
      checklist_columns: getDefaultColumns(),
      static_column_values: [
        {
          row_id: 1,
          cell_value: ''
        }
      ],
      isMaxColumnsReached: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderChecklistColumn = this.renderChecklistColumn.bind(this);
    this.renderChecklistRow = this.renderChecklistRow.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.onAddRow = this.onAddRow.bind(this);
    this.onAddColumn = this.onAddColumn.bind(this);
    this.onRowRemove = this.onRowRemove.bind(this);
    this.onColumnRemove = this.onColumnRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (
      !prevProps.checklist.templateCreateStatus &&
      this.props.checklist.templateCreateStatus === 'success'
    ) {
      this.props.history.push(
        `/r/checklist/list/${match.params.campaignId}/${
          match.params.supplierId
        }`
      );
    } else if (
      !prevProps.checklist.templateCreateStatus &&
      this.props.checklist.templateCreateStatus === 'error'
    ) {
      // TODO: Show failure message
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleColumnChange(column, index) {
    const checklistColumns = this.state.checklist_columns.slice();

    checklistColumns.splice(index, 1, column);

    this.setState({
      checklist_columns: checklistColumns
    });
  }

  handleRowChange(row, index) {
    const rows = this.state.static_column_values.slice();

    rows.splice(index, 1, row);

    this.setState({
      static_column_values: rows
    });
  }

  onAddRow() {
    const rows = this.state.static_column_values.slice();

    rows.push({
      row_id: rows.length + 1,
      cell_value: ''
    });

    this.setState({
      static_column_values: rows
    });
  }

  onAddColumn() {
    const checklistColumns = this.state.checklist_columns.slice();

    if (checklistColumns.length < MAX_COLUMNS) {
      checklistColumns.push({
        column_name: '',
        column_type: 'TEXT',
        order_id: checklistColumns.length + 1
      });

      this.setState({
        checklist_columns: checklistColumns
      });
    } else {
      this.setState({
        isMaxColumnsReached: true
      });
    }
  }

  onRowRemove(index) {
    const rows = this.state.static_column_values.slice();

    rows.splice(index, 1);

    if (!rows.length) {
      rows.push({
        row_id: 1,
        cell_value: ''
      });
    }

    this.setState({
      static_column_values: rows
    });
  }

  onColumnRemove(index) {
    const checklistColumns = this.state.checklist_columns.slice();

    checklistColumns.splice(index, 1);

    if (!checklistColumns.length) {
      checklistColumns.concat(getDefaultColumns());
    }

    this.setState({
      checklist_columns: checklistColumns
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const data = {
      checklist_name: this.state.checklist_name,
      checklist_type: 'supplier',
      supplier_id: this.props.match.params.supplierId,
      checklist_columns: this.state.checklist_columns.map(item =>
        Object.assign({}, item, {
          column_type: item.column_type.value
        })
      ),
      static_column_values: this.state.static_column_values
    };
    // Send request to create template
    this.props.postChecklistTemplate({
      campaignId: this.state.campaign.campaign.proposal_id,
      data
    });
  }

  renderChecklistColumn(column, columnIndex) {
    const onColumnNameChange = event => {
      const newColumn = Object.assign({}, column, {
        column_name: event.target.value
      });

      this.handleColumnChange(newColumn, columnIndex);
    };

    const onColumnTypeChange = item => {
      const newColumn = Object.assign({}, column, {
        column_type: item
      });

      this.handleColumnChange(newColumn, columnIndex);
    };

    const onRemove = () => {
      this.onColumnRemove(columnIndex);
    };

    return (
      <div className="createform__form__column" key={`col-${columnIndex}`}>
        <div className="createform__form__inline">
          <div className="form-control">
            <div>
              <input
                type="text"
                placeholder="Column Name"
                value={column.column_name}
                onChange={onColumnNameChange}
              />
              <Select
                options={ColumnTypes}
                classNamePrefix="form-select"
                value={column.column_type}
                onChange={onColumnTypeChange}
              />
              {columnIndex > 1 ? (
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={onRemove}
                >
                  Remove column
                </button>
              ) : (
                undefined
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderChecklistRow(row, rowIndex) {
    let newRow = Object.assign({}, row);

    const onLabelChange = event => {
      newRow = Object.assign({}, newRow, {
        cell_value: event.target.value
      });

      this.handleRowChange(newRow, rowIndex);
    };

    const onRemove = () => {
      this.onRowRemove(rowIndex);
    };

    return (
      <div className="createform__form__row" key={`row-${rowIndex}`}>
        {this.state.checklist_columns.map((column, columnIndex) => {
          return (
            <div
              className="createform__form__column"
              key={`row-${rowIndex}-column-${columnIndex}`}
            >
              <div className="createform__form__inline">
                <div className="form-control">
                  <input
                    type="text"
                    value={columnIndex === 0 ? row.cell_value : ''}
                    onChange={onLabelChange}
                    disabled={columnIndex !== 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="form-action">
          <button type="button" className="btn btn--link" onClick={onRemove}>
            &times;
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
            <div className="createform__form__header">
              {this.state.checklist_columns.map(this.renderChecklistColumn)}
            </div>
            {this.state.static_column_values.map(this.renderChecklistRow)}
            <div className="createform__form__inline">
              <div className="createform__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onAddRow}
                >
                  Add Row
                </button>
              </div>
              <div className="createform__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onAddColumn}
                  disabled={this.state.isMaxColumnsReached}
                >
                  Add Column
                </button>
              </div>
              <div className="createform__form__action">
                <button type="submit" className="btn btn--danger">
                  Submit
                </button>
              </div>
            </div>
            {this.state.isMaxColumnsReached ? (
              <p className="message message--error">
                Sorry! You can add a maximum of {MAX_COLUMNS} columns
              </p>
            ) : (
              undefined
            )}
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
