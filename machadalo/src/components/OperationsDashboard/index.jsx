import React, { Component } from 'react';
import CampaignAnalytics from './CampaignAnalytics';

class OperationsDashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getTappingDetails();
  }

  render() {
    return <CampaignAnalytics tappingDetails={this.props.tappingDetails} />;
  }
}

export default OperationsDashboard;
