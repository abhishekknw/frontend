import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis,Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import {AllCampaingsAtom ,LeadByCampaignsAtom ,showViewLeadsTableAtom} from '../../_states/Machadalo/newLeads';
import { errorAtom } from '../../_states/alert';


const newLeadActions = () => {
    const fetchWrapper = useFetchWrapper();
    const alertActions = useAlertActions();
    const [error, setError] = useRecoilState(errorAtom);
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
    
    const SendEmailsByCampaign = (data)=>{
          let params ='?campaign_id=' + data.campaign_id;
          params+='&supplier_type=all';
          params+='&lead_type=Leads';
          params+='&emails='+ data.emails;
          params+="&Client_Status=" + data.emailType;
          params+="&tabname=" + '';
          //  "v0/ui/b2b/email-leads-summary/?lead_type=Leads&supplier_code=all&campaign_id=KRIKRI4EF8&emails=undefined&tabname=&Client_Status=Lead%20verified%20by%20Machadalo",
        return fetchWrapper.get(`${Apis.SendEmail_By_Campaign}${params}`).then((res) => {
          alertActions.success(Labels.Email_Success);
          setError(false);
        });
    }

      return {
        getAllCampaigns,
        getLeadByCampaignId,
        getClientStatusList,
        SendEmailsByCampaign
      };
}  
export { newLeadActions };