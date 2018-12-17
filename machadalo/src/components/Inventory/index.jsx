import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './Create';
import List from './List';

import './index.css';

export default class Inventory extends React.Component {
  componentDidMount() {
    // TODO: Fetch entity types
  }

  render() {
    let { match } = this.props;

    return (
      <div className="inventory">
        <Switch>
          <Route
            exact
            path={`${match.path}/create`}
            render={componentProps => (
              <Create {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/list`}
            render={componentProps => (
              <List {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
