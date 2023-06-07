import { atom } from 'recoil';

const authAtom = atom({
  key: 'authKey',
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem('machadalo-credentials')),
});

export { authAtom };
