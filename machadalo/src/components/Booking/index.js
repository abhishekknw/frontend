import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Base from './Base';
import Campaigns from './Campaigns';

export default class Leads extends React.Component {
  componentDidMount() {
    // TODO: Fetch entity types
  }

  render() {
    let { match } = this.props;

    return (
      <div className="booking">
        <Switch>
          <Route
            exact
            path={`${match.path}/base`}
            render={componentProps => (
              <Base {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/campaigns`}
            render={componentProps => (
              <Campaigns {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
