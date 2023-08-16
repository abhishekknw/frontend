import { atom } from 'recoil';

const showHideTable = atom({
  key: 'showHideTable',
  default: {
    ViewClientWise: false,
    ViewAgencyWise: false,
    ViewEndCustomerWise: false,
    ViewCityWise: false,
    ViewCampaignWise: false,
    ViewLeadDetail: false,
  },
});

const showHideBreadcrumbsAtom = atom({
  key: 'showHideBreadcrumbsAtom',
  default: {
    first: { show: false, tableName: '' },
    second: { show: false, tableName: '' },
    third: { show: false, tableName: '' },
    fourth: { show: false, tableName: '' },
  },
});

const showHideModalAtom = atom({
  key: 'showHideModalAtom',
  default: {
    email: { show: false, tableName: '' },
    whatsapp: { show: false, tableName: '' },
    leadDetail: { show: false, tableName: '' },
    comment: { show: false, tableName: '' },
    download: { show: false, tableName: '' },
  },
});

const OrganisationListAtom = atom({
  key: 'organisationListKey',
  default: [],
});

const UserMinimalListAtom = atom({
  key: 'UserMinimalListKey',
  default: [],
});

export {
  showHideTable,
  showHideBreadcrumbsAtom,
  showHideModalAtom,
  OrganisationListAtom,
  UserMinimalListAtom,
};
