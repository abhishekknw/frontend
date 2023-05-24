import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import LayoutContainer from './../containers/LayoutContainer';
import SupplierRoutes from '../Dashboards/SupplierAgency/routes';
import ClientRoutes from '../Dashboards/ClientDashboard/routes';
import MachadaloRoutes from '../Dashboards/MachadaloDashboard/routes';
export default function Routes() {
  // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  let userInfo = 'BUSINESS';
  return (
    <Router>
      <Switch>
        {/* {
          userInfo.profile.organisation.category === "SUPPLIER_AGENCY" &&
          <Route path='/r/supplier' component={SupplierRoutes} />
        } */}
        {
          userInfo === "BUSINESS" &&
          <Route path='/r/Client' component={ClientRoutes} />
        }
        <Route path="/r/machadalo" component={MachadaloRoutes} />
        <Route path="/r" component={LayoutContainer} />
        <Route path="*">
          <Redirect to="/r/404" />
        </Route>
      </Switch>
    </Router>
  );
}
