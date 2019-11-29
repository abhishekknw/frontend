import React from 'react';
import Select from 'react-select';
import request from 'superagent';
import config from '../../../config';
import GridHeader from '../../GridHeader';
import UserOverAllReport from './UserOverAllReport';

class UserAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: {},
      campaignList: [],
    };
  }

  componentDidMount() {
    request
      .get(`${config.API_URL}/v0/user/?organisation_id=MAC1421`)
      .set('Authorization', `JWT ${this.props.token}`)
      .then((resp) => {
        this.setState({
          users: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedUser: selectedOption,
    });
    if (this.state.selectedUser) {
      this.onSelect(selectedOption.value);
    }
  };

  onSelect = (userId) => {
    const { token } = this.props.auth;
    request
      .get(`${config.API_URL}/v0/ui/ops/user-analytics-today/?user_id=${userId}`)
      .set('Authorization', `JWT ${token}`)
      .then((resp) => {
        this.setState({
          campaignList: resp.body.data,
        });
      })
      .catch((ex) => {
        console.log('Failed to get data', ex);
      });
  };

  render() {
    const options = [];
    this.state.users.map((data) =>
      options.push({
        label: data.username,
        value: data.id,
      })
    );
    return (
      <div className="bootstrap-iso">
        <GridHeader headerValue="User Performance" />
        <div style={{ marginLeft: '-12px' }}>
          <label className="mt-4 col-md-2" style={{ marginLeft: '6px', fontWeight: '500' }}>
            Select User
          </label>
          <Select
            className="mt-1 col-md-6 col-offset-4"
            options={options}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </div>
        <div>
          {this.state.campaignList.length > 0 ? (
            <UserOverAllReport campaignList={this.state.campaignList} />
          ) : (
            <div className="alert alert-info" role="alert" style={{ marginTop: '2em' }}>
              No supplier assigned to this user !
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserAnalytics;
