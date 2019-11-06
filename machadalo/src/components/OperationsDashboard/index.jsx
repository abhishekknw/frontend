import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignAnalytics from './CampaignAnalytics';
import SupplierList from './SupplierAnalytics/SupplierList';

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
            path={`${match.path}/:campaignId/:status/supplier`}
            render={(componentProps) => <SupplierList {...this.props} {...componentProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default OperationsDashboard;
