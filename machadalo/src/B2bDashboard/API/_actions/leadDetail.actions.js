import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { currentCampaign, campaignLeads, viewLeadFilters, errorAtom } from '../_state';
import { Apis } from '../request';
import { useAlertActions } from '../_actions/alert.actions';

const LeadDetailActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setCurrentCampaign = useSetRecoilState(currentCampaign);
  const [viewLeads, setViewLeads] = useRecoilState(campaignLeads);
  const [error, setError] = useRecoilState(errorAtom);
  const filters = useRecoilValue(viewLeadFilters);
  const alertActions = useAlertActions();

  const CurrentCampaignList = (data) => {
    let parmas = '?lead_type=' + data?.lead_type + '&supplier_code=' + data?.supplier_type;
    // '?lead_type=Leads&user_type=undefined&tabname=undefined&supplier_code=all'
    return fetchWrapper.get(`${Apis.currentCampaign}/${parmas}`).then((res) => {
      const { data } = res;
      setCurrentCampaign(data);
    });
  };

  const campaignViewLeads = (data) => {
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

  const sendEmails = (data) => {
    let params =
      '?emails=' +
      data?.emails +
      '&campaign_id=' +
      data?.campaign_id +
      '&Client_Status=' +
      data?.status +
      '&tabname=' +
      filters?.tabname;
    '&supplier_code=' + filters?.supplier_type;
    '&lead_type=' + filters?.lead_type;
    return fetchWrapper.get(`${Apis.sendEmails}/${params}`).then((res) => {
      if (res.status) {
        alertActions.success(res.data);
        setError(true);
      } else {
        alertActions.error('something went wrong');
      }
    });
  };
  return {
    CurrentCampaignList,
    campaignViewLeads,
    sendEmails,
  };
};
export { LeadDetailActions };
