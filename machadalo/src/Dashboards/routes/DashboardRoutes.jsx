import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  CLIENT_DASHBOARD_ROUTE,
  MACHADALO_DASHBOARD_ROUTE,
} from '../../constants/routes.constants';
import MachadaloRoutes from '../MachadaloDashboard/routes';
import ClientRoutes from '../ClientDashboard/routes';

export default function DashboardRoutes(props) {
  const { match } = props;

  return (
    <>
      <Switch>
        {/* <Route
            exact
            path={`${match.path}/dashboard`}
            render={(componentProps) => <MachadaloDashboard {...props} {...componentProps} />}
          /> */}
        <Route path={MACHADALO_DASHBOARD_ROUTE} component={MachadaloRoutes} />
        <Route path={CLIENT_DASHBOARD_ROUTE} component={ClientRoutes} />
      </Switch>
    </>
  );
}
