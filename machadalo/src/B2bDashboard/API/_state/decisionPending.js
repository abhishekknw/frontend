import { atom } from 'recoil';

const leadDecisionPendingListAtom = atom({
  key: 'leadDecisionPendingList',
  default: [],
});

const clientStatusAtom = atom({
  key: 'clientstatus',
  default: [],
});

export { leadDecisionPendingListAtom, clientStatusAtom };
