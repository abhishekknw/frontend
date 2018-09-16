import React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import Create from './Create';
import Suppliers from './Suppliers';

import './index.css';

export default function Checklist(props) {
  const { match } = props;

  return (
    <div className="checklist">
      <Switch>
        <Route
          path={`${match.path}/list`}
          render={componentProps => <List {...props} {...componentProps} />}
        />
        <Route
          path={`${match.path}/suppliers/:campaignId`}
          render={componentProps => (
            <Suppliers {...props} {...componentProps} />
          )}
        />
        <Route
          path={`${match.path}/create/:campaignId/:supplierId`}
          render={componentProps => <Create {...props} {...componentProps} />}
        />
      </Switch>
    </div>
  );
}
