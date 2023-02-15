import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import B2bDashboard from '../index';
import Header from '../common/b2bHeader';
import { alertAtom } from '../API/_state';
import { SnackbarProvider } from 'notistack';
import { useRecoilValue } from 'recoil';

export default function B2bRoutes(props) {
  const { match } = props;
  const open = useRecoilValue(alertAtom);

  return (
    <>
      <Header />
      <Switch>
        <SnackbarProvider
          autoHideDuration={1000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
        >
          <Route
            exact
            path={`${match.path}/dashboard`}
            render={(componentProps) => <B2bDashboard {...props} {...componentProps} />}
          />
        </SnackbarProvider>
      </Switch>
    </>
  );
}
