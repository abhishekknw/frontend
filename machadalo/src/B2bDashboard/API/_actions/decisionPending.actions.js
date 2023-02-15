import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { leadDecisionPendingListAtom, clientStatusAtom } from '../_state/decisionPending';
import { Apis } from '../request';
import { useAlertActions } from '../_actions/alert.actions';

const decisionPendingActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const [decisionPendingList, setDecisionPendingList] = useRecoilState(leadDecisionPendingListAtom);
  const setClientStatusAtom = useSetRecoilState(clientStatusAtom);

  const LeadDecisionPendingList = (data) => {
    let parmas =
      '?type_of_entity=' +
      data?.supplierType +
      '&next_page=' +
      data?.page +
      '&lead_type=' +
      data?.leadType +
      '&user_type=' +
      data?.userType;

    if (data?.search) {
      parmas += '&search=' + data?.search;
    }
    return fetchWrapper.get(`${Apis.leadDecisionPending}/${parmas}`).then((res) => {
      const { data } = res;
      setDecisionPendingList(data);
    });
  };

  const ClientStatusList = () => {
    return fetchWrapper.get(`${Apis.clientStatusList}/`).then((res) => {
      const { data } = res;
      setClientStatusAtom(data.client_status);
    });
  };

  const updateClientStatus = (data) => {
    let update = data;
    return fetchWrapper.post(`${Apis.updateClientStatus}/`, { data: data }).then((res) => {
      if (res.status) {
        alertActions.success(res.data);
        let newList = [...decisionPendingList.lead].map((item) => {
          if (item._id === update[0]?._id)
            return { ...item, macchadalo_client_status: update[0]?.macchadalo_client_status };
          else return item;
        });
        setDecisionPendingList({ ...decisionPendingList, lead: newList });
      } else {
        alertActions.success(res.data);
      }
    });
  };

  return {
    LeadDecisionPendingList,
    ClientStatusList,
    updateClientStatus,
  };
};
export { decisionPendingActions };
