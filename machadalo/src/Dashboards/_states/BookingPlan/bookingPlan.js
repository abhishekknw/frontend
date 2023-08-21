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


const BookingStatusAtom = atom({
    key: 'BookingStatusKey',
    default: []
})

const ContactListAtom = atom({
    key: 'ContactListKey',
    default: []
})

const supplierSearchListAtom = atom({
    key: 'supplierSearchListkey',
    default: []
})

const showFinalizedListAtom = atom({
    key: "showFinalizedListKey",
    default: true
})

const finalSupplierListAtom = atom({
    key: "finalSupplierListKey",
    default: []
})
export {
    CampaignInventoryAtom,
    HeaderDataListAtom,
    SupplierPhaseListAtom,
    BookingStatusAtom,
    ContactListAtom,
    supplierSearchListAtom,
    showFinalizedListAtom,
    finalSupplierListAtom
}