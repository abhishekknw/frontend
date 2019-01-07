import request from 'superagent';

import * as types from './types';

import config from './../config';

//Post Entity Type
export function postBaseInventoryStart() {
  return {
    type: types.POST_BASE_INVENTORY_START
  };
}

export function postBaseInventorySuccess(baseInventory) {
  return {
    type: types.POST_BASE_INVENTORY_SUCCESS,
    data: baseInventory
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
        console.log('Failed to create base Inventory', ex);

        dispatch(postBaseInventoryFail());
      });
  };
}

//Get Base Inventory
export function getBaseInventoryStart() {
  return {
    type: types.GET_BASE_INVENTORY_START
  };
}

export function getBaseInventorySuccess(baseInventory) {
  return {
    type: types.GET_BASE_INVENTORY_SUCCESS,
    baseInventory
  };
}

export function getBaseInventoryFail() {
  return {
    type: types.GET_BASE_INVENTORY_FAIL
  };
}

export function getBaseInventory() {
  return (dispatch, getState) => {
    dispatch(getBaseInventoryStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-inventory/base-inventory/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getBaseInventorySuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch base inventories', ex);
        dispatch(getBaseInventoryFail());
      });
  };
}

//Delete Base Inventory
export function deleteBaseInventoryStart() {
  return {
    type: types.DELETE_BASE_INVENTORY_START
  };
}

export function deleteBaseInventorySuccess(baseInventoryId) {
  return {
    type: types.DELETE_BASE_INVENTORY_SUCCESS,
    baseInventoryId
  };
}

export function deleteBaseInventoryFail() {
  return {
    type: types.DELETE_BASE_INVENTORY_FAIL
  };
}

export function deleteBaseInventory({ baseInventoryId }, callback) {
  return (dispatch, getState) => {
    dispatch(deleteBaseInventoryStart());

    const { auth } = getState();

    request
      .delete(
        `${
          config.API_URL
        }/v0/ui/dynamic-inventory/base-inventory/${baseInventoryId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteBaseInventorySuccess(baseInventoryId));
        callback();
      })
      .catch(ex => {
        console.log('Failed to fetch base inventories', ex);
        dispatch(deleteBaseInventoryFail());
      });
  };
}

//Get Base Inventory By Id
export function getBaseInventoryByIdStart() {
  return {
    type: types.GET_BASE_INVENTORY_BY_ID_START
  };
}

export function getBaseInventoryByIdSuccess(baseInventory) {
  return {
    type: types.GET_BASE_INVENTORY_BY_ID_SUCCESS,
    baseInventory
  };
}

export function getBaseInventoryByIdFail() {
  return {
    type: types.GET_BASE_INVENTORY_BY_ID_FAIL
  };
}

export function getBaseInventoryById({ baseInventoryId }) {
  return (dispatch, getState) => {
    dispatch(getBaseInventoryByIdStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/dynamic-inventory/base-inventory/${baseInventoryId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getBaseInventoryByIdSuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch base inventories', ex);
        dispatch(getBaseInventoryByIdFail());
      });
  };
}

//Put Base Inventory
export function putBaseInventoryStart() {
  return {
    type: types.PUT_BASE_INVENTORY_START
  };
}

export function putBaseInventorySuccess(inventory) {
  return {
    type: types.PUT_BASE_INVENTORY_SUCCESS,
    data: inventory
  };
}

export function putBaseInventoryFail() {
  return {
    type: types.PUT_BASE_INVENTORY_FAIL
  };
}

export function putBaseInventory({ data, baseInventoryId }, callback) {
  let req_data = {
    name: data.name,
    base_attributes: data.baseAttributes,
    inventory_type: 'space_based'
  };
  return (dispatch, getState) => {
    dispatch(putBaseInventoryStart());

    const { auth } = getState();

    request
      .put(
        `${
          config.API_URL
        }/v0/ui/dynamic-inventory/base-inventory/${baseInventoryId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .send(req_data)
      .then(resp => {
        dispatch(putBaseInventorySuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create base Inventory', ex);

        dispatch(putBaseInventoryFail());
      });
  };
}
