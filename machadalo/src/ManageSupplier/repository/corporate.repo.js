import { fetchUtils } from '../utils';

const STAGING_URL = 'https://stagingapi.machadalo.com/v0';
const getList = (pageNumber) => {
  return fetchUtils.get(
    `${STAGING_URL}/ui/supplier-generic/?supplier_type_code=CP&page=${pageNumber}`
  );
};

const getOrganizations = () => {
  return fetchUtils.get(`${STAGING_URL}/ui/website/organisation/?category=SUPPLIER_AGENCY`);
};

export const corporateRepository = {
  getList,
  getOrganizations,
};
