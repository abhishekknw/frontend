import React from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import StarRatings from 'react-star-ratings';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';

import './index.css';

export default class FillChecklist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checklistEntries: {},
      moment: moment(),
      freezeChecklist: false
    };

    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.renderChecklistColumn = this.renderChecklistColumn.bind(this);
    this.renderChecklistRow = this.renderChecklistRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDateTimeChange = this.onDateTimeChange.bind(this);
    this.onCellChange = this.onCellChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onBack = this.onBack.bind(this);
    this.handleFreezeChecklist = this.handleFreezeChecklist.bind(this);
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
      if (
        this.props.checklist.details[this.props.match.params.checklistId]
          .checklist_info.status === 'frozen'
      ) {
        newState.freezeChecklist = true;
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

  onBack() {
    if (this.props.checklist) {
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

  handleFreezeChecklist() {
    let freezeChecklist = this.state.freezeChecklist ? 0 : 1;
    let checklistId = this.props.match.params.checklistId;
    this.props.freezeChecklistEntries({ checklistId, freezeChecklist }, () => {
      toastr.success('', 'Checklist updated successfully');
    });
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

  onDateTimeChange(moment, rowId, columnId) {
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

  onRatingChange(newRating, rowId, columnId) {
    if (!this.state.freezeChecklist) {
      this.handleEntryChange(rowId, columnId, newRating);
    }
  }

  renderInputField(column, inputClass, checklistEntries, rowId, columnId) {
    switch (column.column_type) {
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
            disabled={this.state.freezeChecklist}
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
            disabled={this.state.freezeChecklist}
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
            onChange={moment => this.onDateTimeChange(moment, rowId, columnId)}
          >
            <input
              type="text"
              value={dateValue.format('YYYY-MM-DD HH:mm')}
              readOnly
              disabled={this.state.freezeChecklist}
            />
          </DatetimePickerTrigger>
        );
      case 'RATING':
        return (
          <StarRatings
            rating={
              checklistEntries[rowId] && checklistEntries[rowId][columnId]
                ? checklistEntries[rowId][columnId].cell_value
                : 0
            }
            starRatedColor="rgb(230, 67, 47)"
            starHoverColor="black"
            starDimension="20px"
            starSpacing="1px"
            changeRating={newRating =>
              this.onRatingChange(newRating, rowId, columnId)
            }
            numberOfStars={5}
            name="rating"
          />
        );
      case 'NUMBER':
        return (
          <input
            type="number"
            value={
              checklistEntries[rowId] && checklistEntries[rowId][columnId]
                ? checklistEntries[rowId][columnId].cell_value
                : ''
            }
            onChange={event => this.onCellChange(event, rowId, columnId)}
            disabled={this.state.freezeChecklist}
          />
        );

      case 'RADIO':
        return (
          <div>
            {column.column_options.map(option => {
              return (
                <div>
                  <input
                    type="radio"
                    className={inputClass}
                    value={option}
                    onChange={event =>
                      this.onCellChange(event, rowId, columnId)
                    }
                    checked={
                      checklistEntries[rowId] &&
                      checklistEntries[rowId][columnId] &&
                      checklistEntries[rowId][columnId].cell_value === option
                        ? true
                        : false
                    }
                    disabled={this.state.freezeChecklist}
                  />{' '}
                  {option}
                </div>
              );
            })}
          </div>
        );

      case 'SELECT':
        let options = [];
        column.column_options.forEach(option => {
          options.push({ label: option, value: option });
        });
        return (
          <Select
            value={
              checklistEntries[rowId] && checklistEntries[rowId][columnId]
                ? {
                    label: checklistEntries[rowId][columnId].cell_value,
                    value: checklistEntries[rowId][columnId].cell_value
                  }
                : null
            }
            options={options}
            isDisabled={this.state.freezeChecklist}
            onChange={item =>
              this.handleEntryChange(rowId, columnId, item.value)
            }
          />
        );
      default:
        return;
    }
  }

  renderChecklistRow(row, rowIndex) {
    const { checklistDetails, checklistEntries } = this.state;
    const rowId = row.row_id;

    return (
      <div className="fillForm__form__row" key={`row-${rowIndex}`}>
        {checklistDetails.column_headers.map((column, columnIndex) => {
          const columnId = column.column_id;

          let inputClass = '';
          if (column.column_type === 'BOOLEAN') {
            inputClass = 'input-checkbox';
          } else if (column.column_type === 'RADIO') {
            inputClass = 'input-radio';
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
                      column,
                      inputClass,
                      checklistEntries,
                      rowId,
                      columnId
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
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.handleFreezeChecklist}
                >
                  {this.state.freezeChecklist
                    ? 'Unfreeze Checklist'
                    : 'Freeze Checklist'}
                </button>
              </div>
              {this.state.freezeChecklist ? (
                ''
              ) : (
                <div className="fillForm__form__action">
                  <button type="submit" className="btn btn--danger">
                    Submit
                  </button>
                </div>
              )}
              <div className="fillForm__form__action">
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={this.onBack}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
