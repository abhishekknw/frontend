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

  const LeadDecisionPendingList = (id) => {
    return fetchWrapper.get(`${Apis.leadDecisionPending}/${id}`).then((res) => {
      const { data } = res;
      setDecisionPendingList(data);
    });
  };
  return {
    LeadDecisionPendingList,
  };
};
export { decisionPendingActions };
