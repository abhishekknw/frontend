import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateType from './EntityType/CreateType';
import CreateEntity from './Entity/CreateEntity';
import EntityList from './Entity/EntityList';
import EntityTypeList from './EntityType/EntityTypeList';
import EditEntity from './Entity/EditEntity';
import EditEntityType from './EntityType/EditEntityType';

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
              <CreateEntity {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/type/create`}
            render={componentProps => (
              <CreateType {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/type/list`}
            render={componentProps => (
              <EntityTypeList {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/list`}
            render={componentProps => (
              <EntityList {...this.props} {...componentProps} />
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
