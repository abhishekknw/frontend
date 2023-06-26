import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ROUTESNAME } from '../../../constants/routes.constants';
import CampaignDecisionBoard from '../Campaign/CampaignDecisionBoard';
import MachadaloHeader from '../../common/header/Header';
import { alertAtom } from '../../_states/alert';
import { SnackbarProvider } from 'notistack';
import { useRecoilValue } from 'recoil';

export default function PagesRoutes() {
  const open = useRecoilValue(alertAtom);

  return (
    <>
    <MachadaloHeader />
      <Switch>
      <SnackbarProvider
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
        >
        <Route path={ROUTESNAME.CAMPAIGN_DECISION_BOARD} component={CampaignDecisionBoard} />
        </SnackbarProvider>
      </Switch>
    </>
  );
}
