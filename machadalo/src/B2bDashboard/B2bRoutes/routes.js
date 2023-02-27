import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import B2bDashboard from '../index';
import B2BHeader from '../common/b2bHeader';
import { alertAtom } from '../API/_state';
import { SnackbarProvider } from 'notistack';
import { useRecoilValue } from 'recoil';

export default function B2bRoutes(props) {
  const { match } = props;
  const open = useRecoilValue(alertAtom);

  return (
    <>
      <B2BHeader />
      <Switch>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
        >
          <Route
            exact
            path={`${match.path}/dashboard`}
            render={(componentProps) => <B2bDashboard {...props} {...componentProps} />}
          />
          <Route path="/" element={<h1>Home Page Component</h1>} />
        </SnackbarProvider>
      </Switch>
    </>
  );
}
