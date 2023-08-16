import { atom } from 'recoil';

const CampaignInventoryAtom = atom({
  key: 'CampaignInventoryKey',
  default: [],
});

const HeaderDataListAtom = atom({
  key: 'HeaderDataListKey',
  default: {},
});

const SupplierPhaseListAtom = atom({
  key: 'SupplierPhaseListKey',
  default: [],
});

const BookingStatusAtom = atom({
  key: 'BookingStatusKey',
  default: [],
});

const ContactListAtom = atom({
  key: 'ContactListKey',
  default: [],
});
export {
  CampaignInventoryAtom,
  HeaderDataListAtom,
  SupplierPhaseListAtom,
  BookingStatusAtom,
  ContactListAtom,
};
