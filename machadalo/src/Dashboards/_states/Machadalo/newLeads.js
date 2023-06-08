import { atom } from 'recoil';

const AllCampaingsAtom = atom({
  key: 'AllCampaingsKey',
  default: []
});

const LeadByCampaignsAtom = atom({
  key: 'LeadByCampaignsKey',
  default: {}
});

const showHideTableAtom = atom({
  key: 'showHideTablekey',
  default: {
    viewLeads: { show: false },
  }
});

const ClientStatusAtom = atom({
  key: 'ClientStatusKey',
  default: []
});
export { AllCampaingsAtom, LeadByCampaignsAtom, showHideTableAtom, ClientStatusAtom }