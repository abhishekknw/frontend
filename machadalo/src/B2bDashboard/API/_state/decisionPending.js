import { atom } from 'recoil';

const leadDecisionPendingListAtom = atom({
  key: 'leadDecisionPendingList',
  default: [],
});

const clientStatusAtom = atom({
  key: 'clientstatus',
  default: [],
});

const commentListAtom = atom({
  key: 'commentList',
  default: [],
});

export { leadDecisionPendingListAtom, clientStatusAtom, commentListAtom };
