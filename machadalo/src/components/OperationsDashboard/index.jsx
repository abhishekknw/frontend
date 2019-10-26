import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignAnalytics from './CampaignAnalytics';
import SupplierCampaignStatusSummary from './SupplierAnalytics/SupplierCampaignStatusSummary';

class OperationsDashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getTappingDetails();
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            render={(componentProps) => <CampaignAnalytics {...this.props} {...componentProps} />}
          />
          <Route
            exact
            path={`${match.path}/:campaignId`}
            render={(componentProps) => (
              <SupplierCampaignStatusSummary {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default OperationsDashboard;
