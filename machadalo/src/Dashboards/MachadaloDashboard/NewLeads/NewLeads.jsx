import React, { useEffect, useState } from 'react';
import CampaignList from './CampaignList';
import ViewLeadsTable from './ViewLeadsTable';
import { useRecoilValue } from 'recoil';
import { showHideTableAtom } from '../../_states/Machadalo/newLeads';
import Button from 'react-bootstrap/Button';

export default function NewLeadsTab(props) {
  const showHideTable = useRecoilValue(showHideTableAtom);
  return (
    <>
      {' '}
      <CampaignList />
      {showHideTable.viewLeads.show && <ViewLeadsTable />}
    </>
  );
}
