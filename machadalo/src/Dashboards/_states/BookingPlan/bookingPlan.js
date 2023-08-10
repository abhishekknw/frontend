import { atom } from 'recoil';

const CampaignInventoryAtom = atom({
    key: 'CampaignInventoryKey',
    default: []
});

const HeaderDataListAtom = atom({
    key: 'HeaderDataListKey',
    default: {}
});

const SupplierPhaseListAtom = atom({
    key: 'SupplierPhaseListKey',
    default: []
})
export { CampaignInventoryAtom, HeaderDataListAtom, SupplierPhaseListAtom }