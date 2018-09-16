import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import List from './List';
import Create from './Create';

import './index.css';

export default function Checklist(props) {
  const { match, autoLogin, auth } = props;

  return (
    <div className="checklist">
      <Switch>
        <Route exact path={`${match.path}/checklist/list`} {...props}>
          <List {...props} />
        </Route>
        <Route path={`${match.path}/checklist/create`} {...props}>
          <Create {...props} />
        </Route>
      </Switch>
    </div>
  );
}
