import request from 'superagent';

import * as types from './types';

import config from './../config';

export function getSuppliersListStart() {
  return {
    type: types.GET_SUPPLIERS_LIST_START
  };
}

export function getSuppliersListSuccess({ suppliers }) {
  return {
    type: types.GET_SUPPLIERS_LIST_SUCCESS,
    suppliers
  };
}

export function getSuppliersListFail() {
  return {
    type: types.GET_SUPPLIERS_LIST_FAIL
  };
}

export function getSuppliersList({ campaignProposalId }) {
  return (dispatch, getState) => {
    dispatch(getSuppliersListStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/website/proposal/${campaignProposalId}/shortlisted_suppliers/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        let suppliers = [];
        const data = resp.body.data;
        const dataKeys = Object.keys(data);

        for (let i = 0, l = dataKeys.length; i < l; i += 1) {
          const supplierGroups = data[dataKeys[i]].suppliers;
          const supplierGroupsKeys = Object.keys(supplierGroups);

          for (let j = 0, sl = supplierGroupsKeys.length; j < sl; j += 1) {
            suppliers = suppliers.concat(supplierGroups[supplierGroupsKeys[j]]);
          }
        }
        dispatch(getSuppliersListSuccess({ suppliers }));
      })
      .catch(ex => {
        console.log('Failed to fetch list of campaigns', ex);

        dispatch(getSuppliersListFail());
      });
  };
}
