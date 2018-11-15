import React from 'react';

import './index.css';

export default class FillChecklist extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      checklistEntries: {}
    };

    this.handleEntryChange = this.handleEntryChange.bind(this);
    this.renderChecklistColumn = this.renderChecklistColumn.bind(this);
    this.renderChecklistRow = this.renderChecklistRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      this.props.history.push(
        `/r/checklist/list/${checklistInfo.campaign_id}/${
          checklistInfo.supplier_id
        }`
      );
    }
  }

  handleEntryChange(rowId, columnId, value) {
    const newchecklistEntries = Object.assign({}, this.state.checklistEntries);

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

  renderChecklistRow(row, rowIndex) {
    const { checklistDetails, checklistEntries } = this.state;
    const rowId = row.row_id;

    return (
      <div className="fillForm__form__row" key={`row-${rowIndex}`}>
        {checklistDetails.column_headers.map((column, columnIndex) => {
          const columnId = column.column_id;

          const onCellChange = event => {
            this.handleEntryChange(rowId, columnId, event.target.value);
          };

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
                    <input
                      type="text"
                      value={
                        checklistEntries[rowId] &&
                        checklistEntries[rowId][columnId]
                          ? checklistEntries[rowId][columnId].cell_value
                          : ''
                      }
                      onChange={onCellChange}
                    />
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
