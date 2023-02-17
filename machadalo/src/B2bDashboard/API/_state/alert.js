import { atom } from 'recoil';

const alertAtom = atom({
  key: 'alert',
  default: null,
});

const errorAtom = atom({
  key: 'error',
  default: false,
});
export { alertAtom, errorAtom };
