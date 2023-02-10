import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import B2bDashboard from '../index';
import Header from '../common/b2bHeader';

export default function B2bRoutes(props) {
  const { match } = props;

  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path={`${match.path}/dashboard`}
          render={(componentProps) => <B2bDashboard {...props} {...componentProps} />}
        />
      </Switch>
    </>
  );
}
