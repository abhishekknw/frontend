import { atom } from 'recoil';

const leadDecisionPendingListAtom = atom({
  key: 'leadDecisionPendingList',
  default: [],
});

export { leadDecisionPendingListAtom };
