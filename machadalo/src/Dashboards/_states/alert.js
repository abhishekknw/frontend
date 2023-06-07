import { atom } from 'recoil';

const alertAtom = atom({
  key: 'alertKey',
  default: null,
});

const errorAtom = atom({
  key: 'errorKey',
  default: false,
});
export { alertAtom, errorAtom };
