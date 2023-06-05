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

const showHideModalAtom = atom({
  key: 'showHideModalAtom',
  default: {
    email:{show:false},
    whatsapp:{show:false},
    leadDetail:{show:false}
  }
})

export { showHideTable ,showHideBreadcrumbsAtom,showHideModalAtom};
