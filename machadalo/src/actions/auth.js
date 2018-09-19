import * as types from './types';

import constants from './../constants';

export function autoLogin() {
  // Set temporary token
  // localStorage.setItem(
  //   constants.MACHADALO_LOCAL_STORAGE_CREDENTIALS_KEY,
  //   '{"username":"admin","user_id":19,"name":"","user_code":"0","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwib3JpZ19pYXQiOjE1MzU4MjQwNzEsIm5hbWUiOiIiLCJleHAiOjE1MzU4MjQzNzEsInVzZXJfaWQiOjE5LCJlbWFpbCI6IiJ9.e2WCzCUaOvBtyb9wd68E-65s8mCIv-ZsNRQuPXpSY30","email":""}'
  // );

  // Fetch token from local storage
  const credentials = JSON.parse(
    localStorage.getItem(constants.MACHADALO_LOCAL_STORAGE_CREDENTIALS_KEY)
  );
  const token = localStorage.getItem(
    constants.MACHADALO_LOCAL_STORAGE_TOKEN_KEY
  );

  if (credentials && credentials.token) {
    return dispatch => {
      dispatch(postLoginSuccess({ token: credentials.token }));
    };
  } else if (token) {
    return dispatch => {
      dispatch(postLoginSuccess({ token }));
    };
  } else {
    return dispatch => {
      console.log('User not authorized. Redirecting to login...');
      // dispatch(doLogout());
    };
  }
}

export function postLoginStart() {
  return {
    type: types.LOGIN_START
  };
}

export function postLoginSuccess({ token }) {
  // Save token in local storage
  localStorage.setItem(constants.MACHADALO_LOCAL_STORAGE_TOKEN_KEY, token);

  return {
    type: types.LOGIN_SUCCESS,
    token
  };
}

export function postLoginFail() {
  return {
    type: types.LOGIN_FAIL
  };
}

export function doLogout() {
  // Clear token in local storage
  localStorage.setItem(constants.MACHADALO_LOCAL_STORAGE_TOKEN_KEY, '');

  return {
    type: types.USER_LOGOUT
  };
}
