import * as React from 'react';
import { Button, Checkbox } from '@mui/material';
import { decisionPendingActions } from '../API/_actions';
import { leadDecisionPendingListAtom } from '../API/_state';
import { useRecoilState } from 'recoil';

export default function AcceptDeclineLeads(props) {
  const LeadBasicApi = decisionPendingActions();
  const [decisionPendingList, setDecisionPendingList] = useRecoilState(leadDecisionPendingListAtom);
  const AcceptDecline = async (data, status) => {
    let obj = [{ client_status: status, requirement_id: data?.requirement_id, _id: data?._id }];
    await LeadBasicApi.AcceptDeclineLeads(obj);
    if (status == 'Accept') {
      let newList = decisionPendingList.lead.filter((data) => data._id !== obj[0]?._id);
      setDecisionPendingList({ ...decisionPendingList, lead: newList });
    } else {
      let newList = decisionPendingList.lead.map((data) => {
        if (data._id == obj[0]._id) {
          return { ...data, client_status: 'Decline' };
        } else return data;
      });
      setDecisionPendingList({ ...decisionPendingList, lead: newList });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        className="theme-btn text-small"
        onClick={(e) => {
          AcceptDecline(props.data, 'Accept');
        }}
      >
        Accept
      </Button>
      <Button
        variant="contained"
        size="small"
        className="theme-btn width-btn text-small"
        style={{ marginLeft: 5 }}
        onClick={(e) => {
          AcceptDecline(props.data, 'Decline');
        }}
        disabled={props.data?.client_status === 'Decline'}
      >
        {props.data?.client_status === 'Decline' ? 'Currently Declined ' : 'Decline'}
      </Button>
    </>
  );
}