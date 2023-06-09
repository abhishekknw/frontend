import { useRecoilState, useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { AllCampaingsAtom, LeadByCampaignsAtom, showViewLeadsTableAtom, ClientStatusAtom,CommentListAtom } from '../../_states/Machadalo/newLeads';
import { errorAtom } from '../../_states/alert';


const newLeadActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const [error, setError] = useRecoilState(errorAtom);
  const AllCampaignList = useSetRecoilState(AllCampaingsAtom);
  const SetClientStatus = useSetRecoilState(ClientStatusAtom);
  const SetCommentListAtom = useSetRecoilState(CommentListAtom);
  const [LeadsByCampaign, setLeadsByCampaign] = useRecoilState(LeadByCampaignsAtom);

  const getAllCampaigns = (data) => {
    let params = "&search=" + data.search;
    params+="lead_type=" + data.lead_type;
    return fetchWrapper.get(`${Apis.New_Leads_Campaign}${params}`).then((res) => {
      const { data } = res;
      AllCampaignList([...data])
    });
  };
  const getLeadByCampaignId = (data) => {
    // ?campaign_id=CPPCPP7270&supplier_type=all&next_page=0&city=&startDate=&endDate=&search=
    let params = '?campaign_id=' + data.campaign_id;
    params += '&supplier_type=all';
    params +='&search=' +data.leadSearch;
    params +='&lead_type=' +data.lead_type;
    params += '&next_page=0';
    params += '&city=';
    params += '&startDate=&endDate=';
    return fetchWrapper.get(`${Apis.Lead_By_Campaign}${params}`).then((res) => {
      const { data } = res;
      setLeadsByCampaign({ ...data })
    });
  }

  const getClientStatusList = (data) => {
    return fetchWrapper.get(`${Apis.Client_Status_By_Campaign}`).then((res) => {
      const { data } = res;
      SetClientStatus([...data.client_status])
      return data;
    });
  }

  const updateClientStatus = (data) => {
    let update = data;
    return fetchWrapper.post(`${Apis.Update_Client_Status}`, { data: data }).then((res) => {
      if (res.status) {
        alertActions.success(res.data);
        let newList = [];
        let tempData = LeadsByCampaign['values'];
        for (let i in tempData) {
          if (tempData[i][0]._id == update[0]._id) {
            let temp = [];
            for (let j in tempData[i]) {
              if (tempData[i][j]._id == update[0]._id) {
                temp.push({
                  ...tempData[i][j],
                  macchadalo_client_status: update[0]['macchadalo_client_status'],
                });
              } else {
                temp.push({ ...tempData[i][j] });
              }
            }
            newList.push([...temp]);
          } else {
            newList.push(tempData[i]);
          }
        }
        setLeadsByCampaign({ ...LeadsByCampaign, values: newList });
      } else {
        alertActions.error(res.data);
      }
    });
  }

  const SendEmailsByCampaign = (data) => {
    let params = '?campaign_id=' + data.campaign_id;
    params += '&supplier_type=all';
    params += '&lead_type=Leads';
    params += '&emails=' + data.emails;
    params += "&Client_Status=" + data.emailType;
    params += "&tabname=" + '';
    //  "v0/ui/b2b/email-leads-summary/?lead_type=Leads&supplier_code=all&campaign_id=KRIKRI4EF8&emails=undefined&tabname=&Client_Status=Lead%20verified%20by%20Machadalo",
    return fetchWrapper.get(`${Apis.SendEmail_By_Campaign}${params}`).then((res) => {
      alertActions.success(Labels.Email_Success);
      setError(false);
    });
  }

  const getCommentListByIds = (data) => {
    let params = '?requirement_id=' + data.requirement_id + '&_id=' + data._id + "&comment_type="+ data.comment_type;
    return fetchWrapper.get(`${Apis.Get_Comment_List}${params}`).then((res) => {
      SetCommentListAtom([...res.data])
    });
  }

  const postCommentById = (data) => {
    return fetchWrapper.post(`${Apis.Get_Comment_List}`,{ data: data }).then((res) => {
      if(res.status){
        alertActions.success(res.data);
        getCommentListByIds({...data[0],comment_type:'all'})
      }
      else{
        alertActions.error(Labels.Error);
      }
    });
  }

  return {
    getAllCampaigns,
    getLeadByCampaignId,
    getClientStatusList,
    SendEmailsByCampaign,
    updateClientStatus,
    getCommentListByIds,
    postCommentById
  };
}
export { newLeadActions };