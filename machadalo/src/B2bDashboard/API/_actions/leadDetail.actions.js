import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { currentCampaign } from '../_state';
import { Apis } from '../request';

const LeadDetailActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setCurrentCampaign = useSetRecoilState(currentCampaign);

  const CurrentCampaignList = (id) => {
    return fetchWrapper.get(`${Apis.currentCampaign}/${id}`).then((res) => {
      const { data } = res;
      setCurrentCampaign(data);
    });
  };

  const campaignViewLeads = () => {
    return fetchWrapper.get(`${Apis.campaignViewLeads}/${'id'}`).then((res) => {
      const { data } = res;
      console.log(data, '1111111111111111111');
    });
  };
  return {
    CurrentCampaignList,
    campaignViewLeads,
  };
};
export { LeadDetailActions };
