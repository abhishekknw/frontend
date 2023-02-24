import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import {
  currentCampaign,
  campaignLeads,
  viewLeadFilters,
  errorAtom,
  campaignCitylist,
  leadDetailData,
} from '../_state';
import { Apis } from '../request';
import { useAlertActions } from '../_actions/alert.actions';
import API_URL from '../../../config';

import dayjs from 'dayjs';

const LeadDetailActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setCurrentCampaign = useSetRecoilState(currentCampaign);
  const [viewLeads, setViewLeads] = useRecoilState(campaignLeads);
  const [error, setError] = useRecoilState(errorAtom);
  const filters = useRecoilValue(viewLeadFilters);
  const setCampaignCitylist = useSetRecoilState(campaignCitylist);
  const setLeadDetailData = useSetRecoilState(leadDetailData);
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
    let params =
      '?campaign_id=' +
      data?.campaign_id +
      '&lead_type=' +
      data?.lead_type +
      '&supplier_code=' +
      data?.supplier_type +
      '&next_page=' +
      data.next_page;
    if (data?.start_date && data?.end_date) {
      params +=
        '&start_date=' +
        dayjs(data.start_date).format('DD-MM-YYYY') +
        '&end_date=' +
        dayjs(data.end_date).format('DD-MM-YYYY');
    }
    if (data?.start_acceptance_date && data?.end_acceptance_date) {
      params +=
        '&start_acceptance_date=' +
        dayjs(data.start_acceptance_date).format('DD-MM-YYYY') +
        '&end_acceptance_date=' +
        dayjs(data.end_acceptance_date).format('DD-MM-YYYY');
    }
    if (data?.start_update_date && data?.end_update_date) {
      params +=
        '&start_update_date=' +
        dayjs(data.start_update_date).format('DD-MM-YYYY') +
        '&end_update_date=' +
        dayjs(data.end_update_date).format('DD-MM-YYYY');
    }
    if (data?.city) {
      params += '&city=' + data.city;
    }
    if (data?.client_status) {
      params += '&client_status=' + data.client_status;
    }
    if (data?.search) {
      params += '&search=' + data.search;
    }
    if (data?.from_primary_count && data?.to_primary_count) {
      params +=
        '&from_primary_count=' +
        data.from_primary_count +
        '&to_primary_count=' +
        data.to_primary_count;
    }

    return fetchWrapper.get(`${Apis.campaignViewLeads}/${params}`).then((res) => {
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
        setError(false);
      } else {
        alertActions.error('something went wrong');
      }
    });
  };

  const detailUpdateClientStatus = (data) => {
    let update = data;
    return fetchWrapper.post(`${Apis.updateClientStatus}/`, { data: data }).then((res) => {
      if (res.status) {
        alertActions.success(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };

  const getCampaignCityList = (data) => {
    let param = '?campaign_id=' + data.campaign_id;
    return fetchWrapper.get(`${Apis.getCampaignCityList}/${param}`).then((res) => {
      if (res.status) {
        setCampaignCitylist(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };

  const getLeadDetailsData = (id) => {
    let param = '?_id=' + id;
    return fetchWrapper.get(`${Apis.getLeadDetailsData}/${param}`).then((res) => {
      if (res.status) {
        setLeadDetailData(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };

  const DownloadLeadsSummary = (id) => {
    let url = `${API_URL.API_URL}/v0/ui/b2b/download-leads-summary/?lead_type=${filters.lead_type}&supplier_code=${filters.supplier_type}&campaign_id=${id}`;

    if (filters?.start_date && filters?.end_date) {
      url +=
        '&start_date=' +
        dayjs(filters.start_date).format('DD-MM-YYYY') +
        '&end_date=' +
        dayjs(filters.end_date).format('DD-MM-YYYY');
    }

    if (filters?.start_acceptance_date && filters?.end_acceptance_date) {
      url +=
        '&start_acceptance_date=' +
        dayjs(filters.start_acceptance_date).format('DD-MM-YYYY') +
        '&end_acceptance_date=' +
        dayjs(filters.end_acceptance_date).format('DD-MM-YYYY');
    }
    if (filters?.start_update_date && filters?.end_update_date) {
      url +=
        '&start_update_date=' +
        dayjs(filters.start_update_date).format('DD-MM-YYYY') +
        '&end_update_date=' +
        dayjs(filters.end_update_date).format('DD-MM-YYYY');
    }
    if (filters?.city) {
      url += '&city=' + filters.city;
    }
    if (filters?.client_status) {
      url += `&client_status=${filters.client_status}`;
      console.log(url, 'client_status');
      console.log(filters.client_status, 'client_status');
    }
    if (filters?.from_primary_count && filters?.to_primary_count) {
      url +=
        '&from_primary_count=' +
        filters.from_primary_count +
        '&to_primary_count=' +
        filters.to_primary_count;
    }
    window.open(url, '_blank');
  };

  const uploadComments = (file) => {
    return fetchWrapper.post(`${Apis.uploadComments}/`, file, true).then((res) => {
      if (res.status) {
        alertActions.success(res.data);
      } else {
        alertActions.error(res.data);
      }
    });
  };

  return {
    CurrentCampaignList,
    campaignViewLeads,
    sendEmails,
    detailUpdateClientStatus,
    getCampaignCityList,
    getLeadDetailsData,
    DownloadLeadsSummary,
    uploadComments,
  };
};
export { LeadDetailActions };
