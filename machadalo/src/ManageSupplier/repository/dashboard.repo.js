import { fetchUtils } from '../utils';

const STAGING_URL = 'https://stagingapi.machadalo.com/v0';
const getState = () => {
  return fetchUtils.get(`${STAGING_URL}/ui/state/`);
};

const getSupplierMeta = () => {
  return fetchUtils.get(`${STAGING_URL}/ui/suppliers-meta/`);
};

export const dashboardRepository = {
  getState,
  getSupplierMeta,
};
