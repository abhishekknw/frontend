import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignAnalytics from './CampaignAnalytics';
import SupplierList from './SupplierAnalytics/SupplierList';
import UserAnalytics from './UserAnalytics';

class OperationsDashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
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
            path={`${match.path}/:campaignId/suppliers`}
            render={(componentProps) => <SupplierList {...this.props} {...componentProps} />}
          />
          <Route
            exact
            path={`${match.path}/user`}
            render={(componentProps) => <UserAnalytics {...this.props} {...componentProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default OperationsDashboard;
