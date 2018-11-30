import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateType from './CreateType';
import Create from './Create';

import './index.css';

export default class Entity extends React.Component {
  componentDidMount() {
    // TODO: Fetch entity types
  }

  render() {
    let { match } = this.props;

    return (
      <div className="entity">
        <Switch>
          <Route
            exact
            path={`${match.path}/types/create`}
            render={componentProps => (
              <CreateType {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/create`}
            render={componentProps => (
              <Create {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
