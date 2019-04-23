import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateType from './SupplierType/CreateType';
import CreateBaseType from './BaseSupplierType/CreateBaseType';
import CreateSupplier from './Supplier/CreateSupplier';
import SupplierList from './Supplier/SupplierList';
import SupplierTypeList from './SupplierType/SupplierTypeList';
import BaseSupplierTypeList from './BaseSupplierType/BaseSupplierTypeList';
import EditSupplier from './Supplier/EditSupplier';
import EditSupplierType from './SupplierType/EditSupplierType';
import EditBaseSupplierType from './BaseSupplierType/EditBaseSupplierType';

import './index.css';

export default class Supplier extends React.Component {
  componentDidMount() {
    // TODO: Fetch supplier types
  }

  render() {
    let { match } = this.props;

    return (
      <div className="supplier">
        <Switch>
          <Route
            exact
            path={`${match.path}/create`}
            render={componentProps => (
              <CreateSupplier {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/list`}
            render={componentProps => (
              <SupplierList {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/edit/:supplierId`}
            render={componentProps => (
              <EditSupplier {...this.props} {...componentProps} />
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
              <SupplierTypeList {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/type/edit/:supplierTypeId`}
            render={componentProps => (
              <EditSupplierType {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/base-type/create`}
            render={componentProps => (
              <CreateBaseType {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/base-type/list`}
            render={componentProps => (
              <BaseSupplierTypeList {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/base-type/edit/:baseSupplierTypeId`}
            render={componentProps => (
              <EditBaseSupplierType {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
