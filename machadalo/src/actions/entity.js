import request from 'superagent';

import * as types from './types';

import config from './../config';

//Post Entity Type
export function postEntityTypeStart() {
  return {
    type: types.POST_ENTITY_TYPE_START
  };
}

export function postEntityTypeSuccess(entity) {
  return {
    type: types.POST_ENTITY_TYPE_SUCCESS,
    data: entity
  };
}

export function postEntityTypeFail() {
  return {
    type: types.POST_ENTITY_TYPE_FAIL
  };
}

export function postEntityType({ data }, callback) {
  return (dispatch, getState) => {
    dispatch(postEntityTypeStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity-type`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postEntityTypeSuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create entity', ex);

        dispatch(postEntityTypeFail());
      });
  };
}

//Post Entity
export function postEntityStart() {
  return {
    type: types.POST_ENTITY_START
  };
}

export function postEntitySuccess(entity) {
  return {
    type: types.POST_ENTITY_SUCCESS,
    data: entity
  };
}

export function postEntityFail() {
  return {
    type: types.POST_ENTITY_FAIL
  };
}

export function postEntity({ data }, callback) {
  return (dispatch, getState) => {
    dispatch(postEntityStart());

    const { auth } = getState();

    request
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity`)
      .set('Authorization', `JWT ${auth.token}`)
      .send(data)
      .then(resp => {
        dispatch(postEntitySuccess(resp.data));
        if (callback) {
          callback();
        }
      })
      .catch(ex => {
        console.log('Failed to create entity', ex);
        dispatch(postEntityFail());
      });
  };
}

//Get Entity
export function getEntityTypeListStart() {
  return {
    type: types.GET_ENTITY_TYPE_LIST_START
  };
}

export function getEntityTypeListSuccess(entityTypeList) {
  return {
    type: types.GET_ENTITY_TYPE_LIST_SUCCESS,
    data: entityTypeList
  };
}

export function getEntityTypeListFail() {
  return {
    type: types.GET_ENTITY_TYPE_LIST_FAIL
  };
}

export function getEntityTypeList() {
  return (dispatch, getState) => {
    dispatch(getEntityTypeListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity-type`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntityTypeListSuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityTypeListFail());
      });
  };
}
