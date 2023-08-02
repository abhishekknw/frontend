import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { CampaignInventoryAtom, HeaderDataListAtom } from '../../_states';
import { errorAtom } from '../../_states/alert';

const BookinPlanActions = () => {
  const fetchWrapper = useFetchWrapper();
  const alertActions = useAlertActions();
  const setCampaignInventory = useSetRecoilState(CampaignInventoryAtom);
  const setHeaderDataList = useSetRecoilState(HeaderDataListAtom);

  const getCampaignInventories = (data) => {
    // let params = "?next_page=" + data.pageNo + '&search=' + data.search;
    return fetchWrapper
      .get(`v0/ui/website/HDFHDF0789/campaign-inventories/?page=1&supplier_type_code=ALL`)
      .then((res) => {
        setCampaignInventory(res.data);
      });
  };

  const getHeaderData = (data) => {
    // let params = "?next_page=" + data.pageNo + '&search=' + data.search;
    return fetchWrapper.get(`${Apis.Get_Header_Data}`).then((res) => {
      setHeaderDataList(res.data);
      return res.data.ALL;
    });
  };

  //   const converCampaignToProposal = (data) => {
  //     return fetchWrapper.post(`v0/ui/website/${data.proposal.proposal_id}/convert-to-proposal/`, data.proposal).then((res) => {
  //       if (res.status) {
  //         alertActions.success(res.data);
  //         let newList = invoiceProposals.list.map((item, key) => {
  //           if (item.proposal.proposal_id === data.proposal.proposal_id) {
  //             return { ...item, proposal: { ...item.proposal, campaign_state: 'PNC' } }
  //           }
  //           else {
  //             return item;
  //           }
  //         })
  //         setInvoiceProposals({ ...invoiceProposals, list: newList });
  //       }
  //       else {
  //         alertActions.error(res.data);
  //       }
  //     });
  //   }

  return {
    getCampaignInventories,
    getHeaderData,
  };
};
export { BookinPlanActions };
