import React from 'react';
import EntityCount from './EntityCount';

class CitywiseAnalytics extends React.Component {
  constructor(props) {
    super(props);
    const { token } = this.props.auth;
    this.state = {
      token,
    };
  }

  render() {
    return (
      <div>
        <EntityCount token={this.state.token} />
      </div>
    );
  }
}

export default CitywiseAnalytics;
