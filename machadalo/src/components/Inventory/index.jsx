import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './Create';

import './inventory.css';

export default class Inventory extends React.Component {
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
