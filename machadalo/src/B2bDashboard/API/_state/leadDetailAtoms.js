import { atom } from 'recoil';

const currentCampaign = atom({
  key: 'currentCampaign',
  default: [],
});

const viewLeadFilters = atom({
  key: 'viewLeadFilters',
  default: {
    campaign_id: '',
    supplier_type: 'all',
    lead_type: 'Leads',
    next_page: 0,
    start_date: '',
    end_date: '',
    city: '',
    start_acceptance_date: '',
    end_acceptance_date: '',
    start_update_date: '',
    end_update_date: '',
    from_primary_count: '',
    to_primary_count: '',
    client_status: '',
    tabname: '',
    userType: '',
  },
});

const campaignLeads = atom({
  key: 'campaignleads',
  default: [],
});

const campaignCitylist = atom({
  key: 'campaignCitylist',
  default: [],
});

export { currentCampaign, viewLeadFilters, campaignLeads, campaignCitylist };
