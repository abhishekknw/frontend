import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { currentCampaign, campaignLeads } from '../_state';
import { Apis } from '../request';

const LeadDetailActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setCurrentCampaign = useSetRecoilState(currentCampaign);
  const [viewLeads, setViewLeads] = useRecoilState(campaignLeads);

  const CurrentCampaignList = (data) => {
    let parmas = '?lead_type=' + data?.lead_type + '&supplier_code=' + data?.supplier_type;
    // '?lead_type=Leads&user_type=undefined&tabname=undefined&supplier_code=all'
    return fetchWrapper.get(`${Apis.currentCampaign}/${parmas}`).then((res) => {
      const { data } = res;
      setCurrentCampaign(data);
    });
  };

  const campaignViewLeads = (data) => {
    console.log(data, 'filtersfiltersfiltersfilters');
    let parmas =
      '?campaign_id=' +
      data.campaign_id +
      '&lead_type=' +
      data?.lead_type +
      '&supplier_code=' +
      data?.supplier_type +
      '&next_page=' +
      data.next_page;

    return fetchWrapper.get(`${Apis.campaignViewLeads}/${parmas}`).then((res) => {
      setViewLeads(res.data);
    });
  };
  return {
    CurrentCampaignList,
    campaignViewLeads,
  };
};
export { LeadDetailActions };
