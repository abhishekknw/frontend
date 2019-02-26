import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import './index.css';

export default class BaseBooking extends React.Component {
  componentDidMount() {
    // TODO: Fetch entity types
  }

  render() {
    let { match } = this.props;

    return (
      <div className="booking">
        <Switch>
          {/*<Route
            exact
            path={`${match.path}/list`}
            render={componentProps => (
              <Base {...this.props} {...componentProps} />
            )}
          />
          <Route
            exact
            path={`${match.path}/edit`}
            render={componentProps => (
              <Campaigns {...this.props} {...componentProps} />
            )}
          />*/}
        </Switch>
      </div>
    );
  }
}
