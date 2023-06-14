import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useRecoilValue } from 'recoil';
import ClientDashboard from '../ClientDashboard';
import { CLIENT_DASHBOARD_ROUTE } from '../../../constants/routes.constants';
import MachadaloHeader from '../../common/header/Header';

export default function ClientRoutes(props) {
  const { match } = props;
  console.log(props);
  const open = true;

  return (
    <>
      <div className="container ">
        <MachadaloHeader />
      </div>{' '}
      <Switch>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
        >
          <Route
            exact
            path={CLIENT_DASHBOARD_ROUTE}
            render={(componentProps) => <ClientDashboard {...props} {...componentProps} />}
          />
        </SnackbarProvider>
      </Switch>
    </>
  );
}
