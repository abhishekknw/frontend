import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { useFetchWrapper } from '../../_helpers/fetch-wrapper';
import { Apis, Labels } from '../../app.constants';
import { useAlertActions } from '../alert.actions';
import { InvoiceProposalsAtom } from '../../_states';
import { errorAtom } from '../../_states/alert';

const DecisionBoardActions = () => {
  const fetchWrapper = useFetchWrapper();
  const setInvoiceProposals = useSetRecoilState(InvoiceProposalsAtom);

  const GetInvoiceProposals = (data) => {
    let params = "?next_page=" + data.pageNo + '&search=' + data.search;
    return fetchWrapper.get(`${Apis.Get_Invoice_Proposals}${params}`).then((res) => {
      setInvoiceProposals(res.data)
    });
  };
  return {
    GetInvoiceProposals,
  };
}
export { DecisionBoardActions };