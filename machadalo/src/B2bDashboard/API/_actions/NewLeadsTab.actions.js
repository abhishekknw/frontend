import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { Apis } from '../request';
import { useAlertActions } from '../_actions/alert.actions';
import { LeadCount, leadCampaignData, supplierData } from '../_state';

const NewLeadsTabActions = () => {
  const alertActions = useAlertActions();
  const fetchWrapper = useFetchWrapper();
  const setLeadCount = useSetRecoilState(LeadCount);
  const setLeadCampaignData = useSetRecoilState(leadCampaignData);
  const setSupplierData = useSetRecoilState(supplierData);

  const leadCountByDate = (data) => {
    let param = '?date=' + data?.selectDate;
    return fetchWrapper.get(`${Apis.leadCountByDate}/${param}`).then((res) => {
      if (res.status) {
        setLeadCount(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };
  const getLeadCampaignData = (data) => {
    let param = '?date=' + data?.selectDate;
    return fetchWrapper.get(`${Apis.leadCampaignData}/${param}`).then((res) => {
      if (res.status) {
        setLeadCampaignData(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };
  const getSupplierData = (data) => {
    let param = '?campaign_id=' + data?.proposal_id;
    return fetchWrapper.get(`${Apis.getSupplierByCampaign}/${param}`).then((res) => {
      if (res.status) {
        setSupplierData(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };

  return {
    leadCountByDate,
    getLeadCampaignData,
    getSupplierData,
  };
};
export { NewLeadsTabActions };
