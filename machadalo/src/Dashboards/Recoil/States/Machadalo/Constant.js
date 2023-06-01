import { atom } from 'recoil';

const showHideTable = atom({
  key: 'showHideTable',
  default: {
    ViewClientWise: false,
    ViewAgencyWise: false,
    ViewEndCustomerWise: false,
    ViewCityWise: false,
    ViewCampaignWise: false,
    ViewLeadDetail:false,
  },
});

const CalenderDatesAtom = atom({
  key: 'CalenderDatesAtom',
  default:[],
});
export { showHideTable,CalenderDatesAtom };
