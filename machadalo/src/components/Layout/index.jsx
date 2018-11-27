import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './../Header';
import Sidebar from './../Sidebar';
import Toastr from './../toastr';

import ChecklistContainer from './../../containers/ChecklistContainer';
import EntityContainer from './../../containers/EntityContainer';

import './index.css';

export default class Layout extends React.Component {
  componentWillMount() {
    // console.log(this.props);
    // Attempt auto-login, if not already logged in
    if (!this.props.auth.isLoggedIn) {
      this.props.autoLogin();
    }
  }

  render() {
    const { match } = this.props;

    // Redirect to login
    // if (auth.isLoggedOut) {
    //   return <Redirect to="/auth/login" />;
    // }

    return (
      <main>
        <Toastr />
        <Header {...this.props} />
        <Sidebar {...this.props} />
        <div className="wrapper">
          <div className="container">
            <Switch>
              <Route
                path={`${match.path}/checklist`}
                component={ChecklistContainer}
              />

              <Route
                path={`${match.path}/entity`}
                component={EntityContainer}
              />
            </Switch>
          </div>
        </div>
      </main>
    );
  }
}
