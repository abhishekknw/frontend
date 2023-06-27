import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { InvoiceProposalsAtom } from '../../_states';
import { errorAtom } from '../../_states/alert';

const DecisionBoardActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const [invoiceProposals,setInvoiceProposals] = useRecoilState(InvoiceProposalsAtom);

  const GetInvoiceProposals = (data) => {
    let params = "?next_page=" + data.pageNo + '&search=' + data.search;
    return fetchWrapper.get(`${Apis.Get_Invoice_Proposals}${params}`).then((res) => {
      setInvoiceProposals(res.data)
    });
  };

  const converCampaignToProposal = (data) =>{
    return fetchWrapper.post(`v0/ui/website/${data.proposal.proposal_id}/convert-to-proposal/`,data.proposal).then((res) => {
      if(res.status){
        alertActions.success(res.data);
        let newList = invoiceProposals.list.map((item,key)=>{
          if(item.proposal.proposal_id === data.proposal.proposal_id){
            return {...item,proposal:{...item.proposal,campaign_state:'PNC'}}
          }
          else{
            return item;
          }
        })
        setInvoiceProposals({...invoiceProposals,list:newList});
      }
      else{
        alertActions.error(res.data);
      }
    });
  }

  const convertProposalToCampaign = (data) =>{
    return fetchWrapper.post(`v0/ui/website/${data.proposal.proposal_id}/convert-to-campaign/`,data.proposal).then((res) => {
      if(res.status){
        alertActions.success(res.data);
        let newList = invoiceProposals.list.map((item,key)=>{
          if(item.proposal.proposal_id === data.proposal.proposal_id){
            return {...item,proposal:{...item.proposal,campaign_state:'PTC'}}
          }
          else{
            return item;
          }
        })
        setInvoiceProposals({...invoiceProposals,list:newList});
      }
      else{
        alertActions.error(res.data);
      }
    });
  }

  const convertCampaignOnHold = (data) =>{
    data = {...data,proposal:{...data.proposal,campaign_state:'POH'}};
    return fetchWrapper.put(`v0/ui/website/proposal/${data.proposal.proposal_id}/`,data.proposal).then((res) => {
      if(res.status){
        alertActions.success(Labels.Success);
        let newList = invoiceProposals.list.map((item,key)=>{
          if(item.proposal.proposal_id === data.proposal.proposal_id){
            return {...item,proposal:{...item.proposal,campaign_state:'POH'}}
          }
          else{
            return item;
          }
        })
        setInvoiceProposals({...invoiceProposals,list:newList});
      }
      else{
        alertActions.error(res.data);
      }
    })
  }
  return {
    GetInvoiceProposals,
    converCampaignToProposal,
    convertProposalToCampaign,
    convertCampaignOnHold,
  };
}
export { DecisionBoardActions };