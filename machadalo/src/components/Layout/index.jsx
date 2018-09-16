import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './../Header';
import Sidebar from './../Sidebar';
import ChecklistContainer from './../../containers/ChecklistContainer';

import './index.css';

export default function Layout(props) {
  const { match, autoLogin, auth } = props;

  // Attempt auto-login, if not already logged in
  if (!auth.isLoggedIn) {
    autoLogin();
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
            <Route path={`${match.path}/checklist`} {...props}>
              <ChecklistContainer {...props} />
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  );
}
