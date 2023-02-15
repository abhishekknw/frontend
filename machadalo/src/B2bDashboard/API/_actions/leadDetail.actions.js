import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { currentCampaign } from '../_state';
import { Apis } from '../request';

const LeadDetailActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setCurrentCampaign = useSetRecoilState(currentCampaign);

  const CurrentCampaignList = (data) => {
    let parmas = '?lead_type=' + data?.leadType + '&supplier_code=' + data?.supplierType;
    // '?lead_type=Leads&user_type=undefined&tabname=undefined&supplier_code=all'
    return fetchWrapper.get(`${Apis.currentCampaign}/${parmas}`).then((res) => {
      const { data } = res;
      setCurrentCampaign(data);
    });
  };

  const campaignViewLeads = () => {
    return fetchWrapper.get(`${Apis.campaignViewLeads}/${'id'}`).then((res) => {
      const { data } = res;
    });
  };
  return {
    CurrentCampaignList,
    campaignViewLeads,
  };
};
export { LeadDetailActions };
