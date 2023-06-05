import { atom } from 'recoil';

const AllCampaingsAtom = atom({
  key: 'AllCampaingsKey',
  default: []
});

export {AllCampaingsAtom}