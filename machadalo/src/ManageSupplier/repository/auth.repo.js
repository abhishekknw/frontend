import { fetchUtils } from '../utils';

const STAGING_URL = 'https://stagingapi.machadalo.com';

const login = (params) => {
  return fetchUtils.post(`${STAGING_URL}/api-token-auth/`, params);
};

const getAdminData = () => {
  return fetchUtils.get(`${STAGING_URL}/v0/user/1/`);
};

export const authRepository = {
  login,
  getAdminData,
};
