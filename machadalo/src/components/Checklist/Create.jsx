import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import OptionModal from '../Modals/OptionModal';

import './index.css';

const MAX_COLUMNS = 12;
const ColumnTypes = [
  { value: 'TEXT', label: 'Textbox' },
  { value: 'BOOLEAN', label: 'Checkbox' },
  { value: 'DATETIME', label: 'Date Time' },
  { value: 'RATING', label: 'Rating' },
  { value: 'NUMBER', label: 'Number' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'RADIO', label: 'Radio' },
  { value: 'SELECT', label: 'Select' }
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

    this.state = {
      checklist_type: 'supplier',
      checklist_name: '',
      checklist_columns: getDefaultColumns(),
      showOptionModal: false,
      columnOptions: [''],
      columnInfo: {},
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
    this.onBack = this.onBack.bind(this);
    this.onCancelOptionModal = this.onCancelOptionModal.bind(this);
    this.onSubmitOptionModal = this.onSubmitOptionModal.bind(this);
    this.onOpenOptionModal = this.onOpenOptionModal.bind(this);
  }

  componentWillMount() {
    if (!this.props.match.params.supplierId) {
      this.setState({
        checklist_type: 'campaign'
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (
      !prevProps.checklist.templateCreateStatus &&
      this.props.checklist.templateCreateStatus === 'success'
    ) {
      toastr.success('', 'Checklist created successfully');
      if (this.state.checklist_type === 'supplier') {
        this.props.history.push(
          `/r/checklist/list/${match.params.campaignId}/${
            match.params.supplierId
          }`
        );
      } else {
        this.props.history.push(`/r/checklist/list/${match.params.campaignId}`);
      }
    } else if (
      !prevProps.checklist.templateCreateStatus &&
      this.props.checklist.templateCreateStatus === 'error'
    ) {
      toastr.error('', 'Could not create checklist. Please try again later.');
    }
  }

  onBack() {
    const { match } = this.props;

    if (this.state.checklist_type === 'supplier') {
      this.props.history.push(
        `/r/checklist/list/${match.params.campaignId}/${
          match.params.supplierId
        }`
      );
    } else {
      this.props.history.push(`/r/checklist/list/${match.params.campaignId}`);
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

  onOpenOptionModal(options, columnType, column, columnIndex) {
    this.setState({
      showOptionModal: true,
      columnOptions: options,
      columnInfo: {
        columnType,
        column,
        columnIndex
      }
    });
  }

  onCancelOptionModal() {
    this.setState({
      showOptionModal: false,
      columnOptions: [''],
      columnInfo: {}
    });
  }

  onSubmitOptionModal(options, columnInfo) {
    this.setState({
      showOptionModal: false,
      columnOptions: [''],
      columnInfo: {}
    });

    let newColumn = Object.assign({}, columnInfo.column, {
      column_type: columnInfo.columnType,
      column_options: options
    });
    this.handleColumnChange(newColumn, columnInfo.columnIndex);
  }

  onSubmit(event) {
    event.preventDefault();

    let error = false;
    const data = {
      checklist_name: this.state.checklist_name,
      checklist_type: this.state.checklist_type,
      supplier_id: this.props.match.params.supplierId,
      checklist_columns: this.state.checklist_columns.map(item =>
        Object.assign({}, item, {
          column_type: item.column_type.value
        })
      ),
      static_column_values: this.state.static_column_values
    };
    data.static_column_values.forEach(static_value => {
      if (static_value.cell_value === '') {
        error = true;
        toastr.error('', 'Please enter data in the Static Data field');
        return false;
      }
    });
    data.checklist_columns.forEach(column => {
      if (!column.column_type) {
        error = true;
        toastr.error('', 'Please select column type for each column');
        return false;
      }
    });

    if (error) {
      return;
    }
    // Send request to create template
    this.props.postChecklistTemplate({
      campaignId: this.props.match.params.campaignId,
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
      if (item.value === 'RADIO' || item.value === 'SELECT') {
        this.setState({
          showOptionModal: true,
          columnOptions: [''],
          columnInfo: {
            columnType: item,
            column,
            columnIndex
          }
        });
        return;
      }

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
              )}{' '}
              {column.column_type &&
              (column.column_type.value === 'RADIO' ||
                column.column_type.value === 'SELECT') ? (
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={() =>
                    this.onOpenOptionModal(
                      column.column_options,
                      column.column_type,
                      column,
                      columnIndex
                    )
                  }
                >
                  Show Options
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
          <h3>Create Checklist Form</h3>
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
              <div className="createform__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onBack}
                >
                  Back
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
        <OptionModal
          showOptionModal={this.state.showOptionModal}
          onCancel={this.onCancelOptionModal}
          onSubmit={this.onSubmitOptionModal}
          options={this.state.columnOptions}
          columnInfo={this.state.columnInfo}
        />
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
