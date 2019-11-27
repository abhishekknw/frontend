import React from 'react';
import Select from 'react-select';
import request from 'superagent';
import config from '../../../config';

class UserAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: {},
    };
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedUser: selectedOption,
    });
  };

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
        <div style={{ marginTop: '5em', display: 'flex' }}>
          <label className="mt-4 col-md-3">Select User : </label>
          <Select
            className="mt-4 col-md-6"
            options={options}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </div>
      </div>
    );
  }
}

export default UserAnalytics;
