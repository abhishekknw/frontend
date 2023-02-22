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

const selectedDate = atom({
  key: 'selectDate',
  default: { selectDate: '' },
});

export { LeadCount, leadCampaignData, supplierData, selectedDate };
