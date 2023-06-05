import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../../B2bDashboard/API/_helpers/fetch-wrapper';
import { Apis } from '../../app.constants';

const newLeadActions = () => {
    const fetchWrapper = useFetchWrapper();

    const getAllCampaigns = (data) => {
        return fetchWrapper.get(`${Apis.New_Leads_Campaign}`).then((res) => {
          const { data } = res;
          console.log(res,"11111111111111")
        });
      };

      return {
        getAllCampaigns,
      };
}  
export { newLeadActions };