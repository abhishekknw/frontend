import React from 'react';

import './index.css';

export default class FillChecklist extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    let checklist;
    for (let i = 0, l = this.props.checklist.list.length; i < l; i += 1) {
      if (this.props.checklist.list[i].id === +match.params.checklistId) {
        checklist = this.props.checklist.list[i];
        break;
      }
    }

    this.state = {
      checklist,
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
    const { match, checklist } = this.props;
    const checklistDetails = checklist.details[match.params.checklistId];

    if (checklistDetails && !this.state.checklistDetails) {
      this.setState({
        checklistDetails
      });
    } else if (
      // Check fill status & redirect
      !prevProps.checklist.entryStatus &&
      this.props.checklist.entryStatus === 'success'
    ) {
      this.props.history.push(
        `/r/checklist/list/${this.state.checklist.campaign_id}/${
          this.state.checklist.supplier_id
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
      checklistId: this.state.checklist.id,
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

    return (
      <div className="fillForm">
        <div className="fillForm__title">
          <h3>
            Fill Checklist{' '}
            {this.state.checklist ? this.state.checklist.checklist_name : null}
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
