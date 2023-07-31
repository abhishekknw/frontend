import { atom } from 'recoil';

const CampaignInventoryAtom = atom({
    key: 'CampaignInventoryKey',
    default: []
});

const HeaderDataListAtom = atom({
    key: 'HeaderDataListKey',
    default: {}
});

export { CampaignInventoryAtom, HeaderDataListAtom }