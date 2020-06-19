import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CampaignAnalytics from './CampaignAnalytics';
import SupplierList from './SupplierAnalytics/SupplierList';
import UserAnalytics from './UserAnalytics';
import CitywiseAnalytics from './CitywiseAnalytics';
import EntityCityWiseCount from './CitywiseAnalytics/EntityCityWiseCount';
import EntityList from './CitywiseAnalytics/EntityList';

class OperationsDashboard extends Component {
  constructor(props) {
    super(props);
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
            path={`${match.path}/entity`}
            render={(componentProps) => <CitywiseAnalytics {...this.props} {...componentProps} />}
          />
          <Route
            exact
            path={`${match.path}/city/:type`}
            render={(componentProps) => <EntityCityWiseCount {...this.props} {...componentProps} />}
          />
          <Route
            exact
            path={`${match.path}/city/:type/?city=:city`}
            render={(componentProps) => <EntityList {...this.props} {...componentProps} />}
          />
          <Route
            exact
            path={`${match.path}/city/:type/suppliers`}
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
