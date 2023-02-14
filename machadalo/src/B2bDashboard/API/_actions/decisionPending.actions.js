import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { leadDecisionPendingListAtom, clientStatusAtom } from '../_state/decisionPending';
import { Apis } from '../request';
const decisionPendingActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setDecisionPendingList = useSetRecoilState(leadDecisionPendingListAtom);
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

  return {
    LeadDecisionPendingList,
    ClientStatusList,
  };
};
export { decisionPendingActions };
