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
  return {
    CurrentCampaignList,
  };
};
export { LeadDetailActions };
