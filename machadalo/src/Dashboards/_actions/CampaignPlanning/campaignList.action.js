import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { CampaignListAtom } from '../../_states';
import { errorAtom } from '../../_states/alert';

const CampaignListActions = () => {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const setCampaignList = useSetRecoilState(CampaignListAtom);

    const getCampaignAssignment = (data) => {
        let params = "?to=" + data?.to + '&include_assigned_by=' + data?.include_assigned_by + '&fetch_all=' + data?.fetch_all + "&next_page=" + data?.next_page + "&search=" + data?.search;
        return fetchWrapper.get(`${Apis.Get_Campaign_Assignment}${params}`).then((res) => {
            if (res?.status) {
                setCampaignList(res?.data)
            } else {
                alertActions.error(Labels.Error);
            }
        });
    }
    return {
        getCampaignAssignment
    }
}
export { CampaignListActions };