import request from 'superagent';

import * as types from './../types';

import config from './../../config';

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
      .post(`${config.API_URL}/v0/ui/dynamic-entities/entity/`)
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

//Get Entity List
export function getEntityListStart() {
  return {
    type: types.GET_ENTITY_LIST_START
  };
}

export function getEntityListSuccess(entityList) {
  return {
    type: types.GET_ENTITY_LIST_SUCCESS,
    data: entityList
  };
}

export function getEntityListFail() {
  return {
    type: types.GET_ENTITY_LIST_FAIL
  };
}

export function getEntityList() {
  return (dispatch, getState) => {
    dispatch(getEntityListStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntityListSuccess(Object.values(resp.body.data)));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityListFail());
      });
  };
}

//Delete Entity
export function deleteEntityStart() {
  return {
    type: types.DELETE_ENTITY_START
  };
}

export function deleteEntitySuccess(entityId) {
  return {
    type: types.DELETE_ENTITY_SUCCESS,
    entityId
  };
}

export function deleteEntityFail() {
  return {
    type: types.DELETE_ENTITY_FAIL
  };
}

export function deleteEntity(entityId, callback) {
  return (dispatch, getState) => {
    dispatch(deleteEntityStart());

    const { auth } = getState();

    request
      .delete(`${config.API_URL}/v0/ui/dynamic-entities/entity/${entityId}/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(deleteEntitySuccess(entityId));
        dispatch(getEntityList());
        callback();
      })
      .catch(ex => {
        console.log('Failed to delete entity', ex);

        dispatch(deleteEntityFail());
      });
  };
}

//Get Current Entity
export function getEntityStart() {
  return {
    type: types.GET_CURRENT_ENTITY_START
  };
}

export function getEntitySuccess(entity) {
  return {
    type: types.GET_CURRENT_ENTITY_SUCCESS,
    data: entity
  };
}

export function getEntityFail() {
  return {
    type: types.GET_CURRENT_ENTITY_FAIL
  };
}

export function getEntity(entityId) {
  return (dispatch, getState) => {
    dispatch(getEntityStart());

    const { auth } = getState();

    request
      .get(`${config.API_URL}/v0/ui/dynamic-entities/entity/${entityId}/`)
      .set('Authorization', `JWT ${auth.token}`)
      .then(resp => {
        dispatch(getEntitySuccess(resp.body.data));
      })
      .catch(ex => {
        console.log('Failed to fetch entity', ex);

        dispatch(getEntityFail());
      });
  };
}

//Update Entity

export function updateEntity({ data, entityId }, callback) {
  return (dispatch, getState) => {
    dispatch(postEntityStart());

    const { auth } = getState();

    request
      .put(`${config.API_URL}/v0/ui/dynamic-entities/entity/${entityId}/`)
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
