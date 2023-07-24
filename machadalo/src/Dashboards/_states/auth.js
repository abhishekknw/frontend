import { atom } from 'recoil';

const authAtom = atom({
  key: 'authKey',
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem('machadalo-credentials')),
});

const userInformationAtom = atom({
  key: 'userInformationKey',
  // get initial state from local storage to enable user to stay logged in
  default: JSON.parse(localStorage.getItem('userInfo')),
});
export { authAtom, userInformationAtom };
