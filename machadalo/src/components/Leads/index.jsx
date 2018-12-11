import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LeadSettings from './LeadSettings';

export default class Entity extends React.Component {
  componentDidMount() {
    // TODO: Fetch entity types
  }

  render() {
    let { match } = this.props;

    return (
      <div className="checklist">
        <Switch>
          <Route
            exact
            path={`${match.path}/settings`}
            render={componentProps => (
              <LeadSettings {...this.props} {...componentProps} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
