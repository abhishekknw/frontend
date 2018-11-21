import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './../Header';
import Sidebar from './../Sidebar';
import ChecklistContainer from './../../containers/ChecklistContainer';

//Actions
import * as AuthActions from '../../actions/auth';

import './index.css';

export default function Layout(props) {
  const { match, auth } = props;

  // Attempt auto-login, if not already logged in
  if (!auth.isLoggedIn) {
    props.dispatch(AuthActions.autoLogin());
  }

  // Redirect to login
  // if (auth.isLoggedOut) {
  //   return <Redirect to="/auth/login" />;
  // }

  return (
    <main>
      <Header {...props} />
      <Sidebar {...props} />
      <div className="wrapper">
        <div className="container">
          <Switch>
            <Route
              path={`${match.path}/checklist`}
              component={ChecklistContainer}
            />
          </Switch>
        </div>
      </div>
    </main>
  );
}
