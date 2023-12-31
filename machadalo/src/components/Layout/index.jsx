import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './../Header';
import Sidebar from './../Sidebar';
import Toastr from './../toastr';

import ChecklistContainer from './../../containers/ChecklistContainer';
import SupplierContainer from './../../containers/SupplierContainer';
import InventoryContainer from './../../containers/InventoryContainer';
import SettingContainer from './../../containers/SettingContainer';
import LeadsContainer from './../../containers/LeadsContainer';
import BookingContainer from './../../containers/BookingContainer';
import OperationsDashboardContainer from '../../containers/OperationsDashboardContainer';
// import B2bContainer from '../../containers/B2bContainer';
import './index.css';
import DashboardRoutes from '../../Dashboards/routes/DashboardRoutes';
import PagesRoutes from '../../Dashboards/Pages/routes/PagesRoutes';
import MachadaloHeader from '../../Dashboards/common/header/Header';
import ManageSupplier from '../../ManageSupplier/ManageSupplier';

export default class Layout extends React.Component {
  componentWillMount() {
    // Attempt auto-login, if not already logged in
    if (!this.props.auth.isLoggedIn) {
      this.props.autoLogin();
    }
    this.props.getCurrentUser();
  }

  render() {
    const { match } = this.props;

    // Redirect to login
    // if (auth.isLoggedOut) {
    //   return <Redirect to="/auth/login" />;
    // }
    let superUser = true;
    if (superUser) {
      return (
        <main>
          <Toastr />
          {/* <Header {...this.props} />
          <Sidebar {...this.props} /> */}
          <div className="container main-header">
            <MachadaloHeader />
          </div>
          {/* <hr className="mt-0" /> */}
          <div className="wrapper mt-2">
            <div className="container">
              <Switch>
                <Route path={`${match.path}/checklist`} component={ChecklistContainer} />

                <Route path={`${match.path}/supplier`} component={SupplierContainer} />
                <Route path={`${match.path}/inventory`} component={InventoryContainer} />

                <Route path={`${match.path}/settings`} component={SettingContainer} />

                <Route path={`${match.path}/leads`} component={LeadsContainer} />

                <Route path={`${match.path}/booking`} component={BookingContainer} />

                <Route
                  path={`${match.path}/operations-dashboard`}
                  component={OperationsDashboardContainer}
                />
                {/* <Route path={`${match.path}/b2b`} component={B2bContainer} /> */}
                <Route path={`${match.path}/dashboard`} component={DashboardRoutes} />
                <Route path={`${match.path}/manageSupplier`} component={ManageSupplier} />
                <Route path={`${match.path}/pages`} component={PagesRoutes} />
              </Switch>
            </div>
          </div>
        </main>
      );
    }
    return <>{/* <Route path={`${match.path}/b2b`} component={B2bContainer} /> */}</>;
  }
}
