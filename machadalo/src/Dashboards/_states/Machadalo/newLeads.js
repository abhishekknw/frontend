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

const NewLeadTabFilterAtom = atom({
  key: 'NewLeadTabFilterKey',
  default: {
    campaign_id: '',
    supplier_type: 'all',
    lead_type: 'Leads',
    // next_page: 0,
    // start_date: '',
    // end_date: '',
    // city: '',
    // start_acceptance_date: '',
    // end_acceptance_date: '',
    // start_update_date: '',
    // end_update_date: '',
    // from_primary_count: '',
    // to_primary_count: '',
    // client_status: '',
    // tabname: '',
    // userType: '',
  },
});
export { AllCampaingsAtom, LeadByCampaignsAtom, showHideTableAtom, ClientStatusAtom, NewLeadTabFilterAtom }