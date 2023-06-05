import React, { useEffect, useState } from 'react';
import CampaignList from './CampaignList';
import ViewLeadsTable from './ViewLeadsTable';
import { useRecoilValue } from 'recoil';
import { showHideTableAtom } from '../../_states/Machadalo/newLeads';
export default function NewLeadsTab(props) {
  const showHideTable = useRecoilValue(showHideTableAtom);
  return (
    <>
      {!showHideTable.viewLeads.show && <CampaignList />}
      {showHideTable.viewLeads.show && <ViewLeadsTable />}
    </>
  );
}
