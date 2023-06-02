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


const showHideBreadcrumbsAtom = atom({
  key: 'showHideBreadcrumbsAtom',
  default: {
    first:{show:false,tableName:""},
    second:{show:false,tableName:""},
    third:{show:false,tableName:""},
    fourth:{show:false,tableName:""},
  }
});

export { showHideTable ,showHideBreadcrumbsAtom};
