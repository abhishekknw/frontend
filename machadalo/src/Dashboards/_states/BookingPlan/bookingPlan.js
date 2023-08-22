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

const InventoryListAtom = atom({
    key: 'InventoryListKey',
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

const filtersCheckBoxAtom = atom({
    key: 'filtersCheckBoxKey',
    default: [
        { label: 'Poster(PO)', value: 'PO', checked: false },
        { label: 'Standee(ST)', value: 'ST', checked: false },
        { label: 'Stall(SL)', value: 'SL', checked: false },
        { label: 'Flyer(FL)', value: 'FL', checked: false },
        { label: 'Banner(BA)', value: 'BA', checked: false },
        { label: 'Gateway Arch', value: 'GA', checked: false },
        { label: 'SunBoard(SB)', value: 'SB', checked: false },]
})
export {
    CampaignInventoryAtom,
    HeaderDataListAtom,
    SupplierPhaseListAtom,
    BookingStatusAtom,
    ContactListAtom,
    supplierSearchListAtom,
    showFinalizedListAtom,
    finalSupplierListAtom,
    filtersCheckBoxAtom, InventoryListAtom
}