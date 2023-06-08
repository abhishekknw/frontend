import React, { useEffect, useState } from 'react';
import CampaignList from './CampaignList';
import { useRecoilValue } from 'recoil';
import { showHideTableAtom } from '../../_states/Machadalo/newLeads';
import Button from 'react-bootstrap/Button';
import NewViewLeadsTable from './NewViewLeadsTable';
import { newLeadActions } from '../../_actions/Machadalo/newLead.actions';

export default function NewLeadsTab(props) {

  const NewLeadAction = newLeadActions();
  NewLeadAction.getAllCampaigns();
  return (
    <>
      {' '}
      <CampaignList />
    </>
  );
}
