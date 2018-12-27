import request from 'superagent';

import * as types from './../types';

import config from './../../config';

//Post BaseEntity Type
export function postBaseEntityTypeStart() {
  return {
    type: types.POST_BASE_ENTITY_TYPE_START
  };
}

export function postBaseEntityTypeSuccess(baseEntity) {
  return {
    type: types.POST_BASE_ENTITY_TYPE_SUCCESS,
    data: baseEntity
  };
}

export function postBaseEntityTypeFail() {
  return {
    type: types.POST_BASE_ENTITY_TYPE_FAIL
  };
}

export function postBaseEntityType({ data }, callback) {
  return (dispatch, getState) => {
    dispatch(postBaseEntityTypeStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-entities/base-entity-type/`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postBaseEntityTypeSuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create baseEntity', ex);

        dispatch(postBaseEntityTypeFail());
      });
  };
}

//Get BaseEntity Type List
export function getBaseEntityTypeListStart() {
  return {
    type: types.GET_BASE_ENTITY_TYPE_LIST_START
  };
}

export function getBaseEntityTypeListSuccess(baseEntityTypeList) {
  return {
    type: types.GET_BASE_ENTITY_TYPE_LIST_SUCCESS,
    data: baseEntityTypeList
  };
}

export function getBaseEntityTypeListFail() {
  return {
    type: types.GET_BASE_ENTITY_TYPE_LIST_FAIL
  };
}

export function getBaseEntityTypeList() {
  return (dispatch, getState) => {
    dispatch(getBaseEntityTypeListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/base-entity-type/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getBaseEntityTypeListSuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch baseEntity', ex);

        dispatch(getBaseEntityTypeListFail());
      });
  };
}

//Delete BaseEntity Type
export function deleteBaseEntityTypeStart() {
  return {
    type: types.DELETE_BASE_ENTITY_TYPE_START
  };
}

export function deleteBaseEntityTypeSuccess(baseEntityTypeId) {
  return {
    type: types.DELETE_BASE_ENTITY_TYPE_SUCCESS,
    baseEntityTypeId
  };
}

export function deleteBaseEntityTypeFail() {
  return {
    type: types.DELETE_BASE_ENTITY_TYPE_FAIL
  };
}

export function deleteBaseEntityType(baseEntityTypeId, callback) {
  return (dispatch, getState) => {
    dispatch(deleteBaseEntityTypeStart());

    const { auth } = getState();

    request
      .delete(
        `${
          config.API_URL
        }/v0/ui/dynamic-entities/base-entity-type/${baseEntityTypeId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteBaseEntityTypeSuccess(baseEntityTypeId));
        dispatch(getBaseEntityTypeList());
        callback();
      })
      .catch(ex => {
        console.log('Failed to delete baseEntity type', ex);

        dispatch(deleteBaseEntityTypeFail());
      });
  };
}

//Get BaseEntity Type List
export function getBaseEntityTypeStart() {
  return {
    type: types.GET_CURRENT_BASE_ENTITY_TYPE_START
  };
}

export function getBaseEntityTypeSuccess(baseEntityType) {
  return {
    type: types.GET_CURRENT_BASE_ENTITY_TYPE_SUCCESS,
    data: baseEntityType
  };
}

export function getBaseEntityTypeFail() {
  return {
    type: types.GET_CURRENT_BASE_ENTITY_TYPE_FAIL
  };
}

export function getBaseEntityType(baseEntityTypeId) {
  return (dispatch, getState) => {
    dispatch(getBaseEntityTypeStart());

    const { auth } = getState();

    request
      .get(
        `${
          config.API_URL
        }/v0/ui/dynamic-entities/base-entity-type/${baseEntityTypeId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        console.log(resp.body);
        dispatch(getBaseEntityTypeSuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch baseEntity', ex);

        dispatch(getBaseEntityTypeFail());
      });
  };
}

export function updateBaseEntityType({ data, baseEntityTypeId }, callback) {
  return (dispatch, getState) => {
    dispatch(postBaseEntityTypeStart());

    const { auth } = getState();

    request
      .put(
        `${
          config.API_URL
        }/v0/ui/dynamic-entities/base-entity-type/${baseEntityTypeId}/`
      )
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postBaseEntityTypeSuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create baseEntity', ex);

        dispatch(postBaseEntityTypeFail());
      });
  };
}
