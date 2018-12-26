import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Create from './Create';
import List from './List';
import EditEntity from './EditEntity';
import EditEntityType from './EditEntityType';

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
          <Route
            exact
            path={`${match.path}/edit/:entityId`}
            render={componentProps => (
              <EditEntity {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/type/edit/:entityTypeId`}
            render={componentProps => (
              <EditEntityType {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
