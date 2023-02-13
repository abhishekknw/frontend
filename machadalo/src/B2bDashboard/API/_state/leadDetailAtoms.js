import { atom } from 'recoil';

const currentCampaign = atom({
  key: 'currentCampaign',
  default: [],
});

export { currentCampaign };
