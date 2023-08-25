import { atom } from 'recoil';

const SectorListByNumberAtom = atom({
      key: 'SectorListByNumberKey',
      default: {}
})
const LeadsBySectorAtom = atom({
      key: 'LeadsBySectorKey',
      default: []
})

export { SectorListByNumberAtom, LeadsBySectorAtom }