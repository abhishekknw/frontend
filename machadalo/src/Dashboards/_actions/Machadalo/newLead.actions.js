import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../../B2bDashboard/API/_helpers/fetch-wrapper';
import { Apis } from '../../app.constants';
import {AllCampaingsAtom ,LeadByCampaignsAtom ,showViewLeadsTableAtom} from '../../_states/Machadalo/newLeads';
const newLeadActions = () => {
    const fetchWrapper = useFetchWrapper();
    const AllCampaignList = useSetRecoilState(AllCampaingsAtom);
    const [LeadsByCampaign,setLeadsByCampaign] = useRecoilState(LeadByCampaignsAtom);

    const getAllCampaigns = (data) => {
        return fetchWrapper.get(`${Apis.New_Leads_Campaign}`).then((res) => {
          const { data } = res;
          AllCampaignList([...data])
        });
      };
    const getLeadByCampaignId = (data) =>{
      // ?campaign_id=CPPCPP7270&supplier_type=all&next_page=0&city=&startDate=&endDate=&search=
      let params ='?campaign_id=' + data.campaign_id;
      params+='&supplier_type=all';
      params+='&next_page=0';
      params+='&city=';
      params+='&startDate=&endDate=&search=';
      return fetchWrapper.get(`${Apis.Lead_By_Campaign}${params}`).then((res) => {
        const { data } = res;
        setLeadsByCampaign({...data})
      });
    }
    
    const getClientStatusList = (data) =>{
      return fetchWrapper.get(`${Apis.Client_Status_By_Campaign}`).then((res) => {
        const { data } = res;
        return data;
      });
    } 

      return {
        getAllCampaigns,
        getLeadByCampaignId,
        getClientStatusList,
      };
}  
export { newLeadActions };