import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChecklistContainer from './ChecklistContainer';

import ActionCreators from './../actions';
import Toastr from '../components/toastr';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

class LayoutContainer extends Component {
  componentWillMount() {
    // console.log(this.props);
    // Attempt auto-login, if not already logged in
    if (!this.props.auth.isLoggedIn) {
      this.props.autoLogin();
    }
  }

  render() {
    return (
      <main>
        <Toastr />
        <Header {...this.props} />
        <Sidebar {...this.props} />
        <div className="wrapper">
          <div className="container">
            <Switch>
              <Route
                path={`${this.props.match.path}/checklist`}
                component={ChecklistContainer}
              />
            </Switch>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutContainer);
