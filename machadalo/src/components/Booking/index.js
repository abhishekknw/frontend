import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Base from './Base';
import Template from './Template';
import Campaigns from './Campaigns';
import Edit from './Edit';

import './index.css';

export default class Booking extends React.Component {
  componentDidMount() {
    // TODO: Fetch entity types
  }

  render() {
    const { match } = this.props;

    return (
      <div className="booking">
        <Switch>
          <Route
            path={`${match.path}/base`}
            render={componentProps => (
              <Base {...this.props} {...componentProps} />
            )}
          />
          <Route
            path={`${match.path}/template`}
            render={componentProps => (
              <Template {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/campaigns`}
            render={componentProps => (
              <Campaigns {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/edit/:campaignId`}
            render={componentProps => (
              <Edit {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
