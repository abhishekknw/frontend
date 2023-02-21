import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { useFetchWrapper } from '../_helpers/fetch-wrapper';
import { Apis } from '../request';
import { useAlertActions } from '../_actions/alert.actions';
import { LeadCount } from '../_state';

const NewLeadsTabActions = () => {
  const alertActions = useAlertActions();
  const fetchWrapper = useFetchWrapper();
  const setLeadCount = useSetRecoilState(LeadCount);

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

  return {
    leadCountByDate,
  };
};
export { NewLeadsTabActions };
