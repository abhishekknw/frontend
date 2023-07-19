import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LayoutContainer from './../containers/LayoutContainer';
import SupplierRoutes from '../Dashboards/SupplierAgency/routes';
import ClientRoutes from '../Dashboards/ClientDashboard/routes';
import MachadaloRoutes from '../Dashboards/MachadaloDashboard/routes';
import DashboardRoutes from '../Dashboards/routes/DashboardRoutes';
import { DASHBOARD_ROUTE } from '../constants/routes.constants';
import PagesRoutes from '../Dashboards/Pages/routes/PagesRoutes';
export default function Routes() {
  // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  let userInfo = 'BUSINESS';
  return (
    <Router>
      <Switch>
        {/* <Route path="/r" component={PagesRoutes} /> */}
        <Route path="/r" component={LayoutContainer} />
        <Route path="*">
          <Redirect to="/r/404" />
        </Route>
      </Switch>
    </Router>
  );
}
