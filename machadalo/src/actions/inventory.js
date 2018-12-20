import request from 'superagent';

import * as types from './types';

import config from './../config';

//Post Entity Type
export function postBaseInventoryStart() {
  return {
    type: types.POST_BASE_INVENTORY_START
  };
}

export function postBaseInventorySuccess(entity) {
  return {
    type: types.POST_BASE_INVENTORY_SUCCESS,
    data: entity
  };
}

export function postBaseInventoryFail() {
  return {
    type: types.POST_BASE_INVENTORY_FAIL
  };
}

export function postBaseInventory({ data }, callback) {
  return (dispatch, getState) => {
    dispatch(postBaseInventoryStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-inventory/base-inventory/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postBaseInventorySuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create entity', ex);

        dispatch(postBaseInventoryFail());
      });
  };
}
