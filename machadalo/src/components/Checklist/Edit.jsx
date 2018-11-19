import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import './index.css';

const MAX_COLUMNS = 12;
const ColumnTypes = [
  { value: 'TEXT', label: 'Textbox' },
  { value: 'BOOLEAN', label: 'Checkbox' },
  { value: 'DATE', label: 'Date' }
];

const getColumnOption = value => {
  for (let i = 0, l = ColumnTypes.length; i < l; i += 1) {
    if (ColumnTypes[i].value === value) {
      return ColumnTypes[i];
    }
  }

  return { value };
};

export default class CreateChecklistTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checklist_name: '',
      checklist_columns: [],
      static_column_values: [],
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

  componentDidMount() {
    const { match } = this.props;

    this.props.getSingleChecklist({
      checklistId: match.params.checklistId
    });
    this.props.updateChecklistTemplateStart();
  }

  componentDidUpdate(prevProps) {
    const { match, checklist } = this.props;
    const checklistDetails = checklist.details[match.params.checklistId];

    if (
      checklistDetails &&
      parseInt(match.params.checklistId) !== this.state.checklist_id
    ) {
      this.setState({
        checklist_id:
          checklist.details[match.params.checklistId].checklist_info
            .checklist_id,
        checklist_name:
          checklist.details[match.params.checklistId].checklist_info
            .checklist_name,
        checklist_columns:
          checklist.details[match.params.checklistId].column_headers,
        static_column_values:
          checklist.details[match.params.checklistId].row_headers
      });
    }

    if (
      !prevProps.checklist.templateUpdateStatus &&
      this.props.checklist.templateUpdateStatus === 'success'
    ) {
      toastr.success('', 'Checklist updated successfully');
      if (
        checklist.details[match.params.checklistId].checklist_info
          .checklist_type === 'supplier'
      ) {
        this.props.history.push(
          `/r/checklist/list/${
            checklist.details[match.params.checklistId].checklist_info
              .campaign_id
          }/${
            checklist.details[match.params.checklistId].checklist_info
              .supplier_id
          }`
        );
      } else {
        this.props.history.push(
          `/r/checklist/list/${
            checklist.details[match.params.checklistId].checklist_info
              .campaign_id
          }`
        );
      }
    } else if (
      !prevProps.checklist.templateUpdateStatus &&
      this.props.checklist.templateUpdateStatus === 'error'
    ) {
      toastr.error('', 'Could not update checklist. Please try again later.');
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
      cell_value: '',
      status: 'create'
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
        order_id: checklistColumns.length + 1,
        status: 'create'
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
    const deleteRows = this.state.delete_rows ? this.state.delete_rows : [];

    if (rows[index].status !== 'create') {
      deleteRows.push(rows[index].row_id);
    }
    rows.splice(index, 1);

    if (!rows.length) {
      rows.push({
        row_id: 1,
        cell_value: ''
      });
    }

    this.setState({
      static_column_values: rows,
      delete_rows: deleteRows
    });
  }

  onColumnRemove(index) {
    const checklistColumns = this.state.checklist_columns.slice();
    let deleteColumns = this.state.delete_columns
      ? this.state.delete_columns
      : [];

    if (checklistColumns[index].status !== 'create') {
      deleteColumns.push(checklistColumns[index].column_id);
    }

    checklistColumns.splice(index, 1);

    if (!checklistColumns.length) {
      checklistColumns.concat(this.state.checklist_columns);
    }

    this.setState({
      checklist_columns: checklistColumns,
      delete_columns: deleteColumns
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let error = false;
    let new_checklist_columns = [];
    let new_static_column_values = [];
    const data = {
      checklist_columns: this.state.checklist_columns.filter(item => {
        let newColumnFlag = true;
        if (item.status === 'create') {
          newColumnFlag = false;
          delete item.status;
          new_checklist_columns.push(item);
        }
        return newColumnFlag;
      }),
      static_column_values: this.state.static_column_values.filter(item => {
        let newStaticDataFlag = true;
        if (item.status === 'create') {
          newStaticDataFlag = false;
          delete item.status;
          new_static_column_values.push(item);
        }
        return newStaticDataFlag;
      })
    };
    data.new_checklist_columns = new_checklist_columns;
    data.new_static_column_values = new_static_column_values;
    data.delete_rows = this.state.delete_rows;
    this.state.static_column_values.forEach(static_value => {
      if (static_value.cell_value === '') {
        error = true;
        toastr.error('', 'Please enter data in the Static Data field');
        return false;
      }
    });
    if (error) {
      return;
    }

    // Send request to create template
    this.props.updateChecklistTemplate({
      checklistId: this.props.match.params.checklistId,
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
        column_type: item.value
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
                value={getColumnOption(column.column_type)}
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
                    placeholder="Static Data"
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
          <h3>Edit Checklist Form</h3>
        </div>
        <div className="createform__form">
          <form onSubmit={this.onSubmit}>
            <div className="createform__form__inline">
              <div className="form-control">
                <label>*Checklist Form</label>
                <input
                  type="text"
                  name="checklist_name"
                  value={this.state.checklist_name}
                  disabled
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
