import React from 'react';
import Modal from 'react-modal';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import Select from 'react-select';
import moment from 'moment';

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
  },
};

export default class AssignModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      release: {
        date: moment(),
        user: '',
      },
      closure: {
        date: moment(),
        user: '',
      },
      audit: {
        date: moment(),
        user: '',
      },
    };

    this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);
    this.handleReleaseUserChange = this.handleReleaseUserChange.bind(this);
    this.handleClosureDateChange = this.handleClosureDateChange.bind(this);
    this.handleClosureUserChange = this.handleClosureUserChange.bind(this);
    this.handleAuditDateChange = this.handleAuditDateChange.bind(this);
    this.handleAuditUserChange = this.handleAuditUserChange.bind(this);
  }

  componentDidMount() {
    // TODO: Fetch assigned
    this.props.getUsersList();
  }

  handleReleaseDateChange(date) {
    const { release } = this.state;

    this.setState({
      release: { ...release, date },
    });
  }

  handleReleaseUserChange(user) {
    const { release } = this.state;

    this.setState({
      release: { ...release, user },
    });
  }

  handleClosureDateChange(date) {
    const { closure } = this.state;

    this.setState({
      closure: { ...closure, date },
    });
  }

  handleClosureUserChange(user) {
    const { closure } = this.state;

    this.setState({
      closure: { ...closure, user },
    });
  }

  handleAuditDateChange(date) {
    const { audit } = this.state;

    this.setState({
      audit: { ...audit, date },
    });
  }

  handleAuditUserChange(user) {
    const { audit } = this.state;

    this.setState({
      audit: { ...audit, user },
    });
  }

  onSubmit(type) {
    const { campaign, inventory } = this.props;
    const group = this.state[type];

    const data = {
      ...campaign,
      inventory_name: inventory.inventory_name,
      assigned_to_id: group.user.id,
      activity_type: type.toUpperCase(),
      activity_date: moment(group.date).format('YYYY-MM-DD'),
    };

    console.log('data: ', data);
  }

  render() {
    const { user, isVisible, onClose } = this.props;
    const { userList } = user;
    const { release, closure, audit } = this.state;

    return (
      <Modal isOpen={isVisible} style={customStyles} ariaHideApp={false}>
        <div className="modal modal-assign">
          <div className="modal__header">
            <h3>Manage Activity Dates</h3>
          </div>
          <div className="modal__body">
            <form>
              <h5>Release</h5>
              <div className="modal-assign__group">
                <div className="form-control">
                  <DatetimePickerTrigger
                    moment={release.date}
                    onChange={this.handleReleaseDateChange}
                  >
                    <input type="text" value={release.date.format('YYYY-MM-DD')} readOnly />
                  </DatetimePickerTrigger>
                </div>
                <div className="form-control">
                  <Select
                    className="select"
                    options={userList}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.username}
                    onChange={this.handleReleaseUserChange}
                    value={release.user}
                  />
                </div>
              </div>

              <h5>Closure</h5>
              <div className="modal-assign__group">
                <div className="form-control">
                  <DatetimePickerTrigger
                    moment={closure.date}
                    onChange={this.handleClosureDateChange}
                  >
                    <input type="text" value={closure.date.format('YYYY-MM-DD')} readOnly />
                  </DatetimePickerTrigger>
                </div>
                <div className="form-control">
                  <Select
                    className="select"
                    options={userList}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.username}
                    onChange={this.handleClosureUserChange}
                    value={closure.user}
                  />
                </div>
              </div>

              <h5>Audit</h5>
              <div className="modal-assign__group">
                <div className="form-control">
                  <DatetimePickerTrigger moment={audit.date} onChange={this.handleAuditDateChange}>
                    <input type="text" value={audit.date.format('YYYY-MM-DD')} readOnly />
                  </DatetimePickerTrigger>
                </div>
                <div className="form-control">
                  <Select
                    className="select"
                    options={userList}
                    getOptionValue={(option) => option.id}
                    getOptionLabel={(option) => option.username}
                    onChange={this.handleAuditUserChange}
                    value={audit.user}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--danger"
              onClick={this.onSubmit.bind(this, 'release')}
            >
              Save
            </button>
            <button type="button" className="btn btn--danger" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
