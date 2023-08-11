import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ROUTESNAME } from '../../../constants/routes.constants';
import CampaignDecisionBoard from '../Campaign/CampaignDecisionBoard';
import MachadaloHeader from '../../common/header/Header';
import { alertAtom } from '../../_states/alert';
import { SnackbarProvider } from 'notistack';
import { useRecoilValue } from 'recoil';
import InterveneChat from '../InterveneChat/InterveneChat';
import OpsDashboard from '../OpsDashboard/OpsDashboard';
import BookingPlan from '../BookingPlan/BookingPlan';
import CampaignList from '../CampaignList/CampaignList';
export default function PagesRoutes(props) {
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
            path={match.path + ROUTESNAME.CAMPAIGN_DECISION_BOARD}
            component={CampaignDecisionBoard}
          />
          <Route path={match.path + ROUTESNAME.INTERVENE_CHAT} component={InterveneChat} />
          <Route path={match.path + ROUTESNAME.OPS_DASHBOARD} component={OpsDashboard} />
          <Route path={match.path + ROUTESNAME.BOOKING_PLAN} component={BookingPlan} />
          <Route path={match.path + ROUTESNAME.CAMPAIGN_LIST} component={CampaignList} />
        </SnackbarProvider>
      </Switch>
      {/* </div> */}
    </>
  );
}
