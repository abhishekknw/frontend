import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Campaigns from './Campaigns';
import Create from './Create';
import Suppliers from './Suppliers';
import List from './List';
import Fill from './Fill';

import './index.css';

export default function Checklist(props) {
  const { match } = props;

  return (
    <div className="checklist">
      <Switch>
        <Route
          path={`${match.path}/campaigns`}
          render={componentProps => (
            <Campaigns {...props} {...componentProps} />
          )}
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
        <Route
          path={`${match.path}/list/:campaignId/:supplierId`}
          render={componentProps => <List {...props} {...componentProps} />}
        />
        <Route
          path={`${match.path}/fill/:checklistId`}
          render={componentProps => <Fill {...props} {...componentProps} />}
        />
      </Switch>
    </div>
  );
}
