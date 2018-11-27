import React from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';

import './index.css';

export default class FillChecklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checklistEntries: {},
      moment: moment()
    };

    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.renderChecklistColumn = this.renderChecklistColumn.bind(this);
    this.renderChecklistRow = this.renderChecklistRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    this.props.getSingleChecklist({
      checklistId: match.params.checklistId
    });
  }

  componentDidUpdate(prevProps) {
    const { checklist } = this.props;
    const checklistDetails =
      checklist.details[this.props.match.params.checklistId];

    if (checklistDetails && !this.state.checklistDetails) {
      const newState = {
        checklistDetails
      };

      const checklistEntries = {};
      for (let i = 0, l = checklistDetails.values.length; i < l; i += 1) {
        if (!checklistEntries[checklistDetails.values[i].row_id]) {
          checklistEntries[checklistDetails.values[i].row_id] = {};
        }
        checklistEntries[checklistDetails.values[i].row_id][
          checklistDetails.values[i].column_id
        ] = {
          column_id: checklistDetails.values[i].column_id,
          cell_value: checklistDetails.values[i].value
        };
      }

      if (Object.keys(checklistEntries).length) {
        newState.checklistEntries = checklistEntries;
      }

      this.setState(newState);
    } else if (
      // Check fill status & redirect
      !prevProps.checklist.entryStatus &&
      this.props.checklist.entryStatus === 'success'
    ) {
      let checklistInfo = this.props.checklist.details[
        this.props.match.params.checklistId
      ].checklist_info;
      if (checklistInfo.checklist_type === 'supplier') {
        this.props.history.push(
          `/r/checklist/list/${checklistInfo.campaign_id}/${
            checklistInfo.supplier_id
          }`
        );
      } else {
        this.props.history.push(
          `/r/checklist/list/${checklistInfo.campaign_id}`
        );
      }
    }
  }

  handleEntryChange(rowId, columnId, value, inputType) {
    const newchecklistEntries = Object.assign({}, this.state.checklistEntries);
    if (inputType === 'checkbox') {
      value = value === 'true' ? true : false;
    }

    if (!newchecklistEntries[rowId]) {
      newchecklistEntries[rowId] = {};
    }
    newchecklistEntries[rowId][columnId] = {
      column_id: columnId,
      cell_value: value
    };

    this.setState({
      checklistEntries: newchecklistEntries
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const { checklistEntries } = this.state;

    // Send request to create template
    this.props.postChecklistEntries({
      checklistId: this.props.match.params.checklistId,
      data: checklistEntries
    });
  }

  renderChecklistColumn(column, columnIndex) {
    return (
      <div className="fillForm__form__column" key={`col-${columnIndex}`}>
        <div className="fillForm__form__inline">
          <div className="form-control">
            <div>{column.column_name}</div>
          </div>
        </div>
      </div>
    );
  }

  onDateChange(moment) {
    this.setState({
      moment
    });
  }

  handleDateTimeChange(moment, rowId, columnId) {
    this.handleEntryChange(
      rowId,
      columnId,
      moment.format('YYYY-MM-DD HH:mm'),
      'dateTime'
    );
    this.setState({
      moment
    });
  }

  onCellChange(event, rowId, columnId) {
    if (event.target.type === 'checkbox') {
      event.target.value = event.target.checked ? true : false;
    }
    this.handleEntryChange(
      rowId,
      columnId,
      event.target.value,
      event.target.type
    );
  }

  renderInputField(columnType, inputClass, checklistEntries, rowId, columnId) {
    switch (columnType) {
      case 'TEXT':
        return (
          <input
            className={inputClass}
            type="text"
            value={
              checklistEntries[rowId] && checklistEntries[rowId][columnId]
                ? checklistEntries[rowId][columnId].cell_value
                : ''
            }
            onChange={event => this.onCellChange(event, rowId, columnId)}
          />
        );

      case 'BOOLEAN':
        return (
          <input
            className={inputClass}
            type="checkbox"
            checked={
              checklistEntries[rowId] && checklistEntries[rowId][columnId]
                ? checklistEntries[rowId][columnId].cell_value
                : false
            }
            onChange={event => this.onCellChange(event, rowId, columnId)}
          />
        );
      case 'DATETIME':
        let dateValue =
          checklistEntries[rowId] && checklistEntries[rowId][columnId]
            ? moment(checklistEntries[rowId][columnId].cell_value)
            : moment();
        return (
          <DatetimePickerTrigger
            moment={this.state.moment}
            onChange={moment =>
              this.handleDateTimeChange(moment, rowId, columnId)
            }
          >
            <input
              type="text"
              value={dateValue.format('YYYY-MM-DD HH:mm')}
              readOnly
            />
          </DatetimePickerTrigger>
        );
    }
  }

  renderChecklistRow(row, rowIndex) {
    const { checklistDetails, checklistEntries } = this.state;
    const rowId = row.row_id;

    return (
      <div className="fillForm__form__row" key={`row-${rowIndex}`}>
        {checklistDetails.column_headers.map((column, columnIndex) => {
          const columnId = column.column_id;

          const onCellChange = event => {
            if (event.target.type === 'checkbox') {
              event.target.value = event.target.checked ? true : false;
            }
            this.handleEntryChange(
              rowId,
              columnId,
              event.target.value,
              event.target.type
            );
          };
          let inputClass = '';
          if (column.column_type === 'BOOLEAN') {
            inputClass = 'input-checkbox';
          }

          return (
            <div
              className="fillForm__form__column"
              key={`row-${rowIndex}-column-${columnIndex}`}
            >
              <div className="fillForm__form__inline">
                <div className="form-control">
                  {columnIndex === 0 ? (
                    <label>{row.cell_value}</label>
                  ) : (
                    this.renderInputField(
                      column.column_type,
                      inputClass,
                      checklistEntries,
                      rowId,
                      columnId,
                      onCellChange
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { checklistDetails } = this.state;
    let { checklist } = this.props;

    return (
      <div className="fillForm">
        <div className="fillForm__title">
          <h3>
            Fill Checklist{' '}
            {Object.keys(checklist.details).length !== 0
              ? checklist.checklist_name
              : null}
          </h3>
        </div>
        <div className="fillForm__form">
          <form onSubmit={this.onSubmit}>
            <div className="fillForm__form__header">
              {checklistDetails && checklistDetails.column_headers
                ? checklistDetails.column_headers.map(
                    this.renderChecklistColumn
                  )
                : undefined}
            </div>
            <div>
              {checklistDetails && checklistDetails.row_headers
                ? checklistDetails.row_headers.map(this.renderChecklistRow)
                : undefined}
            </div>
            <div className="fillForm__form__inline">
              <div className="fillForm__form__action">
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
