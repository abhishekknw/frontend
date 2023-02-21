import { atom } from 'recoil';

const LeadCount = atom({
  key: 'LeadCount',
  default: {},
});

const leadCampaignData = atom({
  key: 'leadCampaignData',
  default: {},
});

const supplierData = atom({
  key: 'supplierData',
  default: [],
});

export { LeadCount, leadCampaignData, supplierData };
