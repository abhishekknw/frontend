import { useRecoilState, useSetRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
// import { authAtom, usersAtom, userAtom,userErrorAtom} from '../_state';
import { leadDecisionPendingListAtom } from '../_state/decisionPending';
import { Apis } from '../request';
const decisionPendingActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setDecisionPendingList = useSetRecoilState(leadDecisionPendingListAtom);
  // const alertActions = useAlertActions();
  // const setUsers = useSetRecoilState(usersAtom);
  // const setUser = useSetRecoilState(userAtom);
  // const setUserError = useSetRecoilState(userErrorAtom);

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
  return {
    LeadDecisionPendingList,
  };
};
export { decisionPendingActions };
