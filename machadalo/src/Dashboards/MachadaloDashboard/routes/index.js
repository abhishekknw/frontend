import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useRecoilValue } from 'recoil';
import MachadaloDashboard from '../machadaloDashboard';
import {alertAtom} from '../../_states/alert';

export default function MachadaloRoutes(props) {
  const { match } = props;
  const open = useRecoilValue(alertAtom);

  return (
    <>
      <Switch>
        <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
        >
          <Route
            exact
            path={`${match.path}/dashboard`}
            render={(componentProps) => <MachadaloDashboard {...props} {...componentProps} />}
          />
        </SnackbarProvider>
      </Switch>
    </>
  );
}
